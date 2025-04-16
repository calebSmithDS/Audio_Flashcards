
let currentIndex = 0;
let cursor;
let transaction;
let db;

// intialize db and get cursor
function cursorSetup() {
    // let db;
    
    const request = indexedDB.open("FlashcardDB", 2);

    request.onerror = function(event) {
        console.error("An error occured with IndexedDB");
        console.error(event);
    }

    request.onupgradeneeded = function(event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains("flashcards")) {
            const store = db.createObjectStore("flashcards", {autoIncrement: true});
            // store.createIndex("id", "id", {unique: true});
        }
    }

    request.onsuccess = function(event) {
        db = event.target.result;
        console.log("Database opened successfully");
        
        startTransaction();    
}

function startTransaction() {
    const transaction = db.transaction(["flashcards"], "readonly");
    const store = transaction.objectStore("flashcards");
    const cursorRequest = store.openCursor();

    cursorRequest.onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {
            // Access the current record
            console.log(cursor.value);

            // Move to the next record
            // cursor.continue();
        } else {
            // console.log("no more cards");
        }
        // console.log(cursor.value);
    }


}
};

function next() {
    if (!cursor) {
        console.log("Cursor is not yet initialized.");
        return;
      }

    if (cursor) {
        cursor.continue(); 
        console.log("Next card:", cursor.value);
    } else {
        console.log("No more cards");
    }
}

function back() {

}

cursorSetup();
