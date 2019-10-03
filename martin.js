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
    logo.style.position = "absolute";
    logo.style.width = "20%";
    logo.style.left = "50px";
    revealedCards = [];
    revealedCards.status = "";
    shuffledCards = shuffle(nbCards, nbMysteryCards);
    updateView();
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

function gameOver() {
    if (win) {
        gameOverElt.innerText = `Bravo, tu as gagné en ${120 - cpt  - 1} secondes !`;
        clearTimeout(x);
    }
    else {
        gameOverElt.innerText = `Tu as perdu et n'a trouvé que ${nbPoints} paires. C'est nul !`
    }
    document.getElementById("gameOverDiv").style.display = "block";
}

function shuffle(nbCards, nbMysteryCards) {
    let index = 1;
    const shuffledCards = new Array(nbCards + nbMysteryCards);
    shuffledCards.fill("");
    for (j = 0; j < 2; j++) {
        for (i = 1; i < Math.floor(nbCards / 2) + 1; i++) {
            let randomNumber = Math.floor(Math.random() * (nbCards + nbMysteryCards));
            while (shuffledCards[randomNumber] != "") {
                randomNumber = Math.floor(Math.random() * (nbCards + nbMysteryCards));
            }
            shuffledCards[randomNumber] = new Card(index, i);
            index++;
        }
    }
    console.log(shuffledCards)
    if (nbMysteryCards) {
        for (let i = 0; i < shuffledCards.length; i++) {
            if (!shuffledCards[i]) {
                shuffledCards[i] = new Card(index, "mystery");
                index++;
            }
        }
    }
    return shuffledCards;
}

function handleCardClick(card) {
    if (card.isRevealed) return;
    revealCard(card);
    updateView();
    cardCheck(card);
    console.log(card.isRevealed)
    if (revealedCards.status === "win") {
        addPoint();
        characters.find(character => character.id === card.characterId).playSound();
        if (nbPoints === nbCards / 2) {
            win = true;
            gameOver();
        }
        document.getElementById(revealedCards[0].id).style.pointerEvents = "none";
        document.getElementById(revealedCards[1].id).style.pointerEvents = "none";
        revealedCards = [];
        revealedCards.status = "";
        updateView();
    }
    else if (revealedCards.status === "lose") {
        document.body.style.pointerEvents = "none";
        hideCard(revealedCards[0]);
        hideCard(revealedCards[1]);
        revealedCards = [];
        revealedCards.status = "";
        document.body.style.pointerEvents = "auto";
        setTimeout(updateView, 1000);
    } else if (revealedCards.status === "mystery") {
        mysteryCardMessage.style.display = "block";
        if (revealedCards.length === 2) hideCard(revealedCards[0]);
        revealedCards = [];
        revealedCards.status = "";
    } else updateView();
}

function updateView() {
    board.innerHTML = "";
    let index = 0;
    for (let i = 0; i < rows; i++) {
        HTMLContent = '<div class="custom-row">'
        for (let j = 0; j < columns; j++) {
            const card = shuffledCards[index];
            HTMLContent +=
                `<div style="margin: ${MARGIN}px; width: calc(100% / ${columns}); max-width: 200px;">` +
                    `<div id ="${card.id}" card=${card} class="card" style="${card.isRevealed ? `background-image: url(${card.bgUrl}); background-color: rgba(200, 200, 200, 0.6);` : "background-color: red;"}" onclick="handleCardClick(shuffledCards[${index}])"></div>` +
                `</div>`;
            index++;
        }
        HTMLContent += '</div>'
        board.innerHTML += HTMLContent;
    }
}

class Card {
    constructor(id, characterId) {
        this.id = id;
        this.characterId = characterId;
        this.isRevealed = false;
        this.bgUrl = characters.find(character => character.id === characterId).imageUrl;
    }
}

newGame(5,5,1);