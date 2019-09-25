// MARGIN is the value of margins between tiles in px
const MARGIN = 8;
let tileId = 1;

const container = document.getElementById("container");
const newGameForm = document.getElementById("newGame");
const player1Title = document.getElementById("player1")
const player2Title = document.getElementById("player2")
initialize(2, 3);

function initialize(rows, columns) {
    board1 = document.getElementById("board1").appendChild(newGame(rows, columns));
    board2 = document.getElementById("board2").appendChild(newGame(rows, columns));
    currentPlayer = 1;
    board2.style.display = "none";
    player2Title.style.backgroundColor = "transparent";
    player1Title.style.backgroundColor = "grey";
    player2Title.style.color = "black";
    player1Title.style.color = "white";
    revealedCards = [[],[]];
    isCardRevealed = [false, false];
    counter = [0, 0];
    document.getElementById("counter1").textContent = "";
    document.getElementById("counter2").textContent = "";
}

newGameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const rows = parseInt(document.getElementById("rows").value);
    const columns = parseInt(document.getElementById("columns").value);
    if (rows * columns % 2 === 0) {
        board1.innerHTML = "";
        board2.innerHTML = "";
        initialize(rows, columns);
        
    } else alert('Merci de saisir au moins un nombre pair.')
})



function newGame(rows, columns) {
    const board = document.createElement("div");
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
            const bgUrl = `url(images/${tileElt.card}.png)`;
            tileElt.addEventListener("click", (e) => {
                cardReveal(e.target, bgUrl);
                cardCheck(e.target, rows, columns, currentPlayer);
            });
            outerTileElt.appendChild(tileElt);
            rowElt.appendChild(outerTileElt);
            tileId++;
            index++;
        }
        board.appendChild(rowElt);
    }
    return board;
}

function cardReveal(tile, bgUrl) {
    tile.style.backgroundImage = bgUrl;
    tile.style.backgroundColor = "transparent";
}

function hideCard(tile) {
    tile.style.backgroundImage = "none";
    tile.style.backgroundColor = "grey";
}

// Check with revealed card is the first one or the second, and if it is the same than the first one
function cardCheck(tile, rows, columns, currentPlayer) {
    if (!isCardRevealed[currentPlayer - 1] || revealedCards[currentPlayer - 1].length === 0) {
        revealedCards[currentPlayer - 1].push(tile);
        isCardRevealed[currentPlayer - 1] = !isCardRevealed[currentPlayer - 1];
    }
    else {
        counterElt = document.getElementById("counter" + currentPlayer)
        prevTile = revealedCards[currentPlayer - 1][revealedCards[currentPlayer - 1].length - 1];
        if (!(tile.card === prevTile.card)) {
            revealedCards[currentPlayer - 1].pop();
            setTimeout(() => hideCard(tile), 1000);
            setTimeout(() => hideCard(prevTile), 1000);
            isCardRevealed[currentPlayer - 1] = !isCardRevealed[currentPlayer - 1];
            counter[currentPlayer - 1]++;
            counterElt.textContent = counter[currentPlayer - 1];
        } else {
            isCardRevealed[currentPlayer - 1] = !isCardRevealed[currentPlayer - 1];
            counter[currentPlayer - 1]++;
            counterElt.textContent = counter[currentPlayer - 1];
            if (revealedCards[currentPlayer - 1].length === rows * columns / 2) {
                setTimeout(() => alert(`Tu as fini le jeu en ${counter[currentPlayer - 1]} coups !`), 200);
            }
        }
        document.body.style.pointerEvents ="none";
        setTimeout(() => playerToggle(), 1000);
        setTimeout(() => document.body.style.pointerEvents = "auto", 1000);
    }
}

// Change current player when tour is over
function playerToggle() {
    if (currentPlayer === 1) {
        currentPlayer = 2;
        board1.style.display = "none";
        board2.style.display = "block";
        player1Title.style.backgroundColor = "transparent";
        player2Title.style.backgroundColor = "grey";
        player1Title.style.color = "black";
        player2Title.style.color = "white";
    } else {
        currentPlayer = 1;
        board2.style.display = "none";
        board1.style.display = "block";   
        player2Title.style.backgroundColor = "transparent";
        player1Title.style.backgroundColor = "grey";
        player2Title.style.color = "black";
        player1Title.style.color = "white";     
    }
}