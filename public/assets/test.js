let cursor;  // Store cursor globally
let db;      // Store DB globally
let transaction;

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM is loaded");
    initializeApp();
});

function initializeDB() {
    const request = indexedDB.open("FlashcardDB", 1);

    request.onerror = function(event) {
        console.error("An error occurred with IndexedDB", event);
    };

    request.onupgradeneeded = function(event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains("flashcards")) {
            db.createObjectStore("flashcards", { autoIncrement: true });
        }
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        console.log("Database opened successfully");
        startTransaction();
    };
}

// Start the transaction and open the cursor
function startTransaction() {
    transaction = db.transaction(["flashcards"], "readonly");
    const store = transaction.objectStore("flashcards");

    // Create a cursor and loop through all cards
    const cursorRequest = store.openCursor();

    cursorRequest.onsuccess = function(event) {
        cursor = event.target.result;  // Update cursor for future use
        if (cursor) {
            console.log("Current card:", cursor.value);
        } else {
            console.log("No more cards.");
        }
    };

    cursorRequest.onerror = function(event) {
        console.error("Error accessing cursor:", event.target.error);
    };
}

// Function to move to the next card when the Next button is clicked
function next() {
    if (cursor) {
        // Move to the next record, keeping the transaction open
        cursor.continue();

        // Only process the next card when the cursor successfully continues
        cursor.onsuccess = function(event) {
            if (cursor) {
                console.log("Next card:", cursor.value);
            } else {
                console.log("No more cards.");
            }
        };
    } else {
        console.log("Cursor is not initialized yet.");
    }
}

// Initialize the app and database
function initializeApp() {
    initializeDB();
}

// Add an event listener for the Next button to move to the next card
// document.getElementById("nextButton").addEventListener("click", nextCard);
