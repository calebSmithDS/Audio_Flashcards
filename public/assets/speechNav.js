
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










// I am going to do it without speechrecognition first

// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
// const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

// if (!SpeechRecognition) {
//     alert("Speech Recognition is not supported in your browser.");
//     throw new Error("Speech Recognition not supported");
// }

// let recognition;
// let cursor = null;
// let transaction = null;


// function startListening() {

    
//         const terms = ["next", "back"];
//         const grammar = `#JSGF V1.0; grammar colors; public <color> = ${terms.join(" | ")};`;
        
//         // plugging grammer into speech recognition
//         recognition = new SpeechRecognition();
//         const SpeechRecognitionList = new SpeechGrammarList();
//         SpeechRecognitionList.addFromString(grammar, 1);
        
//         recognition.grammar = SpeechRecognitionList;
//         recognition.continuous = true;
//         recognition.lang = "en-US";
//         recognition.interimResults = false;
//         recognition.maxAlternatives = 1;

//         recognition.onstart = function(event) {
//             console.log("Speech Regoniction started");
//         }
        
     




// recognition.onresult = (event) => {
//     const nav = event.results[0][0].transcript.toLowerCase();
//     console.log("Recognized command:", nav);

//     if (nav === "next" && cursor) {
//         cursor.continue();
//         console.log("Next card:", cursor.value)
//     } else if (nav === "back" && cursor) {
//         console.log("Back command received.")

//     }
// }

// recognition.onerror = function(event) {
//     console.error("Speech recognition error:", event.error);
// }

// recognition.start();

// navigate();

// }

// function navigate() {
//     let db;

//     const request = indexedDB.open("FlashcardDB", 2);

//     request.onupgradeneeded = function(event) {
//         db = event.target.results;
//         if (!db.objectStoreNames.contains("flashcards")) {
//             db.createObjectStore("flashcards", { autoIncrement: true });
//             console.log("Object store 'flashcards' created.");
//         }
//     };

//     request.onsuccess = function(event) {
//         db = event.target.results;
//         console.log("database opened");

//         const transaction = db.transaction(["flashcards"], "readonly");

//         // access the object store
//         const store = transaction.objectStore("flashcards");

//         // create a cursor to loop through the data 
//         const cursorRequest = store.openCursor();
//         cursorRequest.onsuccess = function(event) {
//             cursor = event.request.result;
//             if (cursor) {
//                 console.log("Current card:", cursor.value);
//             } else {
//                 console.log("No more cards.");
//             }
//         }

//         cursorRequest.onerror = function(event) {
//             console.error("Error accessing cursor:", event.target.error);
//         }

//     }

//     request.onerror = function(event) {
//         console.error("Error opeing database:", event.target.error);
//     }
// }

