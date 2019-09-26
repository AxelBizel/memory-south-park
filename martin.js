// MARGIN is the value of margins between tiles in px
const MARGIN = 8;
let tileId = 1;
const board = newGame(5, 5);
document.getElementById("board").appendChild(board);

// This function generates and return a new board div element with the numbers of rows and columns as arguments
function newGame(rows, columns, hasMisteryCard = true) {
    const board = document.createElement("div");
    revealedCard = undefined;
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
                randomArray[i] = 'Mystery';
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
            if (tileElt.card === "Mystery") imgDir = "mystery";
            else imgDir = "characters";
            const bgUrl = `url(images/${imgDir}/${tileElt.card}.png)`;
            tileElt.addEventListener("click", (e) => {
                revealCard(e.target, bgUrl);
                console.log(cardCheck(e.target))
                if (cardCheck(e.target) && !(typeof cardCheck(e.target) === "object")) console.log('addPoint()');
                else if (!cardCheck(e.target)) {
                    console.log('ok')
                    hideCard(e.target);
                    hideCard(cardCheck(e.target));
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


// Vérifie si il y a déjà une carte retournée ; si c'est le cas, compare les deux cartes et renvoie true si identiques et false sinon
function cardCheck(tile) {
    if (!revealedCard) revealedCard = tile;
    else if (tile.card === revealedCard) revealedCard = true;
    else revealedCard = false;
    return revealedCard;
}

function revealCard(tile, bgUrl) {
    tile.style.backgroundImage = bgUrl;
    tile.style.backgroundColor = "transparent";
}

function hideCard(tile) {
    tile.style.backgroundImage = "none";
    tile.style.backgroundColor = "grey";
}