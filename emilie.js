const openingForm = document.getElementById("openingForm")
const firstBtn = document.getElementById("button1")
const submitNameAvatar = document.getElementById("submitNameAvatar")
const playerSelector = document.getElementById("playerSelector")
const diffSelector = document.getElementById("diffSelector")
const playerTwo = document.getElementById("playerTwo")
const avatarSelectorWrap = document.getElementById("avatarSelectorWrap")
const avatarSelectorWrap2 = document.getElementById("avatarSelectorWrap2")

firstBtn.addEventListener('click', (event) => {
    openingForm.style.display = 'none';
    avatarSelectorWrap.style.display = 'block'; 
})

playerSelector.addEventListener('change', (event) => {
    if (playerSelector.value === "twoPlayers") {
        avatarSelectorWrap2.style.display = 'block'
 }
})

diffSelector.addEventListener('change', () => {
    if (playerSelector.value === "easy") {
    }
    if (playerSelector.value === "difficult") {

    }
})



