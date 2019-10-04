if (playerSelector.value === "easy") {
  let cpt = 120;
}
else {
  let cpt = 90;
}

let x;
function decompte() {
  if (cpt >= 0) {
    document.getElementById("chrono").innerHTML = cpt;
    cpt--;
    x = setTimeout(decompte, 1000);
  } else {
    clearTimeout(x);
    gameOver();
  }
}   
