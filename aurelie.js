
// const avatarNumber = 4
function initializeAvatar(avatarNumber){
    for (let i; i<avatarNumber, i++){
    divAvatar = document.getElementById("avatarSelector").createElement("img");
    img.src = "url('image/"+i+".png')"
}
// function avatarDisplay(){
//     for (let i; i<avatarNumber, i++){
//         divAvatar = document.getElementById("avatarSelector").createElement("img");
//         img.src = "url('image/"+i+".png')"
//     }
// }
// const avatarSelector = document.getElementById("avatarSelector");

let userName='toto';
// const submitNameAvatar = document.getElementById("submitNameAvatar")


document.getElementById("submitNameAvatar").addEventListener('click', ()=>{
    userName = document.getElementById("userName").value
    console.log("1",userName)
});

