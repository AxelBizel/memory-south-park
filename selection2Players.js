// // Version 2 joueurs Affichage des avatars
 initializeAvatar2players(avatarNumber)
 function initializeAvatar2players(avatarNumber){
     for (j=1; j<3; j++){
         for (let i=1; i<=avatarNumber; i++){
         divAvatar = document.createElement("li");
         avatarUrl = `url(avatars/${i}.png)`;
         console.log(avatarUrl);
         divAvatar.style.backgroundImage = avatarUrl;
         divAvatar.style.backgroundPosition = "center center";
         divAvatar.setAttribute("onclick", `selecter${j}(${i})`);
         divAvatar.setAttribute("id","avatar"+i+j);
         divAvatar.style.height = "150px";
         divAvatar.style.width = "150px";
         document.getElementById("avatarSelector"+j).appendChild(divAvatar);
     }}}

// // Avatars clickables 2 joueurs
 function selecter1(channelNumber){
     // for (let j=1; j<3; j++){
     let listAvatar1 = document.getElementById("avatarSelector1").getElementsByTagName("li");
        for (let i = 0; i< avatarNumber; i++){
         listAvatar1[i].className = i+1 == channelNumber ? "selected":""; }
         choosenAvatarplayer1 = document.getElementById("avatarSelector1").getElementsByClassName("selected")[0].id
         console.log(choosenAvatarplayer1)
     }   
// CA FONCTIONNE BORD** DE M****
 function selecter2(channelNumber){
         // for (let j=1; j<3; j++){
     let listAvatar2 = document.getElementById("avatarSelector2").getElementsByTagName("li");
     for (let i = 0; i< avatarNumber; i++){
        listAvatar2[i].className = i+1 == channelNumber ? "selected":""; }
         choosenAvatarplayer2 = document.getElementById("avatarSelector2").getElementsByClassName("selected")[0].id
         console.log(choosenAvatarplayer2)
         }  