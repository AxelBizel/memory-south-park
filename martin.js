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
function newGame(rows, columns, hasMisteryCard = true) {
    document.getElementById("player1Name").innerText = userName;
    win = false;
    let nbCards;
    (hasMisteryCard) ? nbCards = rows * columns - 1 : nbCards = rows * columns;
    logo.style.position = "absolute";
    logo.style.width = "20%";
    logo.style.left = "16px";
    const board = document.createElement("div");
    revealedCards = [];
    revealedCards.status = "";
    // Generate a array with random values between 1 and the total number of tiles / 2 (two occurences for each number)
    const randomArray = new Array(rows * columns);
    randomArray.fill("");
    for (j = 0; j < 2; j++) {
        for (i = 1; i < Math.floor(rows * columns / 2) + 1; i++) {
            let randomNumber = Math.floor(Math.random() * rows * columns);
            while (randomArray[randomNumber] != "") {
                randomNumber = Math.floor(Math.random() * rows * columns);
            }
            randomArray[randomNumber] = i;
        }
    }
    if (hasMisteryCard) {
        for (i = 0; i < randomArray.length; i++) {
            if (randomArray[i] === "") {
                randomArray[i] = 'mystery';
                break;
            }
        }
    }
    console.log(randomArray)
    let index = 0;
    let imgDir;
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
            outerTileElt.style.width = `calc(100% / ${columns})`;
            outerTileElt.style.maxWidth = "200px";
            if (tileElt.card === "mystery") {
                imgDir = "mystery";
                tileElt.style.backgroundSize = "120%";
            }    
            else imgDir = "characters";
            const bgUrl = `url(images/${imgDir}/${tileElt.card}.png)`;
            tileElt.addEventListener("click", (e) => {
                revealCard(e.target, bgUrl);
                cardCheck(e.target);
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


// Vérifie si il y a déjà une carte retournée ; si c'est le cas, compare les deux cartes et change le status de revealedCards en fonction
function cardCheck(tile) {
    revealedCards.push(tile);
    if (revealedCards.length === 2) {
        if (revealedCards[0].card === revealedCards[1].card) {
            revealedCards.status = "win";
        } else if (revealedCards[1].card === "mystery") revealedCards.status = "mystery";
        else revealedCards.status = "lose"
    } else if (revealedCards[0].card === "mystery") revealedCards.status = "mystery";
}

function revealCard(tile, bgUrl) {
    tile.style.backgroundImage = bgUrl;
    tile.style.backgroundColor = "rgba(200, 200, 200, 0.6";
}

function hideCard(tile) {
    tile.style.backgroundImage = "none";
    tile.style.backgroundColor = "red";
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