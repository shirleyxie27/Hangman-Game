// VARIABLES DECLARED----------------------------------------

var attempts = 10;              // attempts left in game
var victories = 0;              // rounds won
var defeats = 0;                // rounds lost
var word = "";                  // randomly generated word
var hiddenWord = [];            // blank spaces replacing word
var lettersList = [];           // list of all different letters in a word
var guessList = [];             // list of incorrect guesses
var correctGuesses = [];        // list of correct guesses
var oneGuessAway = false;       // condition checked to win

// to differentiate letters from non-letters
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// list of words to randomly generate
var wordsList = [
    "riddikulus",
    "obliviate",
    "sectumsempra",
    "avada kedavra",
    "alohomora",
    "lumos",
    "expelliarmus",
    "wingardium leviosa",
    "accio",
    "expecto patronum"
];


// FUNCTIONS-------------------------------------------------

var resetWord = function() {

    hiddenWord = [];
    attempts = 10;
    guessList = [];
    correctGuesses = [];
    lettersList = [];
    
    word = wordsList[Math.floor(Math.random() * wordsList.length)];
    word = word.toUpperCase(); 
    
    listLetters();

    for (i = 0; i < word.length; i++) {

            console.log(word);      
            hiddenWord.push(word.charAt(i));

            if (alphabet.includes(hiddenWord[i])) { 
                hiddenWord[i] = "_";
            }

            else {
                hiddenWord[i] = "/"
            }

    }
    document.getElementById("spell").innerHTML = hiddenWord.join(" ");
    document.getElementById("attemptsLeft").innerHTML = "Attempts: " + attempts;
    document.getElementById("guessList").innerHTML = guessList;
};


var listLetters = function() {
    for (i = 0; i < word.length; i++) {
        if ((!lettersList.includes(word.charAt(i))) && (word.charAt(i) !== " ")) {
            lettersList.push(word.charAt(i));
            
        }
    }
    console.log(lettersList);
};


var placeLetter = function(input) {

    for (i = 0; i < word.length; i++) {
        if (word.charAt(i) === input) {

            hiddenWord[i] = word.charAt(i);
        }
    }
    document.getElementById("spell").innerHTML = hiddenWord.join(" ");
};


var loseAttempt = function() {
        attempts--;
        document.getElementById("attemptsLeft").innerHTML = "Attempts: " + attempts;
};


var pushToCorrect = function(input) {

    if (!correctGuesses.includes(input)) {
        correctGuesses.push(input);
        console.log(correctGuesses);
    }

};

var statusCheck = function() {
        

        if (lettersList.length - correctGuesses.length < 1) {
            oneGuessAway = true;
        }
        else {
            oneGuessAway = false;
        }
};



var updateGuessList = function(input) {
        if (guessList.includes(input)) {
            console.log(guessList); //chk
            document.getElementById("guessList").innerHTML = guessList.join(" ");

        }

        else {
            console.log(guessList); //chk
            guessList.push(input);
            loseAttempt();


            document.getElementById("guessList").innerHTML = guessList.join(" ");
        }

    };

var winRound = function() {
        victories++;
        document.getElementById("victories").innerHTML = "Victories: " + victories;
        resetWord();
};


var loseRound = function() {
        defeats++;
        document.getElementById("defeats").innerHTML = "Defeats: " + defeats;
        resetWord();
};



resetWord();

document.onkeyup = function(event) {

    var guess = event.key.toUpperCase();
    
    if (alphabet.includes(guess)) {

        if (word.includes(guess)) {

            pushToCorrect(guess);
            statusCheck();

            if (oneGuessAway == true) {

                winRound();
            }
            else {
                if (attempts > 0) {
                    
                    placeLetter(guess);
                }
                else {
                    resetWord();
                }
            }
        }

        else {
            if (attempts > 1) {
                placeLetter(guess);
                updateGuessList(guess);
            }
            else {
                loseRound();
            }
        }
    }

}