// MARGIN is the value of margins between tiles in px
const MARGIN = 8;
let tileId = 1;
let nbPoints = 0;
let win = false;
const mysteryCardMessage = document.getElementById("mysteryCard");
const logo = document.getElementById("logo");
const gameOverElt = document.getElementById("gameOver");
const board = document.getElementById("board");
const demo = document.getElementById("demo");
let x = null;

mysteryCardMessage.addEventListener("click", (e) => {
    e.target.style.display = "none";
});

demo.addEventListener("change", (e) => {
    updateView();
    const demoShuffle = document.getElementById("demoShuffle");
    const demoNewGame = document.getElementById("demoNewGame");
    if (e.target.checked) {
        demoShuffle.style.display = "block";
        demoNewGame.style.display = "block";
    }
    else {
        demoShuffle.style.display = "none";
        demoNewGame.style.display = "none";
    }
});

function newGame(nbRows, nbColumns, nbMysteryCards) {
    if (x) clearInterval(x);
    if (difficulty === "easy") {
        cpt = 120;
      }
      else {
        cpt = 90;
      }
    isKennyDead = false;
    hasStanVomitted = false;
    hasPlayerPlayedSinceStanVomitted = false;
    player1.resetCounter();
    rows = nbRows;
    columns = nbColumns;
    document.getElementById("player1").style.display = "block";
    currentPlayer = player1;
    document.getElementById("player1Name").textContent = player1.name;
    document.getElementById("avatarPlayer1").src = `avatars/${player1.avatar}.png`
    win = false;
    nbCards = rows * columns - nbMysteryCards;
    if (player2) {
        multiplayer = true;
        player2.resetCounter();
        document.getElementById("player2").style.display = "block";
        document.getElementById("chronoDiv").style.display = "none";
        document.getElementById("player2Name").textContent = player2.name;
        document.getElementById("avatarPlayer2").src = `avatars/${player2.avatar}.png`
    } else {
        multiplayer = false;
        document.getElementById("player2").style.display = "none";
        document.getElementById("chronoDiv").style.display = "block";
        document.getElementById("chrono").innerHTML = cpt;
        decompte();
    }
    let index = 1;
    const cards = []
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < nbCards / 2; j++) {
            cards.push(new Card(index, j + 1));
            index++;
        }
    }
    if (nbMysteryCards) {
        for (let i = 0; i < nbMysteryCards; i++) cards.push(new Card(index, "mystery"));
        index++;
    }
    logo.style.position = "absolute";
    logo.style.width = "20%";
    logo.style.left = "50px";
    revealedCards = [];
    revealedCards.status = "";
    shuffledCards = shuffle(cards);
    updateView();
}


// Vérifie si il y a déjà une carte retournée ; si c'est le cas, compare les deux cartes et change le status de revealedCards en fonction
function cardCheck(card) {
    revealedCards.push(card);
    if (revealedCards.length === 2) {
        if (revealedCards[1].characterId === "mystery") {
            revealedCards.status = "mystery";
            revealedCards.pop();
        } else if (revealedCards[1].characterId === revealedCards[0].characterId) {
            if (characters.find(character => character.id === revealedCards[1].characterId).name === "Kenny") revealedCards.status = "kenny";
             else revealedCards.status = "win";
        } else {
            revealedCards.status = "lose";
            if ((characters.find(character => character.id === revealedCards[0].characterId).name === "Stan") && (characters.find(character => character.id === revealedCards[1].characterId).name === "Wendy")) vomi();
            else if ((characters.find(character => character.id === revealedCards[0].characterId).name === "Wendy") && (characters.find(character => character.id === revealedCards[1].characterId).name === "Stan")) vomi();
        }
    } else if (revealedCards[0].characterId === "mystery") {
        revealedCards.status = "mystery";
        revealedCards.pop();
    }
}

function revealCard(card) {
    card.isRevealed = true;
}

function hideCard(card) {
    card.isRevealed = false;
}

function shuffle(cards) {
    const shuffledCards = new Array(cards.length);
    shuffledCards.fill("");
    cards.forEach(card => {
        let randomNumber = Math.floor(Math.random() * (cards.length));
        while (shuffledCards[randomNumber] != "") {
            randomNumber = Math.floor(Math.random() * (cards.length));
        }
        shuffledCards[randomNumber] = card;
    });
    return shuffledCards;
}

function handleCardClick(card) {
    if (card.isRevealed) return;
    revealCard(card);
    updateView();
    cardCheck(card);
    if (revealedCards.status === "win" || revealedCards.status === "kenny") {
        if (revealedCards.status === "kenny") {
            isKennyDead = true;
        }
        if (hasStanVomitted && hasPlayerPlayedSinceStanVomitted) {
            vomiElt.style.display = "none";
            hasStanVomitted = true;
        }
        else if (hasStanVomitted) hasPlayerPlayedSinceStanVomitted = true;
        currentPlayer.addPoint();
        characters.find(character => character.id === card.characterId).playSound();
        if (!multiplayer && currentPlayer.counter === nbCards / 2) {
            win = true;
            gameOver();
        } else if (multiplayer) {
            if (player1.counter + player2.counter === nbCards / 2) {
                win = true;
                gameOver();
            }
        }
        if (isKennyDead) gameOver();
        document.getElementById(revealedCards[0].id).style.pointerEvents = "none";
        document.getElementById(revealedCards[1].id).style.pointerEvents = "none";
        revealedCards = [];
        revealedCards.status = "";
        updateView();
    } else if (revealedCards.status === "lose") {
        if (hasStanVomitted && hasPlayerPlayedSinceStanVomitted) vomiElt.style.display = "none";
        else if (hasStanVomitted) hasPlayerPlayedSinceStanVomitted = true;
        document.body.style.pointerEvents = "none";
        hideCard(revealedCards[0]);
        hideCard(revealedCards[1]);
        revealedCards = [];
        revealedCards.status = "";
        setTimeout(() => {
            document.body.style.pointerEvents = "auto";
            updateView();
            if (multiplayer) togglePlayer();
        }, 1000);
    } else if (revealedCards.status === "mystery") {
        if (revealedCards.length === 2) {
            hideCard(revealedCards[0]);
            revealedCards = [];
        }
        revealedCards.status = "";
        updateView();
        document.body.style.pointerEvents = "none";
        setTimeout(() => {
            boardShuffle();
            document.body.style.pointerEvents = "auto";
        }, 1000);
    } else updateView();
}

function updateView() {
    board.innerHTML = "";
    let index = 0;
    for (let i = 0; i < rows; i++) {
        HTMLContent = '<div class="custom-row">'
        for (let j = 0; j < columns; j++) {
            const card = shuffledCards[index];
            HTMLContent +=
            `<div style="margin: ${MARGIN}px; width: calc(100% / ${columns}); max-width: 200px;">` +
            `<div id ="${card.id}" card=${card} class="card" style="${card.isRevealed ? `background-image: url(${card.bgUrl}); background-color: rgba(200, 200, 200, 0.6);` : ""}" onclick="handleCardClick(shuffledCards[${index}])">${!card.isRevealed && demo.checked ? card.name : ""}</div>` +
            `</div>`;
            index++;
        }
        HTMLContent += '</div>'
        board.innerHTML += HTMLContent;
    }
}

class Card {
    constructor(id, characterId) {
        this.id = id;
        this.characterId = characterId;
        this.isRevealed = false;
        this.bgUrl = characters.find(character => character.id === characterId).imageUrl;
        this.name = characters.find(character => character.id === characterId).name;
    }
}

function boardShuffle() {
    shuffledCards = shuffle(shuffledCards);
    updateView();
}

function togglePlayer() {
    let otherPlayer
    if (currentPlayer === player1) {
        currentPlayer = player2;
        otherPlayer = player1;
    } else {
        currentPlayer = player1;
        otherPlayer = player2;
    }
    document.getElementById(`player${currentPlayer.id}Name`).classList.add("currentPlayer");
    document.getElementById(`player${otherPlayer.id}Name`).classList.remove("currentPlayer");
}

class Player {
    constructor(name, avatar, id) {
        this.name = name;
        this.avatar = avatar;
        this.counter = 0;
        this.id = id;
    }
    
    addPoint() {
        this.counter++;
        document.getElementById("counter" + this.id).textContent = this.counter;
        updateView();
    }

    resetCounter() {
        this.counter = 0;
        document.getElementById("counter" + this.id).textContent = 0;
    }
}

function vomi() {
    const boardStyle = window.getComputedStyle(board);
    // const contenuStyle = window.getComputedStyle(document.getElementById("contenu"));
    vomiElt = document.getElementById("vomi");
    vomiElt.style.display = "block";
    vomiElt.style.height = boardStyle.height;
    hasStanVomitted = true;
    hasPlayerPlayedSinceStanVomitted = false;
}


function gameOver() {
    const buttonNewGame = document.createElement("button");
    buttonNewGame.textContent = 'Rejouer';
    buttonNewGame.classList.add("btn", "btn-light")
    buttonNewGame.addEventListener('click', () => {
        newGame(5,5,1,player1, player2);
        document.getElementById("gameOverDiv").style.display = "none";
    });
    if (isKennyDead && !win){
        gameOverElt.innerHTML = `<h3>OMG!</h3>
            </br> </br>
            <img src="http://s3.amazonaws.com/blogs.comedycentral.com-production/wp-content/uploads/sites/58/2014/09/1514_KennyDeath.gif" width="80%">
            </br></br>
            <p> Ils ont buté Kenny ! Éspèces d'enfoirés !</p>`;
            isKennyDead = false; 
    }
    
    else{
        if (multiplayer === true) {
            if (player1.counter > player2.counter) {
                gameOverElt.innerHTML = `<h3>${player1.name} wins !</h3>
                </br> </br>
                <img src="https://framapic.org/j58ZTNke6Syp/sZ5RwV3u8zUv.png" width="80%">
                </br>
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
                window.clearInterval(x);
            }
            else if (nbPoints <2) {
                gameOverElt.innerHTML = `<h3>TU CRAINS !</h3> 
                </br> </br>
                <img src="https://framapic.org/vFnNDUQ4bsbM/2k2NUdn9MJFl.png" width="80%">
                <br>
                <p> Tu n'as trouvé que ${nbPoints} paire.
                </br> C'est nul !</p>`;
                window.clearInterval(x);
            }
            else {
                gameOverElt.innerHTML = `<h3>TU CRAINS !</h3> 
                </br> </br>
                <img src="https://framapic.org/vFnNDUQ4bsbM/2k2NUdn9MJFl.png" width="80%">
                <br>
                <p> Tu n'as trouvé que ${nbPoints} paires.
                </br> C'est nul !</p>`;
                window.clearInterval(x);
            }
        }
    }
    gameOverElt.appendChild(buttonNewGame);
    document.getElementById("gameOverDiv").style.display = "block";
}

function decompte() {
    x = setInterval(() => {
        if (cpt > 0) {
            cpt--;
            document.getElementById("chrono").innerHTML = cpt;
        } else {
            window.clearInterval(x);
            gameOver();
        }
    }, 1000)
}   

player1 = new Player("Martin", "", 1);
player2 = new Player("Joueur 2", "", 2)
// newGame(5,5,1, player1, player2);