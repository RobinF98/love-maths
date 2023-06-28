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

    switch (gameType) {
        case "addition":
            displayAdditionQuestion(num1, num2);
            break;
        case "multiply":
            displayMultiplyQuestion(num1, num2);
            break;
        case "subtract":
            displaySubtractQuestion(num1, num2);
            break;
        default:
            alert(`unknown game type: ${gameType}`);
            throw `unknown game type: ${gameType}. Aborting!`;
            break;
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

    if (isCorrect) {
        alert("Nice one, big boy");
        incrementScore();
    } else {
        alert("Try harder, small fry");
        incrementWrongAnswer();
    }


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
        case "x":
            return [operand1 * operand2, "multiply"];
            break;
        case "-":
            return [operand1 - operand2, "subtract"];
            break;
        default:
            alert(`Unimplemented operator: ${operator}`);
            throw (`unimplemented operator: ${operator}... Aborting `);
    }
}


/**
 * Gets the current score from DOM and increments by 1
 */
function incrementScore() {
    let score = parseInt(document.getElementById("score").textContent);
    document.getElementById("score").textContent = ++score;
}

/**
 * Gets incorrect score from DOM and increments by 1
 */
function incrementWrongAnswer() {
    let score = parseInt(document.getElementById("incorrect").textContent);
    document.getElementById("incorrect").textContent = ++score;

}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}
