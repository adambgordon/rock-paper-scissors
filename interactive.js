
function playRound() {
    playerSelection = this.getAttribute("data-value");
    console.log(playerSelection);
}


const buttons = document.querySelectorAll(".button");
buttons.forEach(button => button.addEventListener("click",playRound));
