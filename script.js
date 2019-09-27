let cpt = 60;
let x;
function decompte() {
  if (cpt >= 0) {
    document.getElementById("chrono").innerHTML = "La page s'affichera dans " + cpt + "sec";
    cpt--;
    x = setTimeout(decompte, 1000);
  } else {
    clearTimeout(x);
  }
}   