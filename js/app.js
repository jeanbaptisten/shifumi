// Application
// Initialisation des boutons dans la zone de jeu.
rockButton.addEventListener("click", (event) => this.onGamePlay(event));
scissorButton.addEventListener("click", (event) => this.onGamePlay(event));
paperButton.addEventListener("click", (event) => this.onGamePlay(event));
document
  .querySelector("input[type='button']")
  .addEventListener("click", (event) => this.onReset(event));
document
  .querySelector("input[type='checkbox']")
  .addEventListener("click", (event) => this.onImpossibleVersionSwitch(event));

// Initalisation des variables globales du jeu.
let gamePlayedBool = false;
let impossibleVersion = false;

// Définition des fonctions

// Fonctions d'évènements
/**
 * Fonction suite au choix de l'utilisateur.
 * @param {Event} event
 */
function onGamePlay(event) {
  if (gamePlayedBool == true) return;

  gamePlayedBool = true;

  let userChoice = event.currentTarget;
  let computerChoice = getComputerChoice(impossibleVersion, userChoice);

  // Cas égalité
  if (userChoice.gameValue == computerChoice.gameValue)
    this.setResult("equal", userChoice, computerChoice);

  //  Cas perdants
  if (
    (userChoice.gameValue == "rock" && computerChoice.gameValue == "paper") ||
    (userChoice.gameValue == "scissor" && computerChoice.gameValue == "rock") ||
    (userChoice.gameValue == "paper" && computerChoice.gameValue == "scissor")
  )
    this.setResult("lost", userChoice, computerChoice);

  // Cas gagnants
  if (
    (userChoice.gameValue == "rock" && computerChoice.gameValue == "scissor") ||
    (userChoice.gameValue == "scissor" && computerChoice.gameValue == "paper") ||
    (userChoice.gameValue == "paper" && computerChoice.gameValue == "rock")
  )
    this.setResult("won", userChoice, computerChoice);
}

/**
 * Fonction suite au reset du jeux.
 * @param {Event} event
 */
function onReset(event) {
  // Reset du jeu.
  gamePlayedBool = false;

  // On réinitialise le background
  let backgroundElement = document.querySelector(".wrapper");
  backgroundElement.classList.remove(backgroundElement.classList[1]);

  // On cache le bouton reset.
  document.querySelector("input[type='button']").style.opacity = 0;

  // On cache la zone jouée et on la vide.
  let playedZone = document.querySelector("#played");
  playedZone.style.opacity = 0;
  while (playedZone.lastElementChild) playedZone.removeChild(playedZone.lastChild);

  // On cache la zone de résultat et on la vide.
  let resultZone = document.querySelector("#result");
  resultZone.style.opacity = 0;
  resultZone.innerText = "";

  // On réinitialise le comparateur.
  comparatorElement.classList.remove(comparatorElement.classList[1]);
}

/**
 * Fonction suite à l'activation du mode impossible.
 * @param {Event} event
 */
function onImpossibleVersionSwitch(event) {
  impossibleVersion = event.currentTarget.checked;
}

// Fonctions attachés à la vue

/**
 * Definition visuelle du résultat.
 * @param {String} gameState        Etat de la partie. Valeurs: equal / lost / won
 * @param {Element} userChoice      Element choisit par le joueur. (Rock/Scissor/Paper)
 * @param {Element} computerChoice  Element choisit par l'ordinateur. (Rock/Scissor/Paper)
 */
function setResult(gameState, userChoice, computerChoice) {
  this.definePlayedZone(gameState, userChoice, computerChoice);
  this.defineResultZone(gameState);

  document.querySelector("input[type='button']").style.opacity = 1;
}

// Fonctions de découpage

/**
 * Mise en page du résultat dans la zone jouée.
 * @param {String} gameState        Etat de la partie. Valeurs: equal / lost / won
 * @param {Element} userChoice      Element choisit par le joueur. (Rock/Scissor/Paper)
 * @param {Element} computerChoice  Element choisit par l'ordinateur. (Rock/Scissor/Paper)
 */
function definePlayedZone(gameState, userChoice, computerChoice) {
  let playedZone = document.getElementById("played");

  playedZone.append(youTextElement);
  playedZone.appendChild(userChoice.cloneNode(true));

  switch (gameState) {
    case "equal":
      comparatorElement.classList.add("equal");
      playedZone.append(comparatorElement);
      break;

    case "lost":
      comparatorElement.classList.add("left");
      playedZone.append(comparatorElement);
      break;

    case "won":
      comparatorElement.classList.add("right");
      playedZone.append(comparatorElement);
      break;

    default:
      alert(`Error ! Game state: ${gameState}. Please reload or contact a developper !`);
      break;
  }

  playedZone.appendChild(computerChoice.cloneNode(true));
  playedZone.append(computeurTextElement);

  playedZone.style.opacity = 1;
}

/**
 * Mise en page du résultat.
 * @param {String} gameState        Etat de la partie. Valeurs: equal / lost / won
 */
function defineResultZone(gameState) {
  let resultZone = document.getElementById("result");

  switch (gameState) {
    case "equal":
      resultZone.innerText = "Égalité, retentez votre chance.";
      break;

    case "lost":
      resultZone.innerText = "Perdu...";
      document.querySelector(".wrapper").classList.add("lost"); // Ajout du background rouge si perdu
      break;

    case "won":
      resultZone.innerText = "Gagné !";
      document.querySelector(".wrapper").classList.add("won"); // Ajout du background rouge si perdu
      break;

    default:
      alert(`Error ! Game state: ${gameState}. Please reload or contact a developper !`);
      break;
  }

  resultZone.style.opacity = 1;
}

// Fonctions relatifs au fonctionnement

/**
 * Choix de l'ordinateur. (Random si mode normal, gagnant si mode impossible)
 * @param {boolean} isImpossible  Mode disponible activé ?
 * @param {Element} userChoice    Element choisit par le joueur. (Rock/Scissor/Paper)
 * @returns
 */
function getComputerChoice(isImpossible, userChoice) {
  // Je vérifie si le mode impossible est actif.
  if (!isImpossible) {
    // Mode impossible désactivé.
    // Génération d'un nombre aléatoire et choix du computer en fonction de ce nombre.
    let randomNumber = getRandomInt(3);
    switch (randomNumber) {
      case 0:
        return rockButton;
      case 1:
        return scissorButton;
      case 2:
        return paperButton;
      default:
        // randomNumber < 0 ou > 2 !
        alert(
          `Error ! Random value number: ${randomNumber}. Please reload or contact a developper !`
        );
        return null;
    }
  }

  // Mode impossible activé, choix du computer en fonction du choix de l'utilisateur.
  switch (userChoice.gameValue) {
    case "rock":
      return paperButton;
    case "scissor":
      return rockButton;
    case "paper":
      return scissorButton;
    default:
      alert(`Error ! Game value: ${userChoice.gameValue}. Please reload or contact a developper !`);
      return null;
  }
}

/**
 * Retourne un nombre entier aléatoire.
 * Exemple: Si max=3, les valeurs attendues sont 0, 1 et 2.
 * @param   {Number} max Valeur maximale.
 * @returns {Number}     Entier aléatoire généré.
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
