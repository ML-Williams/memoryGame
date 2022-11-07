
const gameContainer = document.getElementById("game");
let firstCard = null;
let noClick = false;
let score = 0;
let cardsFlipped = 0;
let bestScore = localStorage.getItem("best-score");

const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "pink",
    "yellow",
    "brown",
    "gray",
    "black",
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "pink",
    "yellow",
    "brown",
    "gray",
    "black"

];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want it research more
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        // create a new div
        const newDiv = document.createElement("div");

        // give it a class attribute for the value we are looping over
        newDiv.classList.add(color);

        // call a function handleCardClick when a div is clicked on
        newDiv.addEventListener("click", handleCardClick);

        // append the div to the element with an id of game
        gameContainer.append(newDiv);
    }
}
// Clicking a card should change the background color to be the color of the class it has.
// Users should only be able to change at most two cards at a time.
// Clicking on two matching cards should be a “match” — those cards should stay face up.
// TODO: Implement this function!
function handleCardClick(event) {
    // you can use event.target to see which element was clicked

    /**
     * ✅when user clicks first card, flip over
     * ✅when user clicks second card, flip over
     * ✅once second card is flipped check for match
     * ✅if it's a match stay flipped over
     * ✅if not a match flip BOTH cards back over
     * ✅allow no clicking while flipping cards
     * flip = background color
     * */
    if (noClick) return;
    if(firstCard){
        noClick = true
    }

    if(firstCard === null) {
        event.target.style.backgroundColor = event.target.className;
        firstCard = event.target
        noClick = false




    } else if ( firstCard.className === event.target.className ) {
        cardsFlipped += 2
        event.target.style.backgroundColor = event.target.className;
        firstCard.removeEventListener("click", handleCardClick)
        event.target.removeEventListener("click",handleCardClick)
        firstCard = null
        noClick = false


    } else {
            event.target.style.backgroundColor = event.target.className
            setTimeout(function () {
                firstCard.style.backgroundColor = null
                event.target.style.backgroundColor = null
                firstCard = null
                noClick = false
            }, 1000)

    }
    if (cardsFlipped === COLORS.length) {
        alert('Game Over!');
    }
}

// when the DOM loads
createDivsForColors(shuffledColors);