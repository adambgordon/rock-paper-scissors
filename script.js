
// Generates random selection for the computer
function computerPlay() {
    let randomInt = Math.random()*3;
    if (randomInt < 1) {
        return "rock";
    } else if (randomInt < 2) {
        return "paper";
    } else {
        return "scissors";
    }
}

// Converts string to sentence case
function toSentenceCase(s) {
    return s.substring(0,1).toUpperCase() + s.substring(1).toLowerCase();
}

// Evaluates winner of the game
// Returns true if 1st player wins, otherwise false
function firstPlayerWins(player1, player2) {

    const rock = "Rock";
    const paper = "Paper";
    const scissors = "Scissors";

    switch (player1) {
        case rock:
           return (player2 === scissors) ? true : false;
        case paper:
            return (player2 === rock) ? true : false;
        case scissors:
            return (player2 === paper) ? true : false;
    }
}

function printRoundWinner (status, playerSelection, computerSelection) {
    if (status === "tie") {
        console.log("Tie! You both selected " + playerSelection + ".");
    } else if (status === "player") {
        console.log("You Win! " + playerSelection + " beats " + computerSelection + ".");
    } else {
        console.log("You Lose! " + computerSelection + " beats " + playerSelection + ".");
    }
}

// Runs a round of the game
// Returns tie, player is winner, or computer is winner
function playRound (playerSelection, computerSelection) {

    let gameMessage;

    let p = toSentenceCase(playerSelection);
    let c = toSentenceCase(computerSelection);

    console.log("Player: " + p);
    console.log("Computer: " + c);

    if (p === c) {
        gameMessage = "tie";
    } else if (firstPlayerWins(p,c) === true) {
        gameMessage = "player";
    } else {
        gameMessage = "computer";
    }

    return gameMessage;
}

// Runs the game
function game () {

    let playerSelection;
    let computerSelection;

    let playerScore = 0;
    let computerScore = 0;


    for (let i = 0; i < 5; i++) {
        console.log("Round " + (i+1));

        playerSelection = prompt();
        computerSelection = computerPlay();

        let winner = playRound(playerSelection,computerSelection);
        if (winner === "player") {
            playerScore++;
        } else if (winner === "computer") {
            computerScore++;
        }
        printRoundWinner(winner,playerSelection,computerSelection);
    }
    printGameWinner(playerScore, computerScore);

}

function printGameWinner (playerScore, computerScore) {
    let gameWinner;
    if (playerScore > computerScore) {
        gameWinner = "Player";
    } else if (playerScore < computerScore) {
        gameWinner = "Computer";
    } else {
        gameWinner = "Nobody";
    }
    console.log("Final score: Player - " + playerScore + ", Computer - " + computerScore + ".");
    console.log(gameWinner + " wins.");
}

game();