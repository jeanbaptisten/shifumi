var rockButton = document.getElementsByClassName("game-button")[0];
rockButton.gameValue = "rock";
var scissorButton = document.getElementsByClassName("game-button")[1];
scissorButton.gameValue = "scissor";
var paperButton = document.getElementsByClassName("game-button")[2];
paperButton.gameValue = "paper";

var comparatorElement = document.createElement("div");
comparatorElement.classList.add("comparator");

var youTextElement = document.createElement("p");
youTextElement.innerHTML = "You";

var computeurTextElement = document.createElement("p");
computeurTextElement.innerHTML = "Computer";
