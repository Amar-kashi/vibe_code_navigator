// --- ai_navigate_advanced.js (ENHANCED WITH SMART SEARCH) ---
// This file handles the Offline AI, Images, and Chat Logic with advanced features

// 1. DATA FLATTENER (Prepares the menu for the brain)
let flatLocations = [];

function flattenData(items, parentName = "") {
    items.forEach(item => {
        const fullTitle = parentName ? `${parentName} ${item.title}` : item.title;
        
        // Handle both leaf nodes AND nodes with lat/lng (even if they have children)
        if (item.lat && item.lng) {
            flatLocations.push({ 
                ...item, 
                fullName: fullTitle,
                landmark: item.landmark || null,
                floors: item.floors || null
            });
        }
        
        // Process children if they exist
        if (item.children) {
            flattenData(item.children, fullTitle);
        }
    });
}

// 2. ENHANCED SYNONYM DICTIONARY (The Offline Brain)
const synonyms = {
    "food": { 
        category: "Canteens", 
        tags: ["hungry", "eat", "snack", "lunch", "dinner", "breakfast", "cafe", "cafeteria", "food", "mess", "dining"] 
    },
    "toilet": { 
        category: "Restrooms", 
        tags: ["poo", "washroom", "bathroom", "wc", "restroom", "loo", "lavatory"] 
    },
    "dorm": { 
        category: "Hostels", 
        tags: ["sleep", "bed", "room", "accommodation", "stay", "hostel", "rest", "relax", "residence"] 
    },
    "water": { 
        category: "Water Points", 
        tags: ["thirsty", "drink", "hydrate", "fountain", "aqua", "h2o"] 
    },
    "gym": { 
        category: "Gym", 
        tags: ["exercise", "fitness", "workout", "training", "sports", "physical"] 
    },
    "library": { 
        category: "Library", 
        tags: ["books", "study", "reading", "read", "book"] 
    },
    "venue": { 
        category: "Venues", 
        tags: ["hall", "auditorium", "lab", "class", "classroom", "tutorial", "seminar", "conference", "room"] 
    },
    
    
    // HACKATHON EVENTS
    "hackathon": {
        category: "Hackathons",
        tags: ["hack", "coding competition", "neurahack", "vibe code", "vibecode", "neuro code", "neurocode", 
               "pcbathon", "cloudathon", "bionexathon", "designathon", "sdgathon", "startup pitch", 
               "matlab simulation", "competition", "coding event", "hack event"]
    },
    "neurahack": {
        category: "Hackathons",
        tags: ["neurahack", "neura hack", "neural hack", "cyberdome", "cse lab", "it park","neura"]
    },
    "vibecode": {
        category: "Hackathons",
        tags: ["vibe code", "vibecode", "vibe", "26", "vibe code 26", "cyberdome", "net lab"]
    },
    
    // WORKSHOPS
    "workshop": {
        category: "Workshops",
        tags: ["workshop", "training", "hands on", "practical", "learning session", "skill training",
               "flight mode", "chip2test", "iot", "ev", "agentic ai", "ai arcade", "blockchain",
               "food innovations", "sequencing", "bim", "medi tech", "matlab", "github", 
               "mobile app", "cyber strike", "lora", "ipr", "vehicle development"]
    },
    "ai workshop": {
        category: "Workshops",
        tags: ["agentic ai", "ai arcade", "ai integrated", "artificial intelligence", "machine learning"]
    },
    "blockchain": {
        category: "Workshops",
        tags: ["blockchain", "crypto", "cryptocurrency", "web3", "distributed ledger"]
    },
    
    // TECHNICAL EVENTS
    "technical": {
        category: "Technical Events",
        tags: ["tech event", "technical", "cody challenge", "system sense", "ai mystery", 
               "bioblitz", "reel-o-science", "3d arena", "zero component", "drapex", "neura code",
               "coding", "programming", "tech competition"]
    },
    
    // SPORTS EVENTS
    "sports": {
        category: "Sports Events",
        tags: ["sport", "game", "play", "cricket", "turf", "ground", "match", "tournament", "athletic"]
    },
    "cricket": {
        category: "Sports Events",
        tags: ["cricket", "turf cricket", "bat", "ball", "wicket", "pitch"]
    },
    
    // TECH SHOWS
    "show": {
        category: "Tech Shows",
        tags: ["show", "exhibition", "expo", "display", "demonstration", "demo",
               "drone show", "auto show", "texexpo", "food expo", "tech show"]
    },
    "drone": {
        category: "Tech Shows",
        tags: ["drone", "uav", "quadcopter", "aerial", "flying", "breeze land"]
    },
    "expo": {
        category: "Tech Shows",
        tags: ["expo", "exhibition", "texexpo", "food expo", "showcase", "display"]
    },
    
    // CULTURAL EVENTS
    "cultural": {
        category: "Cultural Events",
        tags: ["cultural", "culture", "art", "dance", "music", "entertainment", "performance",
               "infinite step", "beat mode", "cine fest", "musical mavericks", "spotlight",
               "visveswaraya hall", "cyberdome"]
    },
    "dance": {
        category: "Cultural Events",
        tags: ["dance", "dancing", "infinite step", "beat mode", "performance", "choreography"]
    },
    "music": {
        category: "Cultural Events",
        tags: ["music", "musical", "beat", "song", "musical mavericks", "band", "concert"]
    },
    "film": {
        category: "Cultural Events",
        tags: ["film", "movie", "cinema", "cine fest", "screening", "cinematic"]
    },
    
    // NANO TECH EVENTS
    "nanotech": {
        category: "Nano Tech Events",
        tags: ["nano tech", "nanotech", "nano", "mini event", "quick event", "short event",
               "meme contest", "ipl auction", "jam", "just a minute", "civil circuit",
               "emoji pictionary", "treasure hunt", "battle arena", "kahoot", "quiz",
               "twisted tiles", "logo quiz", "unit wars", "unmasking brands", "line x",
               "face painting", "tech without tech", "mind spark", "freezeframe", "t2t",
               "blindbites"]
    },
    "quiz": {
        category: "Nano Tech Events",
        tags: ["quiz", "kahoot", "logo quiz", "trivia", "questions", "competition"]
    },
    "game": {
        category: "Nano Tech Events",
        tags: ["game", "gaming", "battle arena", "treasure hunt", "emoji pictionary", "play"]
    },
    
    // PRESENTATIONS
    "presentation": {
        category: "Presentations",
        tags: ["presentation", "present", "project presentation", "poster presentation", 
               "paper presentation", "display", "showcase", "demo", "demonstration"]
    },
    "project": {
        category: "Presentations",
        tags: ["project", "project presentation", "final year", "mini project", "major project"]
    },
    "poster": {
        category: "Presentations",
        tags: ["poster", "poster presentation", "display board", "exhibit"]
    },
    "paper": {
        category: "Presentations",
        tags: ["paper", "paper presentation", "research paper", "technical paper", "ieee"]
    },
    
    // CONFERENCES & TALKS
    "conference": {
        category: "Conferences & Talks",
        tags: ["conference", "seminar", "symposium", "talk", "speech", "lecture",
               "leaders talk", "tech talk", "guest lecture", "keynote"]
    },
    "talk": {
        category: "Conferences & Talks",
        tags: ["talk", "speech", "lecture", "leaders talk", "tech talk", "guest speaker"]
    },
    
    // DEPARTMENTS
    "cse": {
        category: "CSE",
        tags: ["cse", "computer science", "cs", "computer science engineering", "cse lab", "it park"]
    },
    "it": {
        category: "IT",
        tags: ["it", "information technology", "it park", "it lab", "net lab"]
    },
    "ece": {
        category: "ECE",
        tags: ["ece", "electronics", "communication", "electronics and communication", "ec"]
    },
    "eee": {
        category: "EEE",
        tags: ["eee", "electrical", "electrical and electronics", "ee", "power", "m block"]
    },
    "mct": {
        category: "MCT",
        tags: ["mct", "mechatronics", "j block", "robotics", "automation"]
    },
    "mech": {
        category: "Mechanical",
        tags: ["mech", "mechanical", "mechanical engineering", "design", "cad", "cam"]
    },
    "civil": {
        category: "Civil",
        tags: ["civil", "civil engineering", "construction", "structure", "building"]
    },
    "biotech": {
        category: "Biotechnology",
        tags: ["biotech", "biotechnology", "bt", "bio", "h block", "life science"]
    },
    "aiml": {
        category: "AIML",
        tags: ["aiml", "ai ml", "ai and ml", "artificial intelligence and machine learning", "ai"]
    },
    "aids": {
        category: "AI & DS",
        tags: ["ai ds", "ai and ds", "aids", "artificial intelligence and data science", "data science"]
    },
    "csbs": {
        category: "CSBS",
        tags: ["csbs", "cs bs", "computer science and business systems", "business systems"]
    },
    "vlsi": {
        category: "VLSI",
        tags: ["vlsi", "very large scale integration", "chip design", "ic design", "vlsi lab"]
    },
    "textile": {
        category: "Textile",
        tags: ["textile", "txt", "fashion", "garment", "fabric", "g block", "lm block"]
    },
    "foodtech": {
        category: "Food Technology",
        tags: ["food tech", "ft", "food technology", "food science", "baking", "nutrition"]
    },
    "mba": {
        category: "MBA",
        tags: ["mba", "management", "business", "f block", "amartyasen", "fintech"]
    },
    "mca": {
        category: "MCA",
        tags: ["mca", "master of computer applications", "post graduate"]
    },
    
    // SPECIFIC LABS & VENUES
    "cyberdome": {
        category: "Venues",
        tags: ["cyberdome", "cyber dome", "3rd floor it park", "it park"]
    },
    "visveswaraya": {
        category: "Venues",
        tags: ["visveswaraya", "vishveshwarya", "vish hall", "visvesvaraya hall", "m block"]
    },
    "amartyasen": {
        category: "Venues",
        tags: ["amartyasen", "amartya sen", "amartya", "f block", "mba hall"]
    },
    "ksr hall": {
        category: "Venues",
        tags: ["ksr hall", "ksr", "main hall", "entrance hall", "auditorium"]
    },
    "incubation": {
        category: "Venues",
        tags: ["incubation", "ptc", "innovation", "startup", "entrepreneur", "innovation park"]
    },
    "breeze land": {
        category: "Venues",
        tags: ["breeze land", "breezeland", "breeze", "open area", "ground"]
    },
    
    // PARKING
    "parking": {
        category: "Parking",
        tags: ["parking", "vehicle", "bike", "car", "two wheeler", "four wheeler", "park"]
    },
    
    // ATM
    "atm": {
        category: "ATM",
        tags: ["atm", "cash", "money", "bank", "withdraw", "deposit"]
    },
    
    // SHOP
    "shop": {
        category: "Shops",
        tags: ["shop", "store", "xerox", "photocopy", "stationery", "stationary", "supplies"]
    },
    
    // ADMINISTRATIVE
    "office": {
        category: "Administrative",
        tags: ["office", "admin", "administration", "hod", "principal", "dean", "management"]
    }
};

// DATE QUERY KEYWORDS
const dateKeywords = ["when", "what day", "what date", "schedule", "timing", "date", "time"];

// Helper to detect date queries
function isDateQuery(text) {
    return dateKeywords.some(keyword => text.toLowerCase().includes(keyword));
}
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
        const welcomeMsg = `<b>👋 Hi — I'm Vibe Guide!</b><br>I can help you navigate campus and find:<br>• Canteens 🍽️ • Restrooms 🚻 • Hostels 🏠<br>• Venues 📚 • Departments 🏢 • Events 🎉<br>• Water Points 💧 • Parking 🚗 • ATMs 💳<br><br>Try: <i>"Show all events"</i>, <i>"When is Vibe Code?"</i>, <i>"Nearest toilet"</i>, or <i>"Find Drone Show"</i><br><br>For emergency help, type <b>"emergency"</b>.`;
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
// Conversation context tracking for follow-ups
let conversationContext = {
    lastIntent: null,
    lastQuery: null,
    pendingFollowUp: null // e.g. { type: 'show_alternatives' }
};

function updateContext(intent, query, extras = {}) {
    conversationContext.lastIntent = intent;
    conversationContext.lastQuery = query;
    conversationContext.pendingFollowUp = extras.pendingFollowUp || null;
}

function processCommand(rawText) {
    const text = rawText.toLowerCase().trim();
    if(!text) return;

    addMessage(rawText, 'user');

    // A. NUMBER SELECTION MODE (Enhanced for 1-99)
    if (awaitingNumberSelection) {
        const numMatch = text.match(/^(\d+)$/);
        if (numMatch) {
            const index = parseInt(numMatch[1]) - 1;
            if (index >= 0 && index < pendingResults.length) {
                const selected = pendingResults[index];
                navigateToLocation(selected);
                awaitingNumberSelection = false;
                pendingResults = [];
                return;
            } else {
                botReply(`⚠️ Please select a number between 1 and ${pendingResults.length}`);
                return;
            }
        }
    }

    // Reset number selection mode
    awaitingNumberSelection = false;
    pendingResults = [];

    // FOLLOW-UP YES/NO HANDLING (if a question was pending)
    if (conversationContext.pendingFollowUp && (text === 'yes' || text === 'no' || text.startsWith('y') || text.startsWith('n'))) {
        const ansYes = text.startsWith('y');
        const pf = conversationContext.pendingFollowUp;
        if (pf && pf.type === 'show_alternatives') {
            if (ansYes) {
                if (!currentUserPos) {
                    botReply('🌍 Getting your location...');
                    // Try to get location from map or browser
                    if (typeof map !== 'undefined' && map.getCenter) {
                        const center = map.getCenter();
                        currentUserPos = { lat: center.lat, lng: center.lng };
                        botReply('📍 Using map center. What are you looking for?');
                    } else if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            (pos) => {
                                currentUserPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                                botReply('✅ Location found! What are you looking for?');
                            },
                            () => botReply('❌ Could not get location. Try searching by name.')
                        );
                    }
                } else if (pf.query) {
                    processCommand(pf.query + ' near me');
                } else {
                    botReply('Okay — what type of places should I look for?');
                }
            } else {
                botReply('Okay, let me know if you need anything else.');
            }
            conversationContext.pendingFollowUp = null;
            return;
        }
        if (pf && pf.type === 'call_security') {
            if (ansYes) {
                botReply('Calling Campus Security now...');
                // fallback phone number
                try { window.open('tel:+1234567890'); } catch (e) {}
            } else {
                botReply('Okay, I will not call. Stay safe.');
            }
            conversationContext.pendingFollowUp = null;
            return;
        }
        // generic confirmation
        conversationContext.pendingFollowUp = null;
    }
    // A. Detect "all" or "every" requests
    const isShowAllRequest = text.match(/all|every|show (me )?all|give (me )?all|list all/);
    // DATE/TIME QUERIES - Handle "when is" questions
    if (text.match(/when (is|are)|what (day|date|time)|schedule|timing/)) {
        // Extract event name from query
        const eventQuery = text.replace(/(when|is|are|what|day|date|time|schedule|timing|the)/g, "").trim();
        
        // Search for events with dates
        const fuse = createFuse();
        if (fuse) {
            const results = fuse.search(eventQuery);
            
            if (results.length > 0) {
                const eventsWithDates = results
                    .map(r => r.item)
                    .filter(loc => loc.date);
                
                if (eventsWithDates.length > 0) {
                    let dateMsg = `<b>📅 Event Schedule:</b><br><br>`;
                    
                    eventsWithDates.slice(0, 5).forEach((loc, idx) => {
                        const title = loc.title || loc.fullName;
                        const landmark = loc.landmark ? ` - ${loc.landmark}` : '';
                        dateMsg += `<b>${idx + 1}.</b> ${title}<br>&nbsp;&nbsp;&nbsp;📅 ${loc.date}${landmark}<br>`;
                    });
                    
                    if (eventsWithDates.length > 5) {
                        dateMsg += `<br><small>Showing ${Math.min(5, eventsWithDates.length)} of ${eventsWithDates.length} events</small>`;
                    }
                    
                    addHTMLMessage(dateMsg, 'bot');
                    updateContext('date_query', eventQuery);
                    return;
                } else {
                    botReply(`I found "${results[0].item.title}" but I don't have the date information for it yet.`);
                    return;
                }
            }
        }
        
        botReply("I couldn't find that event. Try asking about specific events like 'When is Vibe Code?' or 'What date is the Drone Show?'");
        return;
    }
    // B. Small Talk
    if (text.match(/^(hi|hello|hey|sup|yo)/)) {
        const reply = "Hello! 👋 Where would you like to go? Try <b>'Find food'</b>, <b>'Nearest toilet'</b>, or <b>'Show hostels'</b>.";
        addHTMLMessage(reply, 'bot');
        updateContext('greeting', rawText);
        return;
    }

    // Emergency immediate path
    if (text.match(/\b(emergency|help me|ambulance|police|fire|urgent)\b/)) {
        showEmergencyHelp();
        updateContext('emergency', rawText, { pendingFollowUp: null });
        return;
    }

    // C. Show alternatives / other options
    if (text.match(/other|another|different|more|alternatives|show all/)) {
        updateContext('show_alternatives', rawText);
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
        showHelpMessage();
        updateContext('help', rawText);
        return;
    }

    // C. "Show all" / "Give all" requests - ENHANCED
    if (text.match(/show all|give all|list all|all the|show me all|all locations|every location/)) {
        let category = text.replace(/(show|give|list|all|the|me|locations?|every)/g, "").trim();
        
        // If no category specified, show ALL locations
        if (!category || category.length < 2) {
            botReply(`📍 Found ${flatLocations.length} total locations on campus!`);
            handleMultipleResults(flatLocations, currentUserPos ? true : false);
            showMultipleMarkersOnMap(flatLocations.slice(0, 50)); // Limit markers to prevent performance issues
            updateContext('show_all_locations', 'all');
            return;
        }
        
        // Map to category
        const foundCategory = getCategoryFromSynonym(category);
        
        if (foundCategory) {
            const matches = flatLocations.filter(loc => 
                loc.fullName.toLowerCase().includes(foundCategory.toLowerCase())
            );
            
            if (matches.length > 0) {
                botReply(`📍 Found ${matches.length} ${foundCategory} locations!`);
                // Show ALL results with distances
                if (currentUserPos) {
                    handleMultipleResults(matches, true);
                } else {
                    handleMultipleResults(matches, false);
                }
                showMultipleMarkersOnMap(matches); // Show all on map
                updateContext('show_all_category', foundCategory);
                return;
            }
        } else {
            // Try to find by partial match
            const partialMatches = flatLocations.filter(loc =>
                loc.fullName.toLowerCase().includes(category.toLowerCase()) ||
                loc.title.toLowerCase().includes(category.toLowerCase())
            );
            
            if (partialMatches.length > 0) {
                botReply(`📍 Found ${partialMatches.length} locations matching "${category}"!`);
                handleMultipleResults(partialMatches, currentUserPos ? true : false);
                showMultipleMarkersOnMap(partialMatches);
                updateContext('show_partial_match', category);
                return;
            }
        }
    }

    // D. NEAREST Logic (ONLY if not "show all")
    if (!isShowAllRequest && (text.includes("nearest") || text.includes("closest") || text.includes("near me"))) {
        let category = text.replace(/(nearest|closest|near me|find|show)/g, "").trim();
        
        // Replace with synonyms
        Object.keys(synonyms).forEach(key => {
            if (category.includes(key)) {
                category = synonyms[key].category;
            }
        });
        
        handleNearestRequest(category);
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

    // F. DIRECT CATEGORY REQUESTS (food, toilet, departments, events, etc.)
    const foundCategory = getCategoryFromSynonym(text);

    if (foundCategory) {
        const matches = flatLocations.filter(loc => 
            loc.fullName.toLowerCase().includes(foundCategory.toLowerCase())
        );
        
        if (matches.length > 0) {
            // Check if user wants all or just nearest
            const wantsAll = text.match(/all|every|show|list/);
            
            if (wantsAll) {
                // Show ALL results
                botReply(`📍 Found ${matches.length} ${foundCategory} locations!`);
                handleMultipleResults(matches, currentUserPos ? true : false, null, true);
                showMultipleMarkersOnMap(matches);
            } else if (matches.length <= 5) {
                // Show up to 5 if only a few results
                handleMultipleResults(matches, currentUserPos ? true : false, null, true);
            } else if (currentUserPos) {
                // Show nearest 5 if GPS available
                const nearest = matches
                    .map(loc => ({
                        ...loc,
                        distance: getDistance(currentUserPos.lat, currentUserPos.lng, loc.lat, loc.lng)
                    }))
                    .sort((a, b) => a.distance - b.distance)
                    .slice(0, 5);
                handleMultipleResults(nearest, true, null, true);
            } else {
                // No GPS, show top 5
                botReply(`📍 Found ${matches.length} ${foundCategory} locations. Showing nearest 5:`);
                handleMultipleResults(matches.slice(0, 5), false, 5, true);
            }
            
            updateContext('category_request', foundCategory);
            return;
        } else {
            botReply(`❌ No ${foundCategory} locations found. Try: Canteens, Restrooms, Hostels, Venues, Departments.`);
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

    // Detect complex queries and offer to simplify
    if (isComplexQuery(text)) {
        showComplexQueryHelp();
        updateContext('complex_query', rawText);
        return;
    }

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
            updateContext('navigate', matches[0].title);
        }
        // CASE 2: 2-5 results - show with distances
        else if (matches.length <= 5 && currentUserPos) {
            handleMultipleResults(matches);
        }
        // CASE 3: 6+ results - ask about distance preference
        else if (matches.length >= 6 && currentUserPos) {
            askDistancePreference(matches);
        }
        // CASE 4: Multiple results but no GPS
        else {
            const firstFive = matches.slice(0, 5);
            handleMultipleResults(firstFive, false);
        }

    } else {
        const suggestions = getSuggestions(text);
        addHTMLMessage(`I couldn't find that. ${suggestions}<br><br>Would you like me to show nearby alternatives? Reply <b>yes</b> or <b>no</b>.`, 'bot');
        updateContext('not_found', rawText, { pendingFollowUp: { type: 'show_alternatives', query: rawText } });
        speak("I couldn't find that location. Would you like alternatives?");
    }
}

// 9. HANDLE MULTIPLE RESULTS (Enhanced to show all or limited)
function handleMultipleResults(locations, showDistance = true, maxResults = null, showOnMap = true) {
    if (!locations || locations.length === 0) return;
    
    // Calculate distances if GPS available
    let locationsWithDistance = locations.map(loc => {
        if (showDistance && currentUserPos && loc.lat && loc.lng) {
            const dist = getDistance(currentUserPos.lat, currentUserPos.lng, loc.lat, loc.lng);
            const walkTime = Math.ceil(dist / (1.4 * 60));
            return { 
                ...loc, 
                distance: dist,
                walkTime: walkTime,
                distanceText: dist < 1000 ? `${Math.round(dist)}m` : `${(dist/1000).toFixed(1)}km`
            };
        }
        return loc;
    });
    
    // Sort by distance if available
    if (showDistance && currentUserPos) {
        locationsWithDistance.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
    }
    
    // Determine how many to display (default: 5, max: based on maxResults parameter)
    const displayLimit = maxResults || Math.min(locationsWithDistance.length, 5);
    const displayLocations = locationsWithDistance.slice(0, displayLimit);
    
    // Store for number selection
    pendingResults = displayLocations;
    awaitingNumberSelection = true;
    
    // Build message
    let msg = `<b>📍 Found ${locations.length} location${locations.length > 1 ? 's' : ''}:</b><br><br>`;
    
    displayLocations.forEach((loc, idx) => {
        const num = idx + 1;
        const title = loc.title || loc.fullName;
        const distInfo = loc.distanceText ? ` - ${loc.distanceText} (${loc.walkTime} min)` : '';
        const dateInfo = loc.date ? `<br>&nbsp;&nbsp;&nbsp;<small>📅 ${loc.date}</small>` : '';
        const landmark = loc.landmark ? `<br>&nbsp;&nbsp;&nbsp;<small>${loc.landmark}</small>` : '';
        msg += `<b>${num}.</b> ${title}${distInfo}${landmark}${dateInfo}<br>`;
    });
    
    if (locations.length > displayLimit) {
        msg += `<br><small>Showing top ${displayLimit} of ${locations.length} results. Say "show all" to see more.</small><br>`;
    }
    
    msg += `<br>👉 <b>Reply with a number (1-${displayLocations.length}) to select</b>`;
    
    addHTMLMessage(msg, 'bot');
    
    // Show markers on map if requested
    if (showOnMap) {
        showMultipleMarkersOnMap(displayLocations);
    }
    
    speak(`I found ${locations.length} option${locations.length > 1 ? 's' : ''}. Reply with a number to select one.`);
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
function navigateToLocation(loc) {
    if (!loc || !loc.lat || !loc.lng) {
        botReply("❌ Invalid location data");
        return;
    }

    // **NEW: Close error dialog when navigating**
    if (typeof closeErrorModal === 'function') {
        closeErrorModal();
    }

    // Hide the old navigation container if it exists
    const oldNavContainer = document.getElementById('chat-nav-container');
    if (oldNavContainer) {
        oldNavContainer.style.display = 'none';
    }

    // Create chatbot message with navigation card
    const distText = loc.distanceText || '--';
    const walkTime = loc.walkTime || '--';
    const landmark = loc.landmark || 'Location selected';
    const eventDate = loc.date ? `📅 ${loc.date}` : '';

    const navHTML = `
        <div class="chat-nav-card">
            <div class="nav-card-header">
                <span class="nav-icon">📍</span>
                <div class="nav-destination">
                    <div class="nav-title">${loc.title || loc.fullName}</div>
                    <div class="nav-landmark">${landmark}</div>
                    ${eventDate ? `<div class="nav-date" style="color: #FF5722; font-size: 0.85em; margin-top: 4px;">${eventDate}</div>` : ''}
                </div>
            </div>
            <div class="nav-stats">
                <div class="nav-stat">
                    <span class="stat-label">Distance</span>
                    <span class="stat-value">${distText}</span>
                </div>
                <div class="nav-stat">
                    <span class="stat-label">Walk Time</span>
                    <span class="stat-value">${walkTime} min</span>
                </div>
            </div>
            <button class="chat-nav-btn" onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}', '_blank')">
                🧭 Start Navigation
            </button>
        </div>
    `;
    
    addHTMLMessage(navHTML, 'bot');
    
    // Fly to location on map
    if (typeof map !== 'undefined' && map) {
        map.flyTo({
            center: [loc.lng, loc.lat],
            zoom: loc.zoom || 18,
            essential: true
        });
        
        // Add marker
        if (typeof addMarker === 'function') {
            addMarker(loc.lat, loc.lng, loc.title || loc.fullName);
        }
    }
    
    // Also update the main UI panel
    if (typeof selectLocation === 'function') {
        selectLocation(loc);
    }
    
    speak(`Navigating to ${loc.title || loc.fullName}`);
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

// 8.a Conversation helper functions (help, emergency, complex query)
function showHelpMessage() {
    const helpMsg = `<b>I can help you:</b><br>• Find locations: "Find food"<br>• Get nearest: "Nearest toilet"<br>• Show category: "Show canteens"<br>• Quick select: Reply with 1, 2, or 3<br><br>Need quick tips? Try: "Where's the library?", "Show hostels", or "Nearest water"`;
    addHTMLMessage(helpMsg, 'bot');
    speak('I can help you find canteens, restrooms, hostels, venues and more. Try saying "Find food" or "Nearest toilet".');
}

function showEmergencyHelp(confirmCall = false) {
    const helplines = {
        tech:{name: "Amar kashi",phone: '+91 988254996'},
        security: { name: 'Campus Security', phone: '+91 988254996' },
        medical: { name: 'Medical/Emergency', phone: '+91 9489243775' }
    };

    const html = `<b>🚨 Emergency Help</b><br>If this is an immediate danger, call your local emergency services first.<br><br>` +
        `<b>Campus Security:</b> ${helplines.security.phone} <button onclick="window.open('tel:${helplines.security.phone.replace(/\D/g,'')}')">Call</button><br>` +
        `<b>Medical:</b> ${helplines.medical.phone} <button onclick="window.open('tel:${helplines.medical.phone.replace(/\D/g,'')}')">Call</button><br><br>` +
        `<b>Tech Support:</b> ${helplines.tech.phone} <button onclick="window.open('tel:${helplines.tech.phone.replace(/\D/g,'')}')">Call</button><br><br>` +
        `Would you like me to call Campus Security for you? Reply <b>yes</b> or <b>no</b>`;

    addHTMLMessage(html, 'bot');
    speak('If this is an emergency, you can call campus security or medical services. Would you like me to call security?');

    // set follow-up so yes/no will trigger call behavior
    updateContext('emergency_offer_call', null, { pendingFollowUp: { type: 'call_security' } });
}

function isComplexQuery(text) {
    // Naive heuristics: long queries with multiple clauses or requests
    if (!text) return false;
    if (text.length > 80) return true;
    if ((text.match(/and|or|but|also|besides/g) || []).length >= 2) return true;
    return false;
}

function showComplexQueryHelp() {
    const html = `<b>🤖 Complex Query Detected</b><br>I can help break this down. Try asking one thing at a time, for example:<br>• "Find nearest canteen"<br>• "Show hostels on east side"<br>• "How far is the library from me?"`;
    addHTMLMessage(html, 'bot');
    speak('That sounds like a complex request. Try asking one thing at a time, or I can help break it down.');
}