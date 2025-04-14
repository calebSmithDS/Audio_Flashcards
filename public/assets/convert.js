// attempting to have webspeech active the entire time 
let synth = window.speechSynthesis;


let cursor = null;
let transaction;
let db;
let currentKey = 0;

// once page is fully loaded this will call the initialzeApp
document.addEventListener("DOMContentLoaded", function() {
    console.log("Dom is loaded")
    // intialize db
    intializeApp();
})

// this will establish a connection to the indexedDB 
function intializeDB() {
    
    // opens connection to FlashcardDB
    const request = indexedDB.open("FlashcardDB", 1);

    // if connection fails trigger error
    request.onerror = function(event) {
        console.error("An error occured with IndexedDB");
        console.error(event);
    }

    // if database needs to be upgraded to new version
    request.onupgradeneeded = function(event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains("flashcards")) {
            const store = db.createObjectStore("flashcards", {autoIncrement: true});
        }
    }

    // open database
    request.onsuccess = function(event) {
        db = event.target.result;
        console.log("Database opened successfully");
          
}
}

// processing text, then converting it to csv, then saving to the db
processedData = [];

// take text input
function processText() {
    const textInput = document.getElementById('textInput').value;

    let text = textInput;

    convertTexttoCSV(text);
}

// 
function convertTexttoCSV(text) {
    const lines = text.split('\n');
    processedData = lines.map(line => line.split(',')); // comeback to this line
    console.log("Data successfully processed")
    console.log(processedData);

    // save flashcards to indexedDB
    saveToIndexedDB(processedData)
}

function saveToIndexedDB(data) {
        const transaction = db.transaction(["flashcards"], "readwrite");
        const store = transaction.objectStore("flashcards");
        
        data.forEach(item => {
            store.add(item);
        });

        transaction.oncomplete = function() {
            alert("Data saved to indexedDB")
        }

        transaction.onerror = function() {
            alert("Error saving data to indexedDB")
        }
    }

// deleting the data so you can put in new flashcards, this is a temporary solution
function deleteText() {
    const dbName = "FlashcardDB";
    const request = indexedDB.deleteDatabase(dbName);

    request.onsuccess = function() {
        console.log(`Database ${dbName} cleared successfully`);
    }

    request.onerror = function() {
        console.log(`Database ${dbName} error`);
    }

    request.onblocked = function() {
        console.log(`Database ${dbName} deletion blocked`);
    }
}

// create a cursor 
function cursorOpen() {
    const transaction = db.transaction(["flashcards"], "readonly");
    const store = transaction.objectStore("flashcards");
    const cursorRequest = store.openCursor(IDBKeyRange.lowerBound(currentKey));

    cursorRequest.onsuccess = function(event) {
        cursor = event.target.result;
        if (cursor) {
            // Access the current record

            let utterThis = new SpeechSynthesisUtterance("say this out loud");
            synth.speak(utterThis);


            console.log(cursor.value);
            currentKey = cursor.key + 1
        } else {
            console.log("no more cards");
        }
    }
    cursorRequest.onerror = function(event) {
        console.error("Error accessing cursor:", event.target.error);
    }
}

// transaction to move forward
function next() {
    cursorOpen();
}

// probably need to close transaction and not leave open

// this calls all the functions that should be insitlaized on start up
function intializeApp() {
    intializeDB();
}

document.getElementById("next-btn").addEventListener("click", function() {
    next();
})