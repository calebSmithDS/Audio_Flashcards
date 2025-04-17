
function process_text() {
    const text = document.getElementById("textInput").value;
    let cards = text;

    text_to_JSON(text);
}

function text_to_JSON(text) {
    const lines = text.split('\n');

    // // const fs = require('fs');
    // const file = document.getElementById("cards").files[0];
    // // var data = fs.readFileSync(file);
    // let test = file;
    // let db = JSON.parse(test);

    // check if array 
    // if (!db || !Array.isArray(db)) {
    //     if (!db) {
    //         db = [];
    //     } else {
    //         db = [db];
    //     }
    // }

    db = [];
    

    for (let i = 0; i < lines.length(); i++) {
        
        let line = lines[i].split(', ');
        let term = line[0];
        let defintion = line[1];

        let card = {
            "term": term,
            "defintion": defintion
        };

        db.push(card);

    }

    JSON_file = JSON.stringify(db)
}