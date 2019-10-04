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
    divAvatar.setAttribute("id", i);
    divAvatar.style.height = "150px";
    divAvatar.style.width = "150px";
    document.getElementById("avatarSelector").appendChild(divAvatar);
    }
}
// Permet de cliquer sur les avatars ! 1 joueur FONCTIONNEL
function selecter(channelNumber){
    let listAvatar = document.getElementById("avatarSelector").getElementsByTagName("li");
    for (let i = 0; i< avatarNumber; i++){
        listAvatar[i].className = i+1 === channelNumber ? "selected":""; 
    }
    choosenAvatar = document.getElementsByClassName("selected")[0].id
}

 // Cree variable username et avatar en fonction de l'entrée (1joueur)
 // playerName1 et avatarPlayer1
document.getElementById("submitNameAvatar1Player").addEventListener('click', (e) => {
    console.log(choosenAvatar)
    const userName = document.getElementById("userName").value;
     if (choosenAvatar === undefined && userName === ""){
        alert("Choisi un pseudo et un avatar!")
    } else if (userName === ""){
        alert("On a besoin de ton p'tit nom")
    } else if (choosenAvatar === undefined) {
        alert("Choisi un avatar")
    } else {
        document.getElementById("wrapPseudoSelector1").style.display = "none";
        player1 = new Player(userName, choosenAvatar, 1)
        player2 = null;
        if (difficulty === "easy") newGame(5, 5, 1);
        else newGame(6, 6, 2);
    }
});
