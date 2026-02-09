// --- ai_navigate_advanced.js (ENHANCED WITH SMART SEARCH) ---
// This file handles the Offline AI, Images, and Chat Logic with advanced features

// 1. DATA FLATTENER (Prepares the menu for the brain)
let flatLocations = [];

function flattenData(items, parentName = "") {
    items.forEach(item => {
        const fullTitle = parentName ? `${parentName} ${item.title}` : item.title;
        if (item.children) {
            flattenData(item.children, fullTitle);
        } else {
            flatLocations.push({ ...item, fullName: fullTitle });
        }
    });
}

// 2. ENHANCED SYNONYM DICTIONARY (The Offline Brain)
const synonyms = {
    "food": { 
        category: "Canteens", 
        tags: ["hungry", "eat", "snack", "lunch", "dinner", "breakfast", "cafe", "cafeteria"] 
    },
    "toilet": { 
        category: "Restrooms", 
        tags: ["loo", "washroom", "bathroom", "wc", "restroom"] 
    },
    "dorm": { 
        category: "Hostels", 
        tags: ["sleep", "bed", "room", "accommodation", "stay", "hostel"] 
    },
    "water": { 
        category: "Water Points", 
        tags: ["thirsty", "drink", "hydrate", "fountain"] 
    },
    "gym": { 
        category: "Gym", 
        tags: ["exercise", "fitness", "workout", "training"] 
    },
    "library": { 
        category: "Library", 
        tags: ["books", "study", "reading", "read"] 
    },
    "venue": { 
        category: "Venues", 
        tags: ["hall", "auditorium", "lab", "class", "classroom", "tutorial"] 
    }
};

// Helper function to find category from any synonym
function getCategoryFromSynonym(text) {
    text = text.toLowerCase();
    
    for (let key in synonyms) {
        if (text.includes(key)) {
            return synonyms[key].category;
        }
        
        // Check tags
        for (let tag of synonyms[key].tags) {
            if (text.includes(tag)) {
                return synonyms[key].category;
            }
        }
    }
    
    return null;
}

// 3. CATEGORY TAGS for better matching (now derived from synonyms)
const categoryTags = {};
Object.keys(synonyms).forEach(key => {
    const cat = synonyms[key].category;
    if (!categoryTags[cat]) {
        categoryTags[cat] = [];
    }
    categoryTags[cat].push(key, ...synonyms[key].tags);
});

// 4. STATE MANAGEMENT
let pendingResults = []; // Store multiple results for number selection
let awaitingNumberSelection = false;

// 5. UI ELEMENTS
const chatPanel = document.getElementById('chat-panel');
const chatToggle = document.getElementById('chat-toggle');
const closeChat = document.getElementById('close-chat');
const msgContainer = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const micBtn = document.getElementById('mic-btn');

// Toggle Chat
if(chatToggle) chatToggle.onclick = () => chatPanel.classList.add('active');
if(closeChat) closeChat.onclick = () => chatPanel.classList.remove('active');

// 6. INITIALIZE AI (After data is loaded)
function initializeAI() {
    if (typeof menuData === 'undefined' || menuData.length === 0) {
        console.warn("menuData not yet available, retrying...");
        setTimeout(initializeAI, 100);
        return;
    }
    
    flatLocations = [];
    flattenData(menuData);
    
    console.log("✅ AI Initialized! Flattened locations:", flatLocations);
    flatLocations.forEach(loc => {
        console.log(`  - ${loc.fullName}`);
    });
    
    // Show welcome message
    setTimeout(() => {
        const welcomeMsg = `<b>👋 Welcome!</b><br>I can help you find:<br>• Canteens 🍽️<br>• Restrooms 🚻<br>• Hostels 🏠<br>• Venues 📚<br>• Water Points 💧<br><br>Try: <i>"Find food"</i> or <i>"Nearest toilet"</i>`;
        addHTMLMessage(welcomeMsg, 'bot');
    }, 500);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAI);
} else {
    initializeAI();
}

// 7. FUSE SEARCH ENGINE
function createFuse() {
    if (flatLocations.length === 0) {
        console.warn("flatLocations is still empty!");
        return null;
    }
    const fuseOptions = {
        keys: ['title', 'fullName'], 
        threshold: 0.4,
        shouldSort: true,
        minMatchCharLength: 2
    };
    return new Fuse(flatLocations, fuseOptions);
}

// 8. CORE BRAIN FUNCTION (ENHANCED)
function processCommand(rawText) {
    const text = rawText.toLowerCase().trim();
    if(!text) return;

    addMessage(rawText, 'user');

    // A. NUMBER SELECTION MODE
    if (awaitingNumberSelection && /^[1-3]$/.test(text)) {
        const index = parseInt(text) - 1;
        if (index >= 0 && index < pendingResults.length) {
            const selected = pendingResults[index];
            navigateToLocation(selected);
            awaitingNumberSelection = false;
            pendingResults = [];
            return;
        }
    }

    // Reset number selection mode
    awaitingNumberSelection = false;
    pendingResults = [];

    // B. Small Talk
    if (text.match(/^(hi|hello|hey|sup|yo)/)) {
        const reply = "Hello! 👋 Where would you like to go? Try <b>'Find food'</b>, <b>'Nearest toilet'</b>, or <b>'Show hostels'</b>.";
        addHTMLMessage(reply, 'bot');
        return;
    }

    // C. Show alternatives / other options
    if (text.match(/other|another|different|more|alternatives|show all/)) {
        if (pendingResults.length > 0) {
            // Show next set of results
            botReply("Here are all the options again:");
            handleMultipleResults(pendingResults);
        } else {
            botReply("What type of location are you looking for? Try: Canteens, Restrooms, Hostels, etc.");
        }
        return;
    }

    // D. Help/Confused
    if (text.match(/help|what can you do|commands/)) {
        const helpMsg = `<b>I can help you:</b><br>• Find locations: "Find food"<br>• Get nearest: "Nearest toilet"<br>• Show category: "Show canteens"<br>• Quick select: Reply with 1, 2, or 3`;
        addHTMLMessage(helpMsg, 'bot');
        return;
    }

    // D. NEAREST Logic
    if (text.includes("nearest") || text.includes("closest") || text.includes("near me")) {
        // Try to find category from synonyms
        const foundCategory = getCategoryFromSynonym(text);
        if (foundCategory) {
            handleNearestRequest(foundCategory);
        } else {
            botReply("What location type are you looking for? Try: food, toilet, hostel, water, or gym.");
        }
        return;
    }

    // E. Gender Clarification (Boys/Girls)
    if (text.includes("boys") || text.includes("girls") || text.includes("boy") || text.includes("girl")) {
        const gender = text.includes("boy") ? "Boys" : "Girls";
        const matches = flatLocations.filter(loc => 
            loc.fullName.toLowerCase().includes(gender.toLowerCase())
        );
        
        if (matches.length > 0) {
            if (matches.length === 1) {
                navigateToLocation(matches[0]);
            } else {
                handleMultipleResults(matches);
            }
        }
        return;
    }

    // F. DIRECT CATEGORY REQUESTS (using new synonym helper)
    const foundCategory = getCategoryFromSynonym(text);
    if (foundCategory) {
        const matches = flatLocations.filter(loc => 
            loc.fullName.includes(foundCategory)
        );
        
        if (matches.length > 0) {
            if (currentUserPos) {
                handleNearestRequest(foundCategory);
            } else {
                handleMultipleResults(matches.slice(0, 3));
            }
            return;
        }
    }

    // G. SMART SEARCH with Multi-Results
    let searchText = text;
    const categoryFromText = getCategoryFromSynonym(text);
    
    // Enhance search with category name if found
    if (categoryFromText) {
        searchText = categoryFromText + " " + text;
    }
    
    // Enhance with all category tags for better fuzzy matching
    Object.keys(categoryTags).forEach(cat => {
        if (categoryTags[cat].some(tag => text.includes(tag))) {
            searchText += " " + cat;
        }
    });

    console.log("🔍 Searching for:", searchText);
    
    const fuse = createFuse();
    if (!fuse) {
        botReply("AI is still loading. Please try again in a moment.");
        return;
    }
    
    const results = fuse.search(searchText);
    console.log("📍 Found results:", results);

    if (results.length > 0) {
        const matches = results.map(r => r.item);
        
        // CASE 1: Single result - navigate immediately
        if (matches.length === 1) {
            navigateToLocation(matches[0]);
        }
        // CASE 2: 2-3 results - show with distances
        else if (matches.length <= 3 && currentUserPos) {
            handleMultipleResults(matches);
        }
        // CASE 3: 4+ results - ask about distance preference
        else if (matches.length >= 4 && currentUserPos) {
            askDistancePreference(matches);
        }
        // CASE 4: Multiple results but no GPS
        else {
            const firstThree = matches.slice(0, 3);
            handleMultipleResults(firstThree, false);
        }

    } else {
        const suggestions = getSuggestions(text);
        botReply(`I couldn't find that. ${suggestions}`);
        speak("I couldn't find that location.");
    }
}

// 9. HANDLE MULTIPLE RESULTS (2-3 options with distances)
function handleMultipleResults(locations, showDistance = true) {
    if (!locations || locations.length === 0) return;
    
    // Calculate distances if GPS available
    let locationsWithDistance = locations.map(loc => {
        if (showDistance && currentUserPos && loc.lat && loc.lng) {
            const dist = getDistance(currentUserPos.lat, currentUserPos.lng, loc.lat, loc.lng);
            const walkTime = Math.ceil(dist / (1.4 * 60)); // Walking speed: 1.4 m/s
            return { 
                ...loc, 
                distance: dist,
                walkTime: walkTime,
                distanceText: dist < 1000 ? `${Math.round(dist)}m` : `${(dist/1000).toFixed(1)}km`
            };
        }
        return { ...loc, distance: null };
    });

    // Sort by distance if available
    if (showDistance) {
        locationsWithDistance.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
    }

    // Store for number selection
    pendingResults = locationsWithDistance;
    awaitingNumberSelection = true;

    // **NEW: Show all locations on map with markers**
    if (typeof map !== 'undefined' && locationsWithDistance.length > 0) {
        showMultipleMarkersOnMap(locationsWithDistance);
    }

    // Build HTML message
    let msg = `<b>🎯 Found ${locations.length} options:</b><br><br>`;
    
    locationsWithDistance.forEach((loc, idx) => {
        msg += `<b>${idx + 1}.</b> ${loc.title}`;
        if (loc.distance !== null) {
            msg += ` - <i>${loc.distanceText}</i> (${loc.walkTime} min walk) ⏱️`;
        }
        msg += `<br>`;
    });
    
    msg += `<br>👉 <b>Reply with a number (1-${Math.min(locations.length, 3)}) to select</b>`;
    
    addHTMLMessage(msg, 'bot');
    speak(`I found ${locations.length} options. Reply with a number to select one.`);
}

// 10. SHOW MULTIPLE MARKERS ON MAP
let multipleMarkers = []; // Store markers to clean up later

function showMultipleMarkersOnMap(locations) {
    // Clear previous markers
    multipleMarkers.forEach(marker => marker.remove());
    multipleMarkers = [];

    // Add numbered markers for each location
    locations.forEach((loc, idx) => {
        if (loc.lat && loc.lng) {
            // Create custom marker element with number
            const el = document.createElement('div');
            el.className = 'numbered-marker';
            el.innerHTML = `<div style="
                background: #FF5722;
                color: white;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 16px;
                border: 3px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                cursor: pointer;
            ">${idx + 1}</div>`;

            // Create marker
            const marker = new maplibregl.Marker({ element: el })
                .setLngLat([loc.lng, loc.lat])
                .setPopup(
                    new maplibregl.Popup({ offset: 25 })
                        .setHTML(`
                            <div style="padding: 5px;">
                                <b>${loc.title}</b><br>
                                ${loc.distance ? `<small>${loc.distanceText} (${loc.walkTime} min)</small>` : ''}
                            </div>
                        `)
                )
                .addTo(map);

            // Click handler to select location
            el.onclick = () => {
                navigateToLocation(loc);
                awaitingNumberSelection = false;
                pendingResults = [];
            };

            multipleMarkers.push(marker);
        }
    });

    // Fit map to show all markers
    if (locations.length > 0 && currentUserPos) {
        const bounds = new maplibregl.LngLatBounds();
        
        // Include user position
        bounds.extend([currentUserPos.lng, currentUserPos.lat]);
        
        // Include all locations
        locations.forEach(loc => {
            if (loc.lat && loc.lng) {
                bounds.extend([loc.lng, loc.lat]);
            }
        });

        map.fitBounds(bounds, {
            padding: { top: 100, bottom: 300, left: 50, right: 50 },
            maxZoom: 17
        });
    }
}

function askDistancePreference(locations) {
    const msg = `<b>🔍 Found ${locations.length} locations!</b><br><br>How far are you willing to walk?<br><br><b>1.</b> Under 200m (2 min) 🚶<br><b>2.</b> Under 500m (6 min) 🚶‍♂️<br><b>3.</b> Show all<br><br>👉 Reply with 1, 2, or 3`;
    
    addHTMLMessage(msg, 'bot');
    speak(`Found ${locations.length} locations. How far are you willing to walk?`);
    
    // Wait for filter response
    awaitingNumberSelection = true;
    
    // Store the filtering logic in a temporary handler
    const originalResults = locations;
    
    // Override next input to handle distance filter
    const tempHandler = (choice) => {
        const filters = {
            '1': 200,
            '2': 500,
            '3': Infinity
        };
        
        const maxDistance = filters[choice];
        if (!maxDistance) return;
        
        const filtered = originalResults
            .map(loc => {
                const dist = getDistance(currentUserPos.lat, currentUserPos.lng, loc.lat, loc.lng);
                return { ...loc, distance: dist };
            })
            .filter(loc => loc.distance <= maxDistance)
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 3);
        
        if (filtered.length === 0) {
            botReply("No locations found within that distance. Try option 3 to see all.");
            return;
        }
        
        handleMultipleResults(filtered);
    };
    
    // Temporarily modify pending results for distance filter
    pendingResults = [null, null, null]; // Placeholder for 1, 2, 3 choices
    
    // Store original locations for filtering
    window._tempFilterLocations = originalResults;
    window._tempFilterHandler = tempHandler;
}

// 11. NAVIGATE TO LOCATION (With Image + Voice)
function navigateToLocation(location) {
    if (!location) return;
    
    // **NEW: Clear multiple markers when selecting one**
    multipleMarkers.forEach(marker => marker.remove());
    multipleMarkers = [];
    
    const distInfo = location.distance 
        ? ` - ${location.distanceText} away (${location.walkTime} min walk)` 
        : '';
    
    const msg = `<b>✅ Navigating to:</b><br>${location.title}${distInfo}`;
    addHTMLMessage(msg, 'bot');
    speak(`Navigating to ${location.title}`);
    
    // Show Image
    if (location.image) {
        addChatImage(location.image);
    }

    // Trigger Navigation from script.js
    if (typeof selectLocation === 'function') {
        selectLocation(location);
    }
    
    // Mobile UI Cleanup
    if(window.innerWidth < 768) {
        setTimeout(() => chatPanel.classList.remove('active'), 2000);
    }
}

// 12. HANDLE NEAREST REQUEST (Enhanced)
function handleNearestRequest(category) {
    if (typeof currentUserPos === 'undefined' || !currentUserPos) {
        botReply("📍 I need your GPS location first. Locating you...");
        if(typeof locateUser === 'function') locateUser();
        return;
    }

    // Expand category with synonyms
    let searchTerms = [category];
    Object.keys(categoryTags).forEach(cat => {
        if (categoryTags[cat].some(tag => category.toLowerCase().includes(tag))) {
            searchTerms.push(cat);
        }
    });

    const candidates = flatLocations.filter(loc => 
        searchTerms.some(term => 
            loc.fullName.toLowerCase().includes(term.toLowerCase())
        )
    );

    if (candidates.length === 0) {
        botReply(`❌ I couldn't find any "${category}" locations. Try: Canteens, Restrooms, Hostels, Venues, Water Points.`);
        return;
    }

    // Find closest
    let bestLoc = null;
    let minDist = Infinity;

    candidates.forEach(loc => {
        if(loc.lat && loc.lng) {
            const dist = getDistance(currentUserPos.lat, currentUserPos.lng, loc.lat, loc.lng);
            if (dist < minDist) {
                minDist = dist;
                bestLoc = loc;
            }
        }
    });

    if (bestLoc) {
        const distText = minDist < 1000 ? Math.round(minDist) + "m" : (minDist/1000).toFixed(1) + "km";
        const walkTime = Math.ceil(minDist / (1.4 * 60));
        
        bestLoc.distance = minDist;
        bestLoc.distanceText = distText;
        bestLoc.walkTime = walkTime;
        
        navigateToLocation(bestLoc);
    }
}

// 13. HELPER FUNCTIONS
function botReply(text) {
    addMessage(text, 'bot');
}

function addMessage(text, type) {
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    div.innerText = text;
    msgContainer.appendChild(div);
    msgContainer.scrollTop = msgContainer.scrollHeight;
}

function addHTMLMessage(html, type) {
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    div.innerHTML = html;
    msgContainer.appendChild(div);
    msgContainer.scrollTop = msgContainer.scrollHeight;
}

function addChatImage(src) {
    const div = document.createElement('div');
    div.className = 'msg bot'; 
    div.style.background = 'transparent'; 
    div.style.padding = '0';
    div.style.marginTop = '5px';
    
    const img = document.createElement('img');
    img.src = src;
    img.style.maxWidth = '200px'; 
    img.style.borderRadius = '12px';
    img.style.border = '2px solid rgba(0,0,0,0.1)';
    img.style.cursor = 'pointer';
    
    img.onclick = () => {
        if(typeof openModal === 'function') openModal(src, "Reference Image");
    };
    
    div.appendChild(img);
    msgContainer.appendChild(div);
    msgContainer.scrollTop = msgContainer.scrollHeight;
}

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    speech.rate = 1.1;
    window.speechSynthesis.speak(speech);
}

function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371000; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lng2 - lng1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

function getSuggestions(query) {
    const available = ["Canteens 🍽️", "Restrooms 🚻", "Hostels 🏠", "Venues 📚", "Water Points 💧"];
    return `Try: ${available.join(", ")}`;
}

// 14. EVENT LISTENERS
if(sendBtn) {
    sendBtn.onclick = () => {
        if (userInput.value.trim()) {
            // Check if we're in distance filter mode
            if (window._tempFilterHandler && /^[1-3]$/.test(userInput.value.trim())) {
                window._tempFilterHandler(userInput.value.trim());
                delete window._tempFilterHandler;
                delete window._tempFilterLocations;
                userInput.value = '';
                return;
            }
            
            processCommand(userInput.value);
            userInput.value = '';
        }
    };
}

if(userInput) {
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && userInput.value.trim()) {
            // Check if we're in distance filter mode
            if (window._tempFilterHandler && /^[1-3]$/.test(userInput.value.trim())) {
                window._tempFilterHandler(userInput.value.trim());
                delete window._tempFilterHandler;
                delete window._tempFilterLocations;
                userInput.value = '';
                return;
            }
            
            processCommand(userInput.value);
            userInput.value = '';
        }
    });
}

// 15. VOICE RECOGNITION
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition && micBtn) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    micBtn.onclick = () => {
        if (micBtn.classList.contains('listening')) {
            recognition.stop();
        } else {
            recognition.start();
        }
    };

    recognition.onstart = () => {
        micBtn.classList.add('listening');
        userInput.placeholder = "🎤 Listening...";
    };

    recognition.onend = () => {
        micBtn.classList.remove('listening');
        userInput.placeholder = "Type or speak...";
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        processCommand(transcript);
    };
    
    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        botReply("Sorry, I didn't catch that. Please try again.");
    };
} else if (micBtn) {
    micBtn.style.display = 'none';
}