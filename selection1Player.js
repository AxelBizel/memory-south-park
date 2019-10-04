
// Affiche les avatars (si besoin changer valeur) 1 JOUEUR

const avatarNumber = 5

initializeAvatar(avatarNumber)
function initializeAvatar(avatarNumber){
    for (let i=1; i<=avatarNumber; i++){
    divAvatar = document.createElement("li");
    avatarUrl = `url(avatars/${i}.png)`;
    console.log(avatarUrl);
    divAvatar.style.backgroundImage = avatarUrl;
    divAvatar.style.backgroundPosition = "center center";
    divAvatar.setAttribute("onclick", `selecter(${i})`);
    divAvatar.setAttribute("id","avatar"+i);
    divAvatar.style.height = "150px";
    divAvatar.style.width = "150px";
    document.getElementById("avatarSelector").appendChild(divAvatar);
    }
}
// Permet de cliquer sur les avatars ! 1 joueur FONCTIONNEL
function selecter(channelNumber){
    let listAvatar = document.getElementById("avatarSelector").getElementsByTagName("li");
    for (let i = 0; i< avatarNumber; i++){
        listAvatar[i].className = i+1 == channelNumber ? "selected":""; 
    }   }
choosenAvatar = document.getElementsByClassName("selected")[0].id

 // Cree variable username et avatar en fonction de l'entrée (1joueur)
 // playerName1 et avatarPlayer1
let userName;
document.getElementById("submitNameAvatar1Player").addEventListener('click', (e)=>{   
     if (choosenAvatar === undefined){
         alert("Choisi un avatar !")
    } else if (document.getElementById("userName").value === ""){
        alert("On a besoin de ton p'tit nom")
    } else if (choosenAvatar === avatar3){
        isKennyDead = true;
        return gameOver()
    } else if(document.getElementById("userName").value !== "" && choosenAvatar !== undefined){
        document.getElementById("divPseudoAvatarSelector1Player").style.display = "none";
        playerName1 = document.getElementById("userName").value;
        avatarPlayer1 = choosenAvatar;
        board = newGame(5, 5, true);
        decompte();
        document.getElementById("board").appendChild(board);
    } else {
        alert("Choisi un pseudo et un avatar!")
    }
});
