// MARGIN is the value of margins between tiles in px
const MARGIN = 16;
let tileId = 1;

const container = document.getElementById("container");
const board = document.getElementById("board");
const newGameForm = document.getElementById("newGame");

newGameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    board.innerHTML = "";
    const rows = parseInt(document.getElementById("rows").value);
    const columns = parseInt(document.getElementById("columns").value);
    newGame(rows, columns);
})

function newGame(rows, columns) {
    for (let i = 0; i < rows; i++) {
        const rowElt = document.createElement("div");
        rowElt.classList.add("custom-row");
        for (let j = 0; j < columns; j++) {
            const tileElt = document.createElement("div");
            tileElt.id = "tile" + tileId;
            tileElt.classList.add("tile");
            tileElt.style.margin = MARGIN + "px";
            tileElt.style.width = `calc(100% / ${columns})`;
            tileElt.style.paddingTop = `calc((100% - ${MARGIN * columns * 2}px)/ ${columns})`;
            rowElt.appendChild(tileElt);
            tileId++;
        }
        board.appendChild(rowElt);
    }
}