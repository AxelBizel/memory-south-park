// Affiche les avatars (si besoin changer valeur)
initializeAvatar(4)
function initializeAvatar(avatarNumber){
    for (let i=1; i<=avatarNumber; i++){
    divAvatar = document.createElement("img");
    divAvatar.src = "images/characters/"+i+".png"
    document.getElementById("avatarSelector").appendChild(divAvatar);
    }
}



let userName;
// const submitNameAvatar = document.getElementById("submitNameAvatar")

// Fonction fonctionnelle (recupere username) - besoin de rajouter des conditions (presene pseudo, choix avatar)
// document.getElementById("submitNameAvatar").addEventListener('click', ()=>{
//     userName = document.getElementById("userName").value
//     console.log("1",userName)
// });

document.getElementById("submitNameAvatar").addEventListener('click', ()=>{
    if(document.getElementById("userName").value !== ""){
        userName = document.getElementById("userName").value
        console.log("1",userName)
    } else {
        alert("On a besoin de ton p'tit nom")
    }
});