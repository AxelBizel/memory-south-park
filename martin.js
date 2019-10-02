// MARGIN is the value of margins between tiles in px
const MARGIN = 8;
let tileId = 1;
let nbPoints = 0;
let win = false;
const mysteryCardMessage = document.getElementById("mysteryCard");
const logo = document.getElementById("logo");
const gameOverElt = document.getElementById("gameOver")

mysteryCardMessage.addEventListener("click", (e) => {
    e.target.style.display = "none";
});

// This function generates and return a new board div element with the numbers of rows and columns as arguments
function newGame(nbRows, nbColumns, nbMysteryCards) {
    rows = nbRows;
    columns = nbColumns;
    // document.getElementById("player1Name").innerText = userName;
    win = false;
    const nbCards = rows * columns - nbMysteryCards;
    logo.style.position = "absolute";
    logo.style.width = "20%";
    logo.style.left = "50px";
    const board = document.getElementById("board");
    revealedCards = [];
    revealedCards.status = "";
    shuffledCards = shuffle(nbCards, nbMysteryCards);
    updateView();
}


// Vérifie si il y a déjà une carte retournée ; si c'est le cas, compare les deux cartes et change le status de revealedCards en fonction
function cardCheck(card) {
    revealedCards.push(card);
    if (revealedCards.length === 2) {
        if (revealedCards[1] === "mystery") revealedCards.status = "mystery";
        else if (revealedCards[1].name === revealedCards[0].name) {
            revealedCards.status = "win";
        } else revealedCards.status = "lose";
    } else if (revealedCards[0] === "mystery") revealedCards.status = "mystery";
}

function revealCard(card) {
    card.isRevealed = true;
}

function hideCard(card) {
    card.isRevealed = false;
}

function addPoint() {
    const counter = document.getElementById('counter');
    nbPoints++
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
    const randomArray = new Array(rows * columns);
    randomArray.fill("");
    for (j = 0; j < 2; j++) {
        for (i = 1; i < Math.floor(rows * columns / 2) + 1; i++) {
            let randomNumber = Math.floor(Math.random() * nbCards);
            while (randomArray[randomNumber] != "") {
                randomNumber = Math.floor(Math.random() * nbCards);
            }
            randomArray[randomNumber] = i;
        }
    }
    const shuffledCards = randomArray.map(value => {
        return characters.filter(character => character === value);
    })
    if (nbMysteryCards) {
        for (let i = 0; i < shuffledCards.length; i++) {
            if (shuffledCards[i] === "") {
                shuffledCards[i] = "mystery";
                shuffledCards[i].isRevealed = false;
                shuffledCards[i].class = "mystery";
            }
        }
    }

    return shuffledCards;
}

function handleCardClick(card) {
    revealCard(card);
    cardCheck(card);
    if (revealedCards.status === "win") {
        addPoint();
        if (nbPoints === nbCards / 2) {
            win = true;
            gameOver();
        }
        revealedCards[0].style.pointerEvents = "none";
        revealedCards[1].style.pointerEvents = "none";
        revealedCards = [];
        revealedCards.status = "";
    }
    else if (revealedCards.status === "lose") {
        document.body.style.pointerEvents = "none";
        setTimeout(() => {
            hideCard(revealedCards[0]);
            hideCard(revealedCards[1]);
            revealedCards = [];
            revealedCards.status = "";
            document.body.style.pointerEvents = "auto";
        }, 1000);
    } else if (revealedCards.status === "mystery") {
        mysteryCardMessage.style.display = "block";
        if (revealedCards.length === 2) hideCard(revealedCards[0]);
        revealedCards = [];
        revealedCards.status = "";
    }
    board.innerHTML = "";
    updateView();
}

function updateView() {
    let index = 0;
    for (let i = 0; i < rows; i++) {
        HTMLContent = '<div class="custom-row">'
        for (let j = 0; j < columns; j++) {
            const card = shuffledCards[index];
            HTMLContent +=
                `<div style="margin: ${MARGIN}px; width: calc(100% / ${columns}); max-width: 200px;">` +
                    `<div id="${card.id}" class="card" style="${card.isRevealed ? `background-image: url(${card.imageUrl}); background-color: rgba(200, 200, 200, 0.6);` : "background-color: red;"}"></div>` +
                `</div>`;
            index++;
        }
        HTMLContent += '</div>'
        board.innerHTML += HTMLContent;
        for (let k = 0; k < rows * columns; k++) {
            
        }
    }
}

newGame(5,5,1);