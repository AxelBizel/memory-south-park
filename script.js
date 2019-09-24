// MARGIN is the value of margins between tiles in px
const MARGIN = 8;
let tileId = 1;

const container = document.getElementById("container");
const board = document.getElementById("board");
const newGameForm = document.getElementById("newGame");

newGameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const rows = parseInt(document.getElementById("rows").value);
    const columns = parseInt(document.getElementById("columns").value);
    if (rows * columns % 2 === 0) {
        board.innerHTML = "";
        newGame(rows, columns);
    } else alert('Merci de saisir au mois un nombre pair')
})

newGame(4, 5);

let revealedCards = [];
let isCardRevealed = false;


function newGame(rows, columns) {
    // Generate a array with random values between 1 and the total number of tiles / 2 (two occurences for each number)
    const randomArray = [];
    for (i = 0; i < rows * columns; i++) {
        randomArray.push("");
    }
    for (j = 0; j < 2; j++) {
        for (i = 1; i < (rows * columns) / 2 + 1; i++) {
            let randomNumber = Math.floor(Math.random() * 20);
            while (randomArray[randomNumber] != "") {
                randomNumber = Math.floor(Math.random() * 20);
            }
            randomArray[randomNumber] = i;
        }
    }
    let index = 0;
    for (let i = 0; i < rows; i++) {
        const rowElt = document.createElement("div");
        rowElt.classList.add("custom-row");
        for (let j = 0; j < columns; j++) {
            const outerTileElt = document.createElement("div");
            const tileElt = document.createElement("div");
            tileElt.id = "tile" + tileId;
            tileElt.classList.add("tile");
            tileElt.card = randomArray[index]
            outerTileElt.style.margin = MARGIN + "px";
            tileElt.style.height = "0";
            outerTileElt.style.width = `calc(100% / ${columns})`;
            outerTileElt.style.maxWidth = "200px";
            const bgUrl = `url(${tileElt.card}.png)`;
            tileElt.addEventListener("click", (e) => {
                cardReveal(e.target, bgUrl);
                cardCheck(e.target);
            });
            outerTileElt.appendChild(tileElt);
            rowElt.appendChild(outerTileElt);
            tileId++;
            index++;
        }
        board.appendChild(rowElt);
    }
}

function cardReveal(tile, bgUrl) {
    tile.style.backgroundImage = bgUrl;
    tile.style.backgroundColor = "transparent";
}

function hideCard(tile) {
    tile.style.backgroundImage = "none";
    tile.style.backgroundColor = "grey";
}

function cardCheck(tile) {
    if (!isCardRevealed || revealedCards.length === 0){
        revealedCards.push(tile);
        isCardRevealed = !isCardRevealed;
        console.log(isCardRevealed);
    }
    else {
        prevTile = revealedCards[revealedCards.length - 1]
        if (!(tile.card === prevTile.card)) {
            revealedCards.pop();
            setTimeout(() => hideCard(tile), 1000);
            setTimeout(() => hideCard(prevTile), 1000);
            isCardRevealed = !isCardRevealed;
            console.log(isCardRevealed);
        } else isCardRevealed = !isCardRevealed;
    }
}
