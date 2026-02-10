// --- 1. CONFIGURATION ---
// GET YOUR FREE TOKEN AT: https://account.mapbox.com/
// REPLACE the top section
// --- 1. CONFIGURATION ---
// We now get keys from the CONFIG object in config.js
const MAPTILER_KEY = CONFIG.MAPTILER_KEY; 
const WALKING_SPEED_MPS = 1.4;

// ... rest of code ...

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
// --- UPDATED: menuData with Campus Locations ---
// Replace the entire menuData array in script.js with this section

const menuData = [
    {
        id: 1,
        title: "Restrooms",
        children: [
            {
                title: "Boys",
                children: [
                    { 
                        title: "Academic Block", 
                        lat: 11.358643, 
                        lng: 77.828868, 
                        zoom: 19,
                        landmark: "Near lift, Academic Block",
                        children: [
                            { title: "Floor 1", lat: 11.358643, lng: 77.828868, zoom: 19, landmark: "Floor 1 - Adamic Block" },
                            { title: "Floor 3", lat: 11.358643, lng: 77.828868, zoom: 19, landmark: "Floor 3 - Adamic Block" },
                            { title: "Floor 5", lat: 11.358643, lng: 77.828868, zoom: 19, landmark: "Floor 5 - Adamic Block" }
                        ]
                    },
                    { 
                        title: "IT Park", 
                        lat: 11.360070650715995, 
                        lng: 77.82742649730055, 
                        zoom: 19,
                        landmark: "Near lift, IT Park",
                        children: [
                            { title: "Floor 1", lat: 11.360070650715995, lng: 77.82742649730055, zoom: 19, landmark: "Floor 1 - IT Park" },
                            { title: "Floor 2", lat: 11.360070650715995, lng: 77.82742649730055, zoom: 19, landmark: "Floor 2 - IT Park" },
                            { title: "Floor 3", lat: 11.360070650715995, lng: 77.82742649730055, zoom: 19, landmark: "Floor 3 - IT Park" },
                            { title: "Floor 4", lat: 11.360070650715995, lng: 77.82742649730055, zoom: 19, landmark: "Floor 4 - IT Park" }
                        ]
                    },
                    { 
                        title: "Near Vishveshwarya Hall", 
                        lat: 11.359244183944448, 
                        lng: 77.82814963533121, 
                        zoom: 19,
                        landmark: "Near Vishveshwarya Hall"
                    },
                    { 
                        title: "MCT Block", 
                        lat: 11.359836951220988, 
                        lng: 77.82823604559553, 
                        zoom: 19,
                        landmark: "Near lift, MCT Block",
                        children: [
                            { title: "Floor 1", lat: 11.359836951220988, lng: 77.82823604559553, zoom: 19, landmark: "Floor 1 - MCT Block" },
                            { title: "Floor 3", lat: 11.359836951220988, lng: 77.82823604559553, zoom: 19, landmark: "Floor 3 - MCT Block" }
                        ]
                    },
                    { 
                        title: "Incubation Center", 
                        lat: 11.360472001557545, 
                        lng: 77.82769731786328, 
                        zoom: 19,
                        landmark: "Incubation Center"
                    },
                    { 
                        title: "Biotech Department", 
                        lat: 11.36131392746119, 
                        lng: 77.8265285170771, 
                        zoom: 19,
                        landmark: "All Floors - Biotech Department"
                    },
                    { 
                        title: "Sports Ground", 
                        lat: 11.357884400191269, 
                        lng: 77.82512555433664, 
                        zoom: 19,
                        landmark: "Near Sports Ground"
                    }
                ]
            },
            {
                title: "Girls",
                children: [
                    { 
                        title: "Academic Block", 
                        lat: 11.358643, 
                        lng: 77.828868, 
                        zoom: 19,
                        landmark: "Near lift, Academic Block",
                        children: [
                            { title: "Ground Floor", lat: 11.358643, lng: 77.828868, zoom: 19, landmark: "Ground - Adamic Block" },
                            { title: "Floor 2", lat: 11.358643, lng: 77.828868, zoom: 19, landmark: "Floor 2 - Adamic Block" },
                            { title: "Floor 4", lat: 11.358643, lng: 77.828868, zoom: 19, landmark: "Floor 4 - Adamic Block" }
                        ]
                    },
                    { 
                        title: "IT Park", 
                        lat: 11.35982976345054, 
                        lng: 77.8273182546761, 
                        zoom: 19,
                        landmark: "Near lift, IT Park",
                        children: [
                            { title: "Floor 1", lat: 11.35982976345054, lng: 77.8273182546761, zoom: 19, landmark: "Floor 1 - IT Park" },
                            { title: "Floor 2", lat: 11.35982976345054, lng: 77.8273182546761, zoom: 19, landmark: "Floor 2 - IT Park" },
                            { title: "Floor 3", lat: 11.35982976345054, lng: 77.8273182546761, zoom: 19, landmark: "Floor 3 - IT Park" },
                            { title: "Floor 4", lat: 11.35982976345054, lng: 77.8273182546761, zoom: 19, landmark: "Floor 4 - IT Park" }
                        ]
                    },
                    { 
                        title: "Near Vishveshwarya Hall", 
                        lat: 11.359244183944448, 
                        lng: 77.82814963533121, 
                        zoom: 19,
                        landmark: "Near Vishveshwarya Hall"
                    },
                    { 
                        title: "MCT Block", 
                        lat: 11.359836951220988, 
                        lng: 77.82823604559553, 
                        zoom: 19,
                        landmark: "Near lift, MCT Block",
                        children: [
                            { title: "Ground Floor", lat: 11.359836951220988, lng: 77.82823604559553, zoom: 19, landmark: "Ground - MCT Block" },
                            { title: "Floor 2", lat: 11.359836951220988, lng: 77.82823604559553, zoom: 19, landmark: "Floor 2 - MCT Block" },
                            { title: "Floor 4", lat: 11.359836951220988, lng: 77.82823604559553, zoom: 19, landmark: "Floor 4 - MCT Block" }
                        ]
                    },
                    { 
                        title: "Incubation Center", 
                        lat: 11.360472001557545, 
                        lng: 77.82769731786328, 
                        zoom: 19,
                        landmark: "Incubation Center"
                    },
                    { 
                        title: "Biotech Department", 
                        lat: 11.362026412458391, 
                        lng: 77.826761034327, 
                        zoom: 19,
                        landmark: "All Floors - Biotech Department"
                    },
                    { 
                        title: "Sports Ground", 
                        lat: 11.357884400191269, 
                        lng: 77.82512555433664, 
                        zoom: 19,
                        landmark: "Near Sports Ground"
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Canteens",
        children: [
            { 
                title: "Cinnamon", 
                lat: 11.35819084631957, 
                lng: 77.82926414982977, 
                zoom: 19,
                landmark: "Main Canteen Building"
            },
            { 
                title: "Westmart", 
                lat: 11.358436827495437, 
                lng: 77.82679604292073, 
                zoom: 19,
                landmark: "Near IT Park"
            },
            { 
                title: "Cucumber", 
                lat: 11.362166562687062, 
                lng: 77.82712862469936, 
                zoom: 19,
                landmark: "Biotech Area"
            },
            { 
                title: "Saffron", 
                lat: 11.356726395808389, 
                lng: 77.82653347834176, 
                zoom: 19,
                landmark: "Sports Area"
            },
            { 
                title: "Mustard", 
                lat: 11.357962026424367, 
                lng: 77.83075785049219, 
                zoom: 19,
                landmark: "Central Campus"
            },
            { 
                title: "Bite Zone", 
                lat: 11.361422907728162, 
                lng: 77.82764500168402, 
                zoom: 19,
                landmark: "Near Library"
            },
            { 
                title: "V Caffe", 
                lat: 11.363115916487297, 
                lng: 77.82694479292338, 
                zoom: 19,
                landmark: "Incubation Area"
            }
        ]
    },
    {
        id: 3,
        title: "Venues",
        children: [
            { 
                title: "Cyberdome - Floor 3", 
                lat: 11.359960754413105, 
                lng: 77.82736780739909, 
                zoom: 19,
                landmark: "Cyberdome Auditorium Floor 3"
            },
            { 
                title: "Bhoomi Lab - Floor 3", 
                lat: 11.359743903507429, 
                lng: 77.82748669380938, 
                zoom: 19,
                landmark: "Bhoomi Laboratory Floor 3"
            },
            { 
                title: "UI Lab", 
                lat: 11.359979728868684, 
                lng: 77.82763599303898, 
                zoom: 19,
                landmark: "User Interface Laboratory"
            }
        ]
    },
    {
        id: 4,
        title: "Water Points",
        children: [
            { 
                title: "Cinnamon", 
                lat: 11.35819084631957, 
                lng: 77.82926414982977, 
                zoom: 19,
                landmark: "Water Point - Cinnamon Block"
            },
            { 
                title: "Westmart", 
                lat: 11.358436827495437, 
                lng: 77.82679604292073, 
                zoom: 19,
                landmark: "Water Point - IT Park"
            },
            { 
                title: "Cucumber", 
                lat: 11.362166562687062, 
                lng: 77.82712862469936, 
                zoom: 19,
                landmark: "Water Point - Biotech"
            },
            { 
                title: "Saffron", 
                lat: 11.356726395808389, 
                lng: 77.82653347834176, 
                zoom: 19,
                landmark: "Water Point - Sports"
            },
            { 
                title: "Mustard", 
                lat: 11.357962026424367, 
                lng: 77.83075785049219, 
                zoom: 19,
                landmark: "Water Point - Central"
            },
            { 
                title: "Bite Zone", 
                lat: 11.361422907728162, 
                lng: 77.82764500168402, 
                zoom: 19,
                landmark: "Water Point - Library"
            },
            { 
                title: "V Caffe", 
                lat: 11.363115916487297, 
                lng: 77.82694479292338, 
                zoom: 19,
                landmark: "Water Point - Incubation"
            },
            { 
                title: "Academic Block", 
                lat: 11.358643, 
                lng: 77.828868, 
                zoom: 19,
                landmark: "Water Point - Academic Block",
                children: [
                    { title: "Ground Floor", lat: 11.358643, lng: 77.828868, zoom: 19, landmark: "Ground - Adamic Block" },
                    { title: "Floor 3", lat: 11.358643, lng: 77.828868, zoom: 19, landmark: "Floor 3 - Adamic Block" },
                    { title: "Floor 4", lat: 11.358643, lng: 77.828868, zoom: 19, landmark: "Floor 4 - Adamic Block" },
                    { title: "Floor 5", lat: 11.358643, lng: 77.828868, zoom: 19, landmark: "Floor 5 - Adamic Block" }
                ]
            },
            { 
                title: "IT Park", 
                lat: 11.35982976345054, 
                lng: 77.8273182546761, 
                zoom: 19,
                landmark: "Water Point - IT Park",
                children: [
                    { title: "Floor 1", lat: 11.35982976345054, lng: 77.8273182546761, zoom: 19, landmark: "Floor 1 - IT Park" },
                    { title: "Floor 3", lat: 11.35982976345054, lng: 77.8273182546761, zoom: 19, landmark: "Floor 3 - IT Park" }
                ]
            },
            { 
                title: "Near Vishveshwarya Hall", 
                lat: 11.359244183944448, 
                lng: 77.82814963533121, 
                zoom: 19,
                landmark: "Water Point - Vishveshwarya Hall"
            },
            { 
                title: "MCT Block", 
                lat: 11.359836951220988, 
                lng: 77.82823604559553, 
                zoom: 19,
                landmark: "Water Point - MCT Block",
                children: [
                    { title: "Ground Floor", lat: 11.359836951220988, lng: 77.82823604559553, zoom: 19, landmark: "Ground - MCT Block" },
                    { title: "Floor 2", lat: 11.359836951220988, lng: 77.82823604559553, zoom: 19, landmark: "Floor 2 - MCT Block" },
                    { title: "Floor 4", lat: 11.359836951220988, lng: 77.82823604559553, zoom: 19, landmark: "Floor 4 - MCT Block" }
                ]
            },
            { 
                title: "Incubation Center", 
                lat: 11.360472001557545, 
                lng: 77.82769731786328, 
                zoom: 19,
                landmark: "Water Point - Incubation Center"
            },
            { 
                title: "Biotech Department", 
                lat: 11.362026412458391, 
                lng: 77.826761034327, 
                zoom: 19,
                landmark: "Water Point - Biotech Floor 2"
            }
        ]
    },
    {
        id: 5,
        title: "Hostels",
        children: [
            {
                title: "Girls Hostel",
                children: [
                    { 
                        title: "Gate No. 1", 
                        lat: 11.36009086486969, 
                        lng: 77.82921469404405, 
                        zoom: 18,
                        landmark: "Girls Hostel - Gate 1"
                    },
                    { 
                        title: "Gate No. 2", 
                        lat: 11.359188222301372, 
                        lng: 77.83033443814098, 
                        zoom: 18,
                        landmark: "Girls Hostel - Gate 2"
                    },
                    { 
                        title: "Gate No. 3", 
                        lat: 11.35870572750097, 
                        lng: 77.83099522541717, 
                        zoom: 18,
                        landmark: "Girls Hostel - Gate 3"
                    }
                ]
            },
            { 
                title: "Boys Hostel", 
                lat: 11.35663478547036, 
                lng: 77.82982847970815, 
                zoom: 18,
                landmark: "Boys Hostel Main Gate"
            }
        ]
    },
    {
        id: 6,
        title: "Gym",
        lat: 11.357101019803551, 
        lng: 77.82567298477754, 
        zoom: 19,
        landmark: "Sports Complex - Gym Facility"
    },
    {
        id: 7,
        title: "Library",
        lat: 11.361757899976554, 
        lng: 77.82732633540377, 
        zoom: 19,
        landmark: "Central Library Building"
    }
];
// Store gallery images globally
let galleryImages = [];
let currentGalleryIndex = 0;

function addChatImage(src, title = "Reference Image") {
    const div = document.createElement('div');
    div.className = 'msg bot'; 
    div.style.background = 'transparent'; 
    div.style.padding = '5px 0';
    
    const img = document.createElement('img');
    img.src = src;
    img.className = 'chat-image-thumbnail';
    img.alt = title;
    
    // Click to open gallery
    img.onclick = () => {
        openImageGallery([src], 0, title);
    };
    
    div.appendChild(img);
    msgContainer.appendChild(div);
    msgContainer.scrollTop = msgContainer.scrollHeight;
}

// Add multiple images at once
function addChatImages(images, titles) {
    const div = document.createElement('div');
    div.className = 'msg bot';
    div.style.background = 'transparent';
    div.style.padding = '5px 0';
    
    const grid = document.createElement('div');
    grid.className = 'chat-images-grid';
    
    images.forEach((src, idx) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'chat-image-thumbnail';
        img.alt = titles?.[idx] || `Image ${idx + 1}`;
        
        img.onclick = () => {
            openImageGallery(images, idx, titles);
        };
        
        grid.appendChild(img);
    });
    
    div.appendChild(grid);
    msgContainer.appendChild(div);
    msgContainer.scrollTop = msgContainer.scrollHeight;
}

// Open image gallery
function openImageGallery(images, startIndex = 0, titles = null) {
    galleryImages = Array.isArray(images) ? images : [images];
    currentGalleryIndex = startIndex;
    
    const modal = document.getElementById('gallery-modal');
    const mainImg = document.getElementById('gallery-main-img');
    const titleEl = document.getElementById('gallery-title');
    const counter = document.getElementById('gallery-counter');
    const thumbsContainer = document.getElementById('gallery-thumbnails');
    
    // Show modal
    modal.classList.add('active');
    
    // Set main image
    mainImg.src = galleryImages[currentGalleryIndex];
    
    // Set title
    const currentTitle = Array.isArray(titles) 
        ? titles[currentGalleryIndex] 
        : (titles || 'Reference Image');
    titleEl.textContent = currentTitle;
    
    // Set counter
    counter.textContent = `${currentGalleryIndex + 1} / ${galleryImages.length}`;
    
    // Build thumbnails
    thumbsContainer.innerHTML = '';
    if (galleryImages.length > 1) {
        galleryImages.forEach((imgSrc, idx) => {
            const thumb = document.createElement('img');
            thumb.src = imgSrc;
            thumb.className = 'gallery-thumb-item';
            if (idx === currentGalleryIndex) {
                thumb.classList.add('active');
            }
            
            thumb.onclick = () => {
                currentGalleryIndex = idx;
                updateGalleryImage();
            };
            
            thumbsContainer.appendChild(thumb);
        });
    } else {
        thumbsContainer.style.display = 'none';
    }
    
    // Show/hide navigation arrows
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    
    if (galleryImages.length > 1) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }
}

function updateGalleryImage() {
    const mainImg = document.getElementById('gallery-main-img');
    const counter = document.getElementById('gallery-counter');
    const thumbs = document.querySelectorAll('.gallery-thumb-item');
    
    mainImg.src = galleryImages[currentGalleryIndex];
    counter.textContent = `${currentGalleryIndex + 1} / ${galleryImages.length}`;
    
    // Update active thumbnail
    thumbs.forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === currentGalleryIndex);
    });
}

// Gallery event listeners (add at the end of the file)
document.addEventListener('DOMContentLoaded', () => {
    const galleryModal = document.getElementById('gallery-modal');
    const closeBtn = document.getElementById('gallery-close');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    const downloadBtn = document.getElementById('gallery-download');
    
    // Close gallery
    if (closeBtn) {
        closeBtn.onclick = () => {
            galleryModal.classList.remove('active');
        };
    }
    
    // Click outside to close
    galleryModal.onclick = (e) => {
        if (e.target === galleryModal) {
            galleryModal.classList.remove('active');
        }
    };
    
    // Previous image
    if (prevBtn) {
        prevBtn.onclick = () => {
            currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
            updateGalleryImage();
        };
    }
    
    // Next image
    if (nextBtn) {
        nextBtn.onclick = () => {
            currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
            updateGalleryImage();
        };
    }
    
    // Download image
    if (downloadBtn) {
        downloadBtn.onclick = () => {
            const link = document.createElement('a');
            link.href = galleryImages[currentGalleryIndex];
            link.download = `reference-image-${currentGalleryIndex + 1}.jpg`;
            link.click();
        };
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!galleryModal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            galleryModal.classList.remove('active');
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
});

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

// --- 4. GET USER LOCATION (Automatic & Continuous) ---
function locateUser() {
    // **NEW: First check if geolocation is supported**
    if (!navigator.geolocation) {
        showLocationError('Geolocation is not supported by your browser. Please use a modern browser like Chrome or Safari.');
        return;
    }

    let isFirstUpdate = true;
    let accuracyCircle = null;
    let watchId = null;

    // A. Internal function to update position when you drag the pin
    function onDragEnd() {
        const lngLat = userMarker.getLngLat();
        currentUserPos = { lat: lngLat.lat, lng: lngLat.lng };
        userMarker.setPopup(new maplibregl.Popup().setHTML(
            `<div style="padding: 5px;">
                <b>📍 Location Updated!</b><br>
                <small style="color: #666;">Manually adjusted</small>
            </div>`
        ));
    }

    const options = { 
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
    };

    // **NEW: Show loading indicator**
    showLocationLoading();

    // B. Use watchPosition for continuous updates
    watchId = navigator.geolocation.watchPosition(
        (position) => {
            const newLat = position.coords.latitude;
            const newLng = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            currentUserPos = { lat: newLat, lng: newLng };

            // **NEW: Hide loading indicator**
            hideLocationLoading();

            // 1. Create or Update Green Marker
            if (!userMarker) {
                userMarker = new maplibregl.Marker({ 
                    color: '#4CAF50', 
                    scale: 1.2,
                    draggable: true 
                }) 
                    .setLngLat([newLng, newLat])
                    .setPopup(new maplibregl.Popup().setHTML(
                        `<div style="padding: 5px;">
                            <b>📍 You are here</b><br>
                            <small>Accuracy: ±${Math.round(accuracy)}m</small><br>
                            <small style="color: #666;">Drag to adjust</small>
                        </div>`
                    ))
                    .addTo(map);
                
                userMarker.on('dragend', onDragEnd);
            } else {
                userMarker.setLngLat([newLng, newLat]);
                // **NEW: Update popup with current accuracy**
                const popup = userMarker.getPopup();
                if (popup) {
                    popup.setHTML(
                        `<div style="padding: 5px;">
                            <b>📍 You are here</b><br>
                            <small>Accuracy: ±${Math.round(accuracy)}m</small><br>
                            <small style="color: #666;">Drag to adjust</small>
                        </div>`
                    );
                }
            }

            // 2. Only Fly to user on the FIRST update
            if (isFirstUpdate) {
                map.flyTo({ 
                    center: [newLng, newLat], 
                    zoom: 17,
                    duration: 1500,
                    essential: true
                });
                isFirstUpdate = false;
                
                const accuracyMsg = accuracy < 20 ? '✅ Excellent' : 
                                   accuracy < 50 ? '⚠️ Good' : 
                                   '❌ Poor';
                console.log(`📍 Location Found! Accuracy: ${Math.round(accuracy)}m (${accuracyMsg})`);
            }
        },
        (error) => {
            hideLocationLoading();
            handleLocationError(error);
        },
        options
    );
}

// **NEW: Location loading indicator**
function showLocationLoading() {
    const indicator = document.createElement('div');
    indicator.id = 'location-loading';
    indicator.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #4CAF50;
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
        ">
            <div style="
                width: 20px;
                height: 20px;
                border: 3px solid white;
                border-top-color: transparent;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            "></div>
            Finding your location...
        </div>
        <style>
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        </style>
    `;
    document.body.appendChild(indicator);
}

function hideLocationLoading() {
    const indicator = document.getElementById('location-loading');
    if (indicator) {
        indicator.style.opacity = '0';
        indicator.style.transition = 'opacity 0.3s ease';
        setTimeout(() => indicator.remove(), 300);
    }
}

// **NEW: Handle location errors with helpful messages**
function handleLocationError(error) {
    let message = '';
    let actionButton = '';

    switch(error.code) {
        case error.PERMISSION_DENIED:
            message = `
                <b>📍 Location Access Denied</b><br><br>
                To use navigation, please:<br>
                1. Click the 🔒 lock icon in your browser's address bar<br>
                2. Allow location access for this site<br>
                3. Refresh the page<br><br>
                Or drag the green pin to your location manually.
            `;
            actionButton = `
                <button onclick="locateUser()" style="
                    background: #4CAF50;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-weight: 600;
                    margin-top: 10px;
                ">Try Again</button>
            `;
            break;
        case error.POSITION_UNAVAILABLE:
            message = `
                <b>📍 Location Unavailable</b><br><br>
                Your device cannot determine your location.<br>
                Please check that:<br>
                • Location services are enabled on your device<br>
                • You have an internet connection<br>
                • You're not in airplane mode
            `;
            break;
        case error.TIMEOUT:
            message = `
                <b>⏱️ Location Request Timed Out</b><br><br>
                Taking too long to find your location.<br>
                Try moving to an area with better signal.
            `;
            actionButton = `
                <button onclick="locateUser()" style="
                    background: #4CAF50;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-weight: 600;
                    margin-top: 10px;
                ">Retry</button>
            `;
            break;
    }

    showLocationError(message + actionButton);
}

function showLocationError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 10001;
            max-width: 400px;
            text-align: center;
        ">
            ${message}
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #666;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                cursor: pointer;
                font-weight: 600;
                margin-top: 10px;
                margin-left: 10px;
            ">Close</button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 10000;
        " onclick="this.parentElement.remove()"></div>
    `;
    document.body.appendChild(errorDiv);
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
    
    if(loc.image) {
        if (typeof openImageGallery === 'function') {
            openImageGallery([loc.image], 0, loc.title);
        }
    }
    updateTripInfo(loc);
}
// --- 10. RECENTER BUTTON (SMOOTH) ---
const recenterBtn = document.getElementById('recenter-btn');
if (recenterBtn) {
    recenterBtn.addEventListener('click', () => {
        if (currentUserPos) {
            // **NEW: Smooth animation**
            recenterBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                recenterBtn.style.transform = 'scale(1)';
            }, 100);
            
            map.flyTo({ 
                center: [currentUserPos.lng, currentUserPos.lat], 
                zoom: 17,
                pitch: 45,
                bearing: 0,
                duration: 1500,
                essential: true
            });
            
            if (userMarker) {
                userMarker.togglePopup();
            }
        } else {
            // **NEW: Better feedback**
            showLocationLoading();
            locateUser();
        }
    });
    
    // **NEW: Add button transition**
    recenterBtn.style.transition = 'transform 0.1s ease';
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
    
    // **UPDATED: Smooth Google Maps navigation**
    const navBtn = document.getElementById('navigate-btn');
    const userLat = currentUserPos ? currentUserPos.lat : '';
    const userLng = currentUserPos ? currentUserPos.lng : '';
    
    if (navBtn) {
        // **NEW: Prepare URL immediately (no delay)**
        const googleMapsUrl = userLat && userLng
            ? `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${destLoc.lat},${destLoc.lng}&travelmode=walking`
            : `https://www.google.com/maps/search/?api=1&query=${destLoc.lat},${destLoc.lng}`;
        
        navBtn.href = googleMapsUrl;
        navBtn.target = '_blank';
        navBtn.rel = 'noopener noreferrer';
        
        // **NEW: Remove old onclick if exists**
        navBtn.onclick = null;
        
        // **NEW: Add smooth feedback**
        navBtn.addEventListener('click', function(e) {
            // Don't prevent default - let the link work naturally
            navBtn.innerHTML = 'Opening Maps... 🚀';
            navBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                navBtn.innerHTML = 'Start Navigation 🚀';
                navBtn.style.opacity = '1';
            }, 1500);
        }, { once: true });
    }

    panel.classList.add("active");

    if (currentUserPos) {
        const distanceMeters = getDistance(currentUserPos.lat, currentUserPos.lng, destLoc.lat, destLoc.lng);
        const timeMinutes = Math.ceil((distanceMeters / WALKING_SPEED_MPS) / 60);

        distEl.innerText = distanceMeters < 1000 
            ? Math.round(distanceMeters) + " m" 
            : (distanceMeters / 1000).toFixed(2) + " km";
        timeEl.innerText = timeMinutes + " min";
    } else {
        distEl.innerText = "Unknown";
        timeEl.innerText = "--";
    }
}

// --- 8. MODAL LOGIC (Unchanged) ---
// Old modal removed - now using gallery-modal
// Gallery functionality handled in ai_navigate_advanced.js


// --- 9. SIDEBAR TOGGLE LOGIC (Single Button) ---
const uiContainer = document.querySelector('.ui-container');
const toggleBtn = document.getElementById('menu-toggle');

if (toggleBtn && uiContainer) {
    // **NEW: Add transition CSS**
    uiContainer.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    toggleBtn.addEventListener('click', () => {
        const isOpen = uiContainer.classList.contains('open');
        if (isOpen) {
            uiContainer.classList.remove('open');
            toggleBtn.innerHTML = "☰";
            toggleBtn.style.transform = 'rotate(0deg)';
        } else {
            uiContainer.classList.add('open');
            toggleBtn.innerHTML = "✕";
            toggleBtn.style.transform = 'rotate(90deg)';
        }
    });
    
    // **NEW: Add transition to toggle button**
    toggleBtn.style.transition = 'transform 0.3s ease';
}


// // --- 11. AI CHATBOT LOGIC ---


// const AI_API_KEY = CONFIG.AI_API_KEY; 
// const AI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${AI_API_KEY}`;


// // ... rest of your AI code ...
// let flatLocations = [];

// // SMART FLATTENER: Keeps parent names (e.g. "Restrooms Boys Floor 1")
// function flattenData(items, parentName = "") {
//     items.forEach(item => {
//         // Build full name: combine parent + current title
//         const fullTitle = parentName ? `${parentName} ${item.title}` : item.title;
        
//         if (item.children) {
//             flattenData(item.children, fullTitle); // Pass the name down
//         } else {
//             // It's a real location, add to list with the FULL name
//             flatLocations.push({ ...item, fullName: fullTitle });
//         }
//     });
// }
// flattenData(menuData); // Run immediately

// // PREPARE CONTEXT FOR AI
// let locationListString = "";
// flatLocations.forEach(loc => {
//     // Send "Restrooms Boys Floor 1" to AI, not just "Floor 1"
//     locationListString += `- ${loc.fullName}\n`;
// });
// // B. Configure Fuse.js (The Search Engine)
// const fuseOptions = {
//     keys: ['title'], // Search specifically in titles
//     threshold: 0.4,  // 0.0 is exact match, 1.0 is match anything. 0.4 is "fuzzy" enough for typos.
// };
// const fuse = new Fuse(flatLocations, fuseOptions);


// // C. Chat UI Elements
// const chatPanel = document.getElementById('chat-panel');
// const chatToggle = document.getElementById('chat-toggle');
// const closeChat = document.getElementById('close-chat');
// const msgContainer = document.getElementById('chat-messages');
// const userInput = document.getElementById('user-input');
// const sendBtn = document.getElementById('send-btn');
// const micBtn = document.getElementById('mic-btn');

// // Toggle Chat
// chatToggle.onclick = () => chatPanel.classList.add('active');
// closeChat.onclick = () => chatPanel.classList.remove('active');


// // D. Core AI Function
// // --- REPLACE YOUR processCommand FUNCTION WITH THIS ---
// // --- REPLACE YOUR processCommand FUNCTION WITH THIS ---
// async function processCommand(rawText) {
//     const text = rawText.trim();
//     if(!text) return;

//     // 1. Show User Message
//     addMessage(text, 'user');
    
//     // 2. Show "Thinking..." bubble
//     const loadingId = addMessage("Thinking...", 'bot'); 
//     const loadingMsg = document.getElementById(loadingId); 

//     try {
//         // 3. Define the AI Rules (This was missing!)
//         const systemPrompt = `
//             You are a navigation assistant.
//             Here is the list of available locations:
//             ${locationListString}

//             User said: "${text}"

//             Rules:
//             1. If the user asks for a category with multiple options (e.g. "Restroom", "Hostel"), ASK A CLARIFYING QUESTION (e.g., "Would you like the Boys or Girls restroom?"). Return "QUESTION: [Your Question]".
//             2. If you find a specific location, return ONLY the exact "fullName" from the list (e.g. "Restrooms Boys Floor 1").
//             3. If user says "Nearest X", return "NEAREST_REQUEST: X".
//             4. If not found, return "NOT_FOUND".
//         `;

//         // 4. Send to Google API
//         const dynamicAiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${AI_API_KEY}`;
        
//         const response = await fetch(dynamicAiUrl, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 contents: [{
//                     parts: [{ text: systemPrompt }]
//                 }]
//             })
//         });

//         if (!response.ok) throw new Error("Check your API key in config.js");

//         const data = await response.json();
//         const aiResult = data.candidates[0].content.parts[0].text.trim();

//         // 5. Remove "Thinking..." and handle result
//         loadingMsg.remove(); 
//         handleAiDecision(aiResult);
        
//     } catch (error) {
//         console.error(error);
//         if(loadingMsg) loadingMsg.innerText = "Error: " + error.message;
//     }
// }
// // Helper: Add text to chat window
// // Helper: Add text to chat window (FIXED)
// function addMessage(text, type) {
//     const div = document.createElement('div');
//     const id = "msg-" + Date.now(); // 1. Generate a Unique ID
//     div.id = id;                    // 2. Attach it to the HTML element
//     div.className = `msg ${type}`;
//     div.innerText = text;
//     msgContainer.appendChild(div);
//     msgContainer.scrollTop = msgContainer.scrollHeight; 
    
//     return id; // <--- 3. CRITICAL: Return the ID so we can remove this message later!
// }

// // Helper: Text-to-Speech
// function speak(text) {
//     const speech = new SpeechSynthesisUtterance(text);
//     speech.rate = 1;
//     speech.pitch = 1;
//     window.speechSynthesis.speak(speech);
// }


// // E. Voice Recognition (Speech-to-Text)
// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// if (SpeechRecognition) {
//     const recognition = new SpeechRecognition();
//     recognition.continuous = false; // Stop after one sentence
//     recognition.lang = 'en-US';

//     micBtn.onclick = () => {
//         if (micBtn.classList.contains('listening')) {
//             recognition.stop();
//         } else {
//             recognition.start();
//         }
//     };
    
//     recognition.onstart = () => {
//         micBtn.classList.add('listening');
//         userInput.placeholder = "Listening...";
//     };
    
//     recognition.onend = () => {
//         micBtn.classList.remove('listening');
//         userInput.placeholder = "Type or speak...";
//     };

//     recognition.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         userInput.value = transcript;
//         processCommand(transcript);
//     };
// } else {
//     // Fallback for browsers without speech support
//     micBtn.style.display = 'none';
//     addMessage("Voice control not supported in this browser.", 'bot');
// }


// // F. Handle Typing (Enter Key & Send Button)
// sendBtn.onclick = () => {
//     if (userInput.value.trim()) {
//         processCommand(userInput.value);
//         userInput.value = '';
//     }
// };

// userInput.addEventListener('keypress', (e) => {
//     if (e.key === 'Enter' && userInput.value.trim()) {
//         processCommand(userInput.value);
//         userInput.value = '';
//     }
// });

// // --- REPLACE YOUR handleAiDecision FUNCTION WITH THIS ---
// function handleAiDecision(decision) {
//     console.log("AI Decided:", decision);

//     // CASE 1: AI wants to ask a question (e.g. "Boys or Girls?")
//     if (decision.startsWith("QUESTION:")) {
//         const question = decision.replace("QUESTION:", "").trim();
//         addMessage(question, 'bot');
//         speak(question);
//         return; // Stop here and wait for user to reply
//     }

//     // CASE 2: Nearest Logic
//     if (decision.startsWith("NEAREST_REQUEST:")) {
//         const category = decision.replace("NEAREST_REQUEST:", "").trim();
//         handleNearestRequest(category);
//         return;
//     }

//     // CASE 3: Not Found
//     if (decision === "NOT_FOUND") {
//         const reply = "I couldn't find that specific place. Try being more specific.";
//         addMessage(reply, 'bot');
//         speak(reply);
//         return;
//     }

//     // CASE 4: Direct Match (Navigation)
//     // Find the object in our list
//     const match = flatLocations.find(loc => loc.fullName === decision || loc.title === decision);

//     if (match) {
//         addMessage(`Navigating to ${match.title}...`, 'bot');
//         speak(`Navigating to ${match.title}`);
//         selectLocation(match);
        
//         // Mobile UI cleanup
//         if(window.innerWidth < 768) chatPanel.classList.remove('active');
//     } else {
//         // Fallback
//         addMessage("I found a match but lost the coordinates.", 'bot');
//     }
// }

// // --- ADD THIS MISSING FUNCTION ---
// function handleNearestRequest(category) {
//     if (!currentUserPos) {
//         addMessage("I need your location first.", 'bot');
//         locateUser();
//         return;
//     }
    
//     // 1. Find all locations that match the category (e.g. "Canteens")
//     const candidates = flatLocations.filter(loc => 
//         loc.fullName.toLowerCase().includes(category.toLowerCase())
//     );

//     if (candidates.length === 0) {
//         addMessage("No matches found for that category.", 'bot');
//         return;
//     }

//     // 2. Calculate distances
//     let bestLoc = null;
//     let minDist = Infinity;

//     candidates.forEach(loc => {
//         if(loc.lat && loc.lng) {
//             const dist = getDistance(currentUserPos.lat, currentUserPos.lng, loc.lat, loc.lng);
//             if (dist < minDist) { 
//                 minDist = dist; 
//                 bestLoc = loc; 
//             }
//         }
//     });

//     // 3. Navigate to the closest one
//     if (bestLoc) {
//         const distText = minDist < 1000 ? Math.round(minDist) + "m" : (minDist/1000).toFixed(1) + "km";
//         addMessage(`The nearest is ${bestLoc.title} (${distText} away).`, 'bot');
//         speak(`The nearest is ${bestLoc.title}`);
//         selectLocation(bestLoc);
//     }
// }


// --- MANUAL LOCATION OVERRIDE (For Testing/Poor GPS) ---
function setManualLocation() {
    const lat = prompt('Enter Latitude (e.g., 11.358643):');
    const lng = prompt('Enter Longitude (e.g., 77.828868):');
    
    if (lat && lng) {
        const newLat = parseFloat(lat);
        const newLng = parseFloat(lng);
        
        if (!isNaN(newLat) && !isNaN(newLng)) {
            currentUserPos = { lat: newLat, lng: newLng };
            
            if (!userMarker) {
                userMarker = new maplibregl.Marker({ 
                    color: '#4CAF50', 
                    scale: 1.2,
                    draggable: true 
                }) 
                    .setLngLat([newLng, newLat])
                    .setPopup(new maplibregl.Popup().setHTML("<b>📍 Manual Location</b>"))
                    .addTo(map);
            } else {
                userMarker.setLngLat([newLng, newLat]);
            }
            
            map.flyTo({ center: [newLng, newLat], zoom: 17 });
            alert('✅ Location set manually!');
        }
    }
}

// Add keyboard shortcut (Ctrl+L) for manual location
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        setManualLocation();
    }
});


// === SYNC BUTTONS WITH UI PANEL MOVEMENT ===
// Makes chat-btn, recenter-btn, and map controls move with ui-container on mobile

class UIContainerButtonSync {
    constructor() {
        this.uiContainer = document.querySelector('.ui-container');
        this.chatBtn = document.getElementById('chat-toggle');
        this.recenterBtn = document.getElementById('recenter-btn');
        this.mapControls = document.querySelector('.maplibregl-ctrl-bottom-right');
        this.mapAttrButton = document.querySelector('.maplibregl-ctrl-attrib-button');
        
        this.isMobile = window.innerWidth <= 768;
        this.panelHeight = 0;
        this.panelTop = 0;
        
        if (!this.uiContainer) {
            console.warn("UI Container not found");
            return;
        }
        
        this.init();
    }
    
    init() {
        console.log("✅ UI Container Button Sync initialized");
        
        // Watch for panel open/close
        this.observePanelChanges();
        
        // Listen for resize to check if mobile
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth <= 768;
            this.updateButtonPositions();
        });
        
        // Listen for orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.updateButtonPositions(), 100);
        });
        
        // Continuous sync
        setInterval(() => this.updateButtonPositions(), 100);
        
        // Initial position update
        this.updateButtonPositions();
    }
    
    observePanelChanges() {
        // Observe class changes on ui-container
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    this.updateButtonPositions();
                }
            });
        });
        
        observer.observe(this.uiContainer, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });
    }
    
    updateButtonPositions() {
        if (!this.isMobile) {
            // Desktop - no syncing needed
            this.resetDesktopPositions();
            return;
        }
        
        // Mobile - sync with panel
        this.syncWithPanel();
    }
    
    syncWithPanel() {
        const panelRect = this.uiContainer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Get panel transform if it's sliding
        const transform = window.getComputedStyle(this.uiContainer).transform;
        const isOpen = this.uiContainer.classList.contains('open');
        
        // Calculate panel position
        this.panelTop = panelRect.top;
        this.panelHeight = panelRect.height;
        
        // Calculate button positions based on panel
        const chatBtnPosition = this.panelTop - 70;
        const recenterBtnPosition = this.panelTop - 130;
        const mapControlsPosition = this.panelTop - 100;
        
        // Update chat button position
        if (this.chatBtn) {
            if (isOpen && this.panelTop < viewportHeight * 0.8) {
                // Panel is open and visible - move buttons above it
                this.chatBtn.style.position = 'fixed';
                this.chatBtn.style.bottom = 'auto';
                this.chatBtn.style.top = `${chatBtnPosition}px`;
                this.chatBtn.style.zIndex = '50';
                this.chatBtn.style.transition = 'top 0.2s ease-out';
                this.chatBtn.classList.add('synced-with-panel');
            } else {
                // Panel closed - return to normal position
                this.chatBtn.style.position = 'fixed';
                this.chatBtn.style.bottom = 'calc(10vh + 20px)';
                this.chatBtn.style.top = 'auto';
                this.chatBtn.classList.remove('synced-with-panel');
            }
        }
        
        // Update recenter button position
        if (this.recenterBtn) {
            if (isOpen && this.panelTop < viewportHeight * 0.8) {
                this.recenterBtn.style.position = 'fixed';
                this.recenterBtn.style.bottom = 'auto';
                this.recenterBtn.style.top = `${recenterBtnPosition}px`;
                this.recenterBtn.style.zIndex = '49';
                this.recenterBtn.style.transition = 'top 0.2s ease-out';
                this.recenterBtn.classList.add('synced-with-panel');
            } else {
                this.recenterBtn.style.position = 'fixed';
                this.recenterBtn.style.bottom = 'calc(10vh + 20px)';
                this.recenterBtn.style.top = 'auto';
                this.recenterBtn.classList.remove('synced-with-panel');
            }
        }
        
        // Update map controls
        if (this.mapControls) {
            if (isOpen && this.panelTop < viewportHeight * 0.8) {
                this.mapControls.style.position = 'fixed';
                this.mapControls.style.bottom = 'auto';
                this.mapControls.style.top = `${mapControlsPosition}px`;
                this.mapControls.style.right = '16px';
                this.mapControls.style.transition = 'top 0.2s ease-out';
                this.mapControls.classList.add('synced-with-panel');
            } else {
                this.mapControls.style.position = 'absolute';
                this.mapControls.style.bottom = '62vh';
                this.mapControls.style.top = 'auto';
                this.mapControls.classList.remove('synced-with-panel');
            }
        }
    }
    
    resetDesktopPositions() {
        // Reset to normal desktop positions
        if (this.chatBtn) {
            this.chatBtn.style.position = 'absolute';
            this.chatBtn.style.bottom = '180px';
            this.chatBtn.style.top = 'auto';
            this.chatBtn.classList.remove('synced-with-panel');
        }
        
        if (this.recenterBtn) {
            this.recenterBtn.style.position = 'absolute';
            this.recenterBtn.style.bottom = '120px';
            this.recenterBtn.style.top = 'auto';
            this.recenterBtn.classList.remove('synced-with-panel');
        }
        
        if (this.mapControls) {
            this.mapControls.style.position = 'absolute';
            this.mapControls.style.bottom = '0';
            this.mapControls.style.top = 'auto';
            this.mapControls.classList.remove('synced-with-panel');
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.uiButtonSync = new UIContainerButtonSync();
    });
} else {
    window.uiButtonSync = new UIContainerButtonSync();
}

// Handle visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.uiButtonSync) {
        window.uiButtonSync.updateButtonPositions();
    }
});
// Start everything
initMap();