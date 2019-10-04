//fonction chrono

const chrono = document.getElementById('chrono');
let time = 4; 
const decompte = setInterval(startStopChrono, 1000);

function startStopChrono(){
    chrono.innerText = 'Temps restant : ' + time + ' sec';
    time-- ;
    if (time < 0){
        clearInterval(decompte);
    }
    
}



