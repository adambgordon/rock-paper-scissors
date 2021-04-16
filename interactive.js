// Initiates a round of the game
function playRound() {
    if (getPlayerScore() < 5 && getComputerScore() < 5) {
        const playerSelection = this.getAttribute("data-value");
        const computerSelection = computerSelects();
        updateGame(playerSelection, computerSelection);
    }
}


const buttons = document.querySelectorAll(".button");
buttons.forEach(button => button.addEventListener("click",playRound));

const playAgainButton = document.querySelector(".play-again").firstElementChild;
playAgainButton.addEventListener("click",resetGame);

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

function resetGame() {
    setPlayerScore(0);
    setComputerScore(0);
    updateSelections("","");
    document.querySelector(".result").textContent = "Make a selection.";
    document.querySelector(".play-again").style.display = "none";
}

function endGame () {
    let message;
    if (getPlayerScore() === 5) {
        message = "Well done! Play again?";
    } else if (getComputerScore() === 5) {
        message = "You Lost. Play again?";
    }

    const playAgainElement = document.querySelector(".play-again");
    playAgainElement.firstElementChild.textContent = message;
    playAgainElement.style.display = "flex";

}

// Updates the score and game message based on selections
function updateGame (playerSelection, computerSelection) {
    const result = evaluateRound(playerSelection,computerSelection);  
    updateSelections(playerSelection,computerSelection);  
    updateScore(result);
    updateResultMessage(result, playerSelection, computerSelection);
}

// Converts string to sentence case
function toSentenceCase(s) {
    return s.substring(0,1).toUpperCase() + s.substring(1).toLowerCase();
}

function updateSelections(playerSelection, computerSelection) {
    const playerSelectionElement = document.querySelector(".player-name").parentElement.lastElementChild;
    const computerSelectionElement = document.querySelector(".computer-name").parentElement.lastElementChild;
    playerSelectionElement.textContent = toSentenceCase(playerSelection);
    computerSelectionElement.textContent = toSentenceCase(computerSelection);
}


// Returns result message for output
function updateResultMessage(result, playerSelection, computerSelection) {
    const resultNode = document.querySelector(".result");
    let message;
    if (result === "tie") {
        message = toSentenceCase(playerSelection) + " ties " + (computerSelection) + ".";
    } else if (result === "player") {
        message = toSentenceCase(playerSelection) + " beats " + (computerSelection) + ". Congratulations.";
    } else if (result === "computer") {
        message = toSentenceCase(computerSelection) + " beats " + (playerSelection) + ". Better luck next time.";
    } else if (result === "reset") {
        message = "Make a selection.";
    }
    resultNode.textContent = message;

    transitionMessage();

}

function transitionMessage() {
    const element = document.querySelector(".result");
    if (element.classList.contains("updating-message")) {
        element.classList.remove("updating-message");
        void element.offsetWidth;
    }
    element.classList.add("updating-message");
}


// Adds score node to "updating-score-score" class
function transitionScore(name) {
    const element = document.querySelector(".updating-score");
    if (element !== null) {
        element.classList.remove("updating-score")
        void element.offsetWidth;
    }
    if (name === "player" || name === "computer") {
      document.querySelector(`.${name}-name`).nextElementSibling.classList.add("updating-score");
    }
}

// Gets player score
function getPlayerScore() {
    const playerScoreNode = document.querySelector(".player-name").nextElementSibling;
    return parseInt(playerScoreNode.textContent);
}

// Sets player score
function setPlayerScore(score) {
    const playerScoreNode = document.querySelector(".player-name").nextElementSibling;
    playerScoreNode.textContent = score.toString();
}

// Gets computer score
function getComputerScore() {
    const computerScoreNode = document.querySelector(".computer-name").nextElementSibling;
    return parseInt(computerScoreNode.textContent);
}

// Sets computer score
function setComputerScore(score) {
    const computerScoreNode = document.querySelector(".computer-name").nextElementSibling;
    computerScoreNode.textContent = score.toString();
}

// Updates the score of the game
function updateScore (result) {
    if (result === "player") {
        setPlayerScore(getPlayerScore()+1);
    } else if (result === "computer") {
        setComputerScore(getComputerScore()+1);
    }
    transitionScore(result);
    if (getPlayerScore() === 5 || getComputerScore() === 5) endGame();
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