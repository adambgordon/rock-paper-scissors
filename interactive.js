
function playRound() {
    const playerSelection = this.getAttribute("data-value");
    const computerSelection = computerSelects();
    console.log(playerSelection);
    console.log(computerSelection);
    console.log(evaluateRound(playerSelection,computerSelection));
}


const buttons = document.querySelectorAll(".button");
buttons.forEach(button => button.addEventListener("click",playRound));


// Generates random selection for the computer
function computerSelects() {
    let randomInt = Math.random()*3;
    if (randomInt < 1) {
        return "rock";
    } else if (randomInt < 2) {
        return "paper";
    } else {
        return "scissors";
    }
}

// Evaluates a round of the game
// Returns "tie" if tie, "player" if is winner, or "computer" if computer is winner
function evaluateRound (playerSelection, computerSelection) {

    let gameMessage;

    if (playerSelection === computerSelection) {
        gameMessage = "tie";
    } else if (playerWins(playerSelection,computerSelection) === true) {
        gameMessage = "player";
    } else {
        gameMessage = "computer";
    }

    return gameMessage;
}

// If not a tie, evaluates winner of the game
// Returns true if player wins, otherwise false
function playerWins(player1, player2) {
    switch (player1) {
        case "rock":
           return (player2 === "scissors") ? true : false;
        case "paper":
            return (player2 === "rock") ? true : false;
        case "scissors":
            return (player2 === "paper") ? true : false;
    }
}