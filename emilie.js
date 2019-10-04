const openingForm = document.getElementById("openingForm")
const firstBtn = document.getElementById("button1")
const submitNameAvatar = document.getElementById("submitNameAvatar")
const playerSelector = document.getElementById("playerSelector")
const diffSelector = document.getElementById("diffSelector")
const playerTwo = document.getElementById("playerTwo")
const pseudoAvatarSelector1Player = document.getElementById("divPseudoAvatarSelector1Player")
const pseudoAvatarSelector2Players = document.getElementById("divPseudoAvatarSelector2Players")

firstBtn.addEventListener('click', (event) => {
    openingForm.style.display = 'none';})

playerSelector.addEventListener('change', (event) => {
    if (playerSelector.value === "twoPlayers") {
        pseudoAvatarSelector2Players.style.display = 'block'
 }
    else {
        pseudoAvatarSelector1Player = 'block'
    }
})



