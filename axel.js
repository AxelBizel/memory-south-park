function gameOver() {
    if (win) {
        gameOverElt.innerHTML = `<h3>TU DÉCHIRES !</h3>
        </br> </br>
        <img src="https://framapic.org/j58ZTNke6Syp/sZ5RwV3u8zUv.png" width="80%">
        <br>
        <p> Tu as trouvé toutes les paires en ${120 - cpt  - 1} secondes !</p>`;
        clearTimeout(x);
    }
    else {
        if (nbPoints <2) {
            gameOverElt.innerHTML = `<h3>TU CRAINS !</h3> 
        </br> </br>
        <img src="https://framapic.org/vFnNDUQ4bsbM/2k2NUdn9MJFl.png" width="80%">
        <br>
        <p> Tu n'as trouvé que ${nbPoints} paire.
        </br> C'est nul !</p>`
        }
        else {
            gameOverElt.innerHTML = `<h3>TU CRAINS !</h3> 
        </br> </br>
        <img src="https://framapic.org/vFnNDUQ4bsbM/2k2NUdn9MJFl.png" width="80%">
        <br>
        <p> Tu n'as trouvé que ${nbPoints} paires.
        </br> C'est nul !</p>`
        }
        
    }
    document.getElementById("gameOverDiv").style.display = "block";
}