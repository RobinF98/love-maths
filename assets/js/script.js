// Wait for DOM to finish loading before rrunning game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }

    runGame("addition");
    calculateCorrectAnswer();

});

/**
 * The main game loop, called on script load
 * and after processing user answer 
 */
function runGame(gameType) {

    //Creates two random ints between 1 and 25 (inclusive)
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else {
        alert(`unknown game type: ${gameType}`);
        throw `unknown game type: ${gameType}. Aborting!`;
    }
}

/**
 * Checks user answer against 1st element in 
 * returned calculateCorrectAnswer array
 */
function checkAnswer() {

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calcAns = calculateCorrectAnswer();
    let isCorrect = userAnswer === calcAns[0];

    let msg = isCorrect ? "Nice one, big boy" : "Try harder, small fry";
    alert(msg);
    
    runGame(calcAns[1]);

}

/**
 * Gets operands and operator directly from DOM, and returns correct answer
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById("operand1").textContent);
    let operand2 = parseInt(document.getElementById("operand2").textContent);
    let operator = document.getElementById("operator").textContent;

    switch (operator) {
        case "+":
            return [operand1 + operand2, "addition"];
            break;
        default:
            alert(`Unimplemented operator: ${operator}`);
            throw (`unimplemented operator: ${operator}... Aborting `);
    }
}

function incrementScore() {

}

function incrementWrongAnswer() {

}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;

    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion() {

}

function displayMultiplyQuestion() {

}