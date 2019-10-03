// MARGIN is the value of margins between tiles in px
const MARGIN = 8;
let tileId = 1;
let nbPoints = 0;
let win = false;
const mysteryCardMessage = document.getElementById("mysteryCard");
const logo = document.getElementById("logo");
const gameOverElt = document.getElementById("gameOver");
const board = document.getElementById("board");

mysteryCardMessage.addEventListener("click", (e) => {
    e.target.style.display = "none";
});

function newGame(nbRows, nbColumns, nbMysteryCards) {
    rows = nbRows;
    columns = nbColumns;
    // document.getElementById("player1Name").innerText = userName;
    win = false;
    nbCards = rows * columns - nbMysteryCards;
    let index = 1;
    const cards = []
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < nbCards / 2; j++) {
            cards.push(new Card(index, j + 1));
            index++;
        }
    }
    if (nbMysteryCards) {
        for (let i = 0; i < nbMysteryCards; i++) cards.push(new Card(index, "mystery"));
        index++;
    }
    logo.style.position = "absolute";
    logo.style.width = "20%";
    logo.style.left = "50px";
    revealedCards = [];
    revealedCards.status = "";
    shuffledCards = shuffle(cards);
    updateView();
    decompte();
}


// Vérifie si il y a déjà une carte retournée ; si c'est le cas, compare les deux cartes et change le status de revealedCards en fonction
function cardCheck(card) {
    revealedCards.push(card);
    if (revealedCards.length === 2) {
        if (revealedCards[1].characterId === "mystery") revealedCards.status = "mystery";
        else if (revealedCards[1].characterId === revealedCards[0].characterId) {
            revealedCards.status = "win";
        } else revealedCards.status = "lose";
    } else if (revealedCards[0].characterId === "mystery") revealedCards.status = "mystery";
}

function revealCard(card) {
    card.isRevealed = true;
}

function hideCard(card) {
    card.isRevealed = false;
}

function addPoint() {
    const counter = document.getElementById('counter');
    nbPoints++;
    counter.innerText = nbPoints;    
}
