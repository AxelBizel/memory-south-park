const openingForm = document.getElementById("openingForm")
const firstBtn = document.getElementById("button1")
const secondBtn = document.getElementById("submitNameAvatar")
const thirdBtn = document.getElementById("submitNameAvatar2")
const playerSelector = document.getElementById("playerSelector")
const diffSelector = document.getElementById("diffSelector")
const playerTwo = document.getElementById("playerTwo")
const pseudoAvatarSelector = document.getElementById("divPseudoAvatarSelector")
const pseudoAvatarSelector2 = document.getElementById("divPseudoAvatarSelector2")

firstBtn.addEventListener('click', (event) => {
    openingForm.style.display = 'none';
    pseudoAvatarSelector.style.display = 'block'; 
})

secondBtn.addEventListener('click', (event) => {
    pseudoAvatarSelector.style.display = 'none';
})

thirdBtn.addEventListener('click', (event) => {
    pseudoAvatarSelector2.style.display = 'none';
})

playerSelector.addEventListener('change', (event) => {
    if (playerSelector.value === "twoPlayers") {
        pseudoAvatarSelector2.style.display = 'block'
 }
})

diffSelector.addEventListener('change', () => {
    if (playerSelector.value === "easy") {
    }
    if (playerSelector.value === "difficult") {

    }
})



