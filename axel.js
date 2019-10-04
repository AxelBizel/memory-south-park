const buttonNewGame = '<button type="button">Relancer le jeu</button>'

buttonNewGame.addEventListener('click', newGame(5,5,1,player1, player2));


function gameOver() {
    if (isKennyDead === true){
        gameOverElt.innerHTML = `<h3>OMG!</h3>
            </br> </br>
            <img src="http://s3.amazonaws.com/blogs.comedycentral.com-production/wp-content/uploads/sites/58/2014/09/1514_KennyDeath.gif" width="80%">
            <br>
            <p> Ils ont buté Kenny ! Enculés !</p>`;
            isKennyDead = false; 
    }
    
    else{
        if (multiplayer === true) {
            if (player1.counter > player2.counter) {
                gameOverElt.innerHTML = `<h3>${player1.name} wins !</h3>
                </br> </br>
                <img src="https://framapic.org/j58ZTNke6Syp/sZ5RwV3u8zUv.png" width="80%">
                <br>
                <p> Tu as trouvé ${player1.counter - player2.counter} paires de plus que ce débile de ${player2.name}!</p>`;
            }
            else if (player2.counter > player1.counter) {
                gameOverElt.innerHTML = `<h3>${player2.name} wins !</h3>
                </br> </br>
                <img src="https://framapic.org/j58ZTNke6Syp/sZ5RwV3u8zUv.png" width="80%">
                <br>
                <p> Tu as trouvé ${player2.counter - player1.counter} paires de plus que ce débile de ${player1.name}!</p>`;
            }
            else {
                gameOverElt.innerHTML = `<h3> Égalité !</h3>
                </br> </br>
                <img src="https://framapic.org/j58ZTNke6Syp/sZ5RwV3u8zUv.png" width="80%">
                <br>
                <p> ${player1.name} et ${player2.name} ont trouvé autant de paires. Un combat d'infirmes est prévu pour les départager !</p>`;
            }
        }
        else {
            if (win) {
                gameOverElt.innerHTML = `<h3>TU DÉCHIRES !</h3>
                </br> </br>
                <img src="https://framapic.org/j58ZTNke6Syp/sZ5RwV3u8zUv.png" width="80%">
                <br>
                <p> Tu as trouvé toutes les paires en ${120 - cpt  - 1} secondes !</p>`;
                clearTimeout(x);
            }
            else if (nbPoints <2) {
                gameOverElt.innerHTML = `<h3>TU CRAINS !</h3> 
                </br> </br>
                <img src="https://framapic.org/vFnNDUQ4bsbM/2k2NUdn9MJFl.png" width="80%">
                <br>
                <p> Tu n'as trouvé que ${nbPoints} paire.
                </br> C'est nul !</p>`;
                clearTimeout(x);
            }
            else {
                gameOverElt.innerHTML = `<h3>TU CRAINS !</h3> 
                </br> </br>
                <img src="https://framapic.org/vFnNDUQ4bsbM/2k2NUdn9MJFl.png" width="80%">
                <br>
                <p> Tu n'as trouvé que ${nbPoints} paires.
                </br> C'est nul !</p>`;
                clearTimeout(x);
            }
        }
    }
    gameOverElt.appendChild(buttonNewGame);
    document.getElementById("gameOverDiv").style.display = "block";
}