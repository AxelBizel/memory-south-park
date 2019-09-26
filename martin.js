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
                cardReveal(e.target, bgUrl);
                matchedPair = cardCheck(e.target);
                if 
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
    if (!revealedCard) revealedCard = tile.card;
    else if (tile.card === revealedCard) return true;
    else return false;
}