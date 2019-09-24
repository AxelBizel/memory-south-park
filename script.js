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
            outerTileElt.style.margin = MARGIN + "px";
            tileElt.style.height = "0";
            tileElt.style.backgroundImage = `url(${randomArray[index]}.png)`;
            outerTileElt.style.width = `calc(100% / ${columns})`;
            outerTileElt.style.maxWidth = "200px";
            //tileElt.style.paddingTop = `calc((100% - ${MARGIN * columns * 2}px)/ ${columns})`;
            outerTileElt.appendChild(tileElt);
            rowElt.appendChild(outerTileElt);
            tileId++;
            index++;
        }
        board.appendChild(rowElt);
    }
}