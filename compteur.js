// fonction compteur : rajoute 1 points si les cartes sont identiques. 

function addPoint() {
    const counter = document.getElementById('counter');
    nbPoints++
    counter.innerText = nbPoints;    
}

addPoint(true);