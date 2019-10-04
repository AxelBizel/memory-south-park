const openingForm = document.getElementById("openingForm")
const firstBtn = document.getElementById("button1")
const submitNameAvatar = document.getElementById("submitNameAvatar")
const playerSelector = document.getElementById("playerSelector")
const diffSelector = document.getElementById("diffSelector")
const playerTwo = document.getElementById("playerTwo")
const pseudoAvatarSelector1Player = document.getElementById("wrapPseudoSelector1")
const pseudoAvatarSelector2Players = document.getElementById("wrapPseudoSelector2")
let difficulty;

firstBtn.addEventListener('click', (event) => {
    openingForm.style.display = 'none';
    difficulty = diffSelector.value;
    if (playerSelector.value === "twoPlayers") {
        nbPlayers = 2;
        pseudoAvatarSelector2Players.style.display = 'block';
     }
    else {
        nbPlayers = 1;
        pseudoAvatarSelector1Player.style.display = 'block';
    }
    console.log(difficulty);
    console.log(nbPlayers);

});