players :{
    player1:{
        userName : "";
        choosenAvatar :"";
    }
    player2{
        userName : "";
        choosenAvatar: "";
    }
}

avatars : {
    kenny : {
        name : "Kenny";
        url : "avatars/kenny.png"
        id : 1
    }
    kyle : {
        name : "Kyle";
        url : "avatars/kyle.png"
        id : 2
    }
    cartman : {
        name : "Cartman";
        url : "avatars/cartman.png"
        id : 3
    }
    jimmy : {
        name : "Jimmy";
        url : "avatars/jimmy.png"
        id : 4
    }
    wendy : {
        name : "Wendy";
        url : "avatars/wendy.png"
        id : 5
    }
}

// Affiche les avatars (si besoin changer valeur)

const avatarNumber = 4

initializeAvatar(avatarNumber)
function initializeAvatar(avatarNumber){
    for (let i=1; i<=avatarNumber; i++){
    divAvatar = document.createElement("li");
    avatarUrl = "url(images/characters/"+i+".png)";
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
// Permet de cliquer sur les avatars !
let choosenAvatar;
function selecter(channelNumber){
     let listAvatar =document.getElementById("avatarSelector").getElementsByTagName("li");
     for (let i = 0; i< avatarNumber; i++){
         listAvatar[i].className = i+1 == channelNumber ? "selected":""; 
     }    
     choosenAvatar = document.getElementsByClassName("selected")[0].id
 }

 // Cree variable username et avatar en fonction de l'entrée
let userName;
document.getElementById("submitNameAvatar").addEventListener('click', (e)=>{
    
    if(document.getElementById("userName").value !== "" && choosenAvatar !== undefined){
        document.getElementById("avatarSelectorWrap").style.display = "none";
        userName = document.getElementById("userName").value;
        playerAvatar = choosenAvatar;
        console.log(playerAvatar);
        console.log("1",userName);
        board = newGame(5, 5, true);
        decompte();
        document.getElementById("board").appendChild(board);
    } else if (choosenAvatar !== undefined){
        alert("On a besoin de ton p'tit nom")
    } else if (document.getElementById("userName").value !== ""){
        alert("Choisi un avatar !")
    } else {
        alert("Choisi un pseudo et un avatar!")
    }
});
