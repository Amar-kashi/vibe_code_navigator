// --- 1. CONFIGURATION ---
// GET YOUR FREE TOKEN AT: https://account.mapbox.com/
// REPLACE the top section
const MAPTILER_KEY = 'iOISWWcR8S4iGHWRjAOZ'; // Get from Cloud.maptiler.com

const WALKING_SPEED_MPS = 1.4;
// HELPER: Converts Google Drive links to usable Image links
function driveLink(url) {
    if (url.includes("drive.google.com")) {
        // Extract the ID
        const id = url.match(/\/d\/(.+)\//);
        if (id && id[1]) {
            return `https://drive.google.com/uc?export=view&id=${id[1]}`;
        }
    }
    return url; // Return original if it's not a Drive link
}
// --- 2. DATA (Same format as before) ---
const menuData = [
    {
        id: 1,
        title: "Restrooms",
        children: [
            {
                title: "Boys",
                children: [
                    { title: "Floor 1", lat: 11.2233, lng: 77.8899, zoom: 19, image: driveLink("https://drive.google.com/file/d/1XyZ_EXAMPLE_ID_HERE/view?usp=sharing") },
                    { title: "Floor 2", lat: 11.2234, lng: 77.8899, zoom: 19, image: driveLink("https://drive.google.com/file/d/1XyZ_EXAMPLE_ID_HERE/view?usp=sharing") }
                ]
            },
            {
                title: "Girls",
                children: [
                    { title: "Floor 1", lat: 11.2235, lng: 77.8899, zoom: 19, image: driveLink("https://drive.google.com/file/d/1XyZ_EXAMPLE_ID_HERE/view?usp=sharing") },
                    { title: "Floor 2", lat: 11.2236, lng: 77.8899, zoom: 19, image: driveLink("https://drive.google.com/file/d/1XyZ_EXAMPLE_ID_HERE/view?usp=sharing") }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Common Rooms",
        lat: 11.2240, lng: 77.8900, zoom: 18, 
        image: driveLink("https://drive.google.com/file/d/1XyZ_EXAMPLE_ID_HERE/view?usp=sharing")
        // Note: No children here, so this acts as a direct link
    },
    {
        id: 3,
        title: "Venue",
        children: [
            { title: "Cyberdome", lat: 11.2250, lng: 77.8910, zoom: 19, image: driveLink("https://drive.google.com/file/d/1XyZ_EXAMPLE_ID_HERE/view?usp=sharing") },
            { title: "Tutorial Class", lat: 11.2255, lng: 77.8915, zoom: 19, image: driveLink("https://drive.google.com/file/d/1XyZ_EXAMPLE_ID_HERE/view?usp=sharing") }
        ]
    },
    {
        id: 4,
        title: "Canteens",
        children: [
            { title: "Cinnamon", lat: 11.2260, lng: 77.8920, zoom: 19, image: driveLink("https://drive.google.com/file/d/1XyZ_EXAMPLE_ID_HERE/view?usp=sharing") },
            { title: "Westmart", lat: 11.2265, lng: 77.8925, zoom: 19, image: driveLink("https://drive.google.com/file/d/1XyZ_EXAMPLE_ID_HERE/view?usp=sharing") },
            { title: "Cucumber", lat: 11.2270, lng: 77.8930, zoom: 19, image: driveLink("https://drive.google.com/file/d/1XyZ_EXAMPLE_ID_HERE/view?usp=sharing") },
            { title: "Saffron", lat: 11.2275, lng: 77.8935, zoom: 19, image: driveLink("https://drive.google.com/file/d/1XyZ_EXAMPLE_ID_HERE/view?usp=sharing") }
        ]
    },
    {
        id: 5,
        title: "Hostels",
        children: [
            { title: "Boys Hostel", lat: 11.2280, lng: 77.8940, zoom: 17, image: driveLink("https://drive.google.com/file/d/1XyZ_EXAMPLE_ID_HERE/view?usp=sharing") },
            { title: "Girls Hostel", lat: 11.2285, lng: 77.8945, zoom: 17, image: driveLink("https://drive.google.com/file/d/1XyZ_EXAMPLE_ID_HERE/view?usp=sharing") }
        ]
    },
    {
        id: 6,
        title: "Water Points",
        lat: 11.2290, lng: 77.8950, zoom: 19,
        image: driveLink("https://drive.google.com/file/d/1XyZ_EXAMPLE_ID_HERE/view?usp=sharing")
    }
];

let map;
let userMarker = null; // Green Dart
let destMarker = null; // Red Dart
let currentUserPos = null; // Stores {lat, lng}

// --- 3. INITIALIZE MAP (With Full Rotation) ---
function initMap() {
    const startPos = [77.8899, 11.2233]; 

    map = new maplibregl.Map({
        container: 'map',
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`,
        center: startPos,
        zoom: 15,
        pitch: 45, // Starting tilt
        
        // --- NEW ROTATION SETTINGS ---
        maxPitch: 85,       // Allows tilting down to see the horizon (default is 60)
        dragRotate: true,   // Enables rotation with mouse
        touchZoomRotate: true // Enables rotation with fingers on mobile
    });
    if (window.innerWidth <= 768) {
        map.setPadding({ bottom: window.innerHeight * 0.45 });
    }

    // Add Compass & Zoom controls
    // visualizePitch: true makes the compass show the tilt angle too
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'bottom-right');

    renderMenu(menuData, document.getElementById("location-list"));
    locateUser();
}

// --- 4. GET USER LOCATION (With Drag-to-Correct) ---
function locateUser() {
    // A. Internal function to update position when you drag the pin
    function onDragEnd() {
        const lngLat = userMarker.getLngLat();
        currentUserPos = {
            lat: lngLat.lat,
            lng: lngLat.lng
        };
        // Update the popup to confirm
        userMarker.setPopup(new maplibregl.Popup().setHTML("<b>Location Updated!</b><br>Navigating from here."));
        console.log("New User Position:", currentUserPos);
    }

    if (navigator.geolocation) {
        const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentUserPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                // B. Create the Draggable Marker
                if (!userMarker) {
                    userMarker = new maplibregl.Marker({ 
                        color: '#4CAF50', 
                        scale: 1.2,
                        draggable: true  // <--- ENABLE DRAGGING HERE
                    }) 
                        .setLngLat([currentUserPos.lng, currentUserPos.lat])
                        .setPopup(new maplibregl.Popup().setHTML("<b>You are here</b><br>Drag me if I'm wrong!"))
                        .addTo(map);
                    
                    // C. Listen for the 'dragend' event
                    userMarker.on('dragend', onDragEnd);
                } else {
                    userMarker.setLngLat([currentUserPos.lng, currentUserPos.lat]);
                }

                // Fly to the estimated location
                map.flyTo({ center: [currentUserPos.lng, currentUserPos.lat], zoom: 17 });
            },
            (error) => {
                console.warn("Location error:", error.message);
                alert("Could not find you automatically. Please drag the map to your location.");
                
                // Fallback: Drop the pin at the center of the map so they can drag it manually
                const center = map.getCenter();
                currentUserPos = { lat: center.lat, lng: center.lng };
                
                userMarker = new maplibregl.Marker({ color: '#4CAF50', scale: 1.2, draggable: true })
                    .setLngLat([center.lng, center.lat])
                    .addTo(map);
                    
                userMarker.on('dragend', onDragEnd);
            },
            options
        );
    }
}
// --- 5. RENDER MENU (Recursive - Unchanged) ---
function renderMenu(data, container) {
    data.forEach(item => {
        if (item.children) {
            const btn = document.createElement("button");
            btn.className = "menu-btn";
            btn.innerText = item.id ? `${item.id}. ${item.title}` : item.title;
            
            const subContainer = document.createElement("div");
            subContainer.className = "submenu";

            btn.addEventListener("click", () => {
                const isOpen = subContainer.classList.contains("show");
                if(isOpen) {
                    subContainer.classList.remove("show");
                    btn.classList.remove("active");
                } else {
                    subContainer.classList.add("show");
                    btn.classList.add("active");
                }
            });

            renderMenu(item.children, subContainer);
            container.appendChild(btn);
            container.appendChild(subContainer);
        } else {
            const link = document.createElement("div");
            link.className = "location-link";
            link.innerText = item.title;
            link.addEventListener("click", () => selectLocation(item));
            container.appendChild(link);
        }
    });
}

// --- 6. SELECT LOCATION & FLY ---
function selectLocation(loc) {
    if(!loc.lat || !loc.lng) return;

    map.flyTo({
        center: [loc.lng, loc.lat], 
        zoom: loc.zoom || 18,
        speed: 1.2,
        pitch: 60
    });

    if (destMarker) destMarker.remove();
    
    // Note: maplibregl instead of mapboxgl
    destMarker = new maplibregl.Marker({ color: '#F44336', scale: 1.2 })
        .setLngLat([loc.lng, loc.lat])
        .addTo(map);

    if(loc.image) openModal(loc.image, loc.title);
    updateTripInfo(loc);
}

// --- 7. MATH: HAVERSINE DISTANCE FORMULA ---
// Calculates distance in meters between two Lat/Lng points
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
}

function updateTripInfo(destLoc) {
    const panel = document.getElementById("trip-panel");
    const distEl = document.getElementById("dist-val");
    const timeEl = document.getElementById("time-val");
    const navBtn = document.getElementById("navigate-btn");

    panel.classList.add("active");

    if (currentUserPos) {
        // 1. Calculate
        const distanceMeters = getDistance(currentUserPos.lat, currentUserPos.lng, destLoc.lat, destLoc.lng);
        const timeMinutes = Math.ceil((distanceMeters / WALKING_SPEED_MPS) / 60);

        // 2. Display
        distEl.innerText = distanceMeters < 1000 
            ? Math.round(distanceMeters) + " m" 
            : (distanceMeters / 1000).toFixed(2) + " km";
        timeEl.innerText = timeMinutes + " min";

        // 3. Link to Google Maps for turn-by-turn (It's still the best for Navigation app)
        const navUrl = `https://www.google.com/maps/dir/?api=1&origin=${currentUserPos.lat},${currentUserPos.lng}&destination=${destLoc.lat},${destLoc.lng}&travelmode=walking`;
        navBtn.href = navUrl;
    } else {
        distEl.innerText = "Unknown";
        timeEl.innerText = "--";
        alert("Please enable location services.");
    }
}

// --- 8. MODAL LOGIC (Unchanged) ---
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const closeBtn = document.getElementsByClassName("close-btn")[0];

function openModal(src, caption) {
    modal.style.display = "block";
    modalImg.src = src;
    if(captionText) captionText.innerHTML = caption;
}

if(closeBtn) closeBtn.onclick = function() { modal.style.display = "none"; }
window.onclick = function(event) {
    if (event.target == modal) { modal.style.display = "none"; }
}

// --- 9. SIDEBAR TOGGLE LOGIC (Single Button) ---
const uiContainer = document.querySelector('.ui-container');
const toggleBtn = document.getElementById('menu-toggle');

toggleBtn.addEventListener('click', () => {
    // Check if currently open
    const isOpen = uiContainer.classList.contains('open');

    if (isOpen) {
        // CLOSE IT
        uiContainer.classList.remove('open');
        toggleBtn.classList.remove('active');
        toggleBtn.innerText = "☰"; // Turn back to Hamburger
    } else {
        // OPEN IT
        uiContainer.classList.add('open');
        toggleBtn.classList.add('active');
        toggleBtn.innerText = "×"; // Turn into X
    }
});

// Auto-open on load (Optional)
setTimeout(() => {
    uiContainer.classList.add('open');
    toggleBtn.classList.add('active');
    toggleBtn.innerText = "×";
}, 500);

// Start everything
initMap();