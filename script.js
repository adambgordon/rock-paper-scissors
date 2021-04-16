// Main code
const buttons = document.querySelectorAll(".button");
buttons.forEach(button => button.addEventListener("click",playRound));

const playAgainButton = document.querySelector(".play-again").firstElementChild;
playAgainButton.addEventListener("click",resetGame);

// All functions below

// Initiates a round of the game
function playRound() {
    if (getPlayerScore() < 5 && getComputerScore() < 5) { // makes buttons unusable if score === 5
        const playerSelection = this.getAttribute("data-value");
        const computerSelection = computerSelects();
        updateGame(playerSelection, computerSelection);
    }
}

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

// Re-initializes all fields
function resetGame() {
    setPlayerScore(0);
    setComputerScore(0);
    updateSelections("","");
    document.querySelector(".result").textContent = "Make a selection.";
    document.querySelector(".play-again").style.display = "none";
}

// Customizes the play again message and unhides the button
function endGame () {
    let message;
    if (getPlayerScore() === 5) {
        message = "Well done! Play again?";
    } else if (getComputerScore() === 5) {
        message = "You Lost. Play again?";
    }

    const playAgainElement = document.querySelector(".play-again");
    playAgainElement.firstElementChild.textContent = message;
    playAgainElement.style.display = "flex"; // unhides the play again button
}

// Updates the score and game message based on selections
function updateGame (playerSelection, computerSelection) {
    const result = evaluateRound(playerSelection,computerSelection);  
    updateSelections(playerSelection,computerSelection);  
    updateScore(result);
    updateResultMessage(result, playerSelection, computerSelection);
}

// Converts a string to sentence case
function toSentenceCase(s) {
    return s.substring(0,1).toUpperCase() + s.substring(1).toLowerCase();
}

// Updates selection fields to specified parameters
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

// Makes result message pop
function transitionMessage() {
    // Deactivate animation by removing from animation class
    const element = document.querySelector(".result");
    if (element.classList.contains("updating-message")) {
        element.classList.remove("updating-message");
        // Void code to be executed to allow for complete removal of
        // animation class before adding it back
        void element.offsetWidth; 
    }
    // Activate animation by adding animation class back
    element.classList.add("updating-message");
}

// Animates the score for the round winner
function transitionScore(name) {
    // Deactivate animation by removing from animation class
    const element = document.querySelector(".updating-score");
    if (element !== null) {
        element.classList.remove("updating-score")
        // Void code to be executed to allow for complete removal of
        // animation class before adding it back
        void element.offsetWidth;
    }
    // Activate animation by adding animation class back
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

// Updates the score of the game and end game if necessary
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