const result = document.getElementById('result');
const buttons = document.querySelectorAll('button');

let currentInput = '0';
let operator = null;
let previousInput = null;

function updateDisplay() {
    result.value = currentInput;
    result.disabled = true;
}

function handleNumberClick(number) {
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else if (number === '.' && currentInput.includes('.')) {
        
        return;
    }
    else {
        currentInput += number;
    }
    updateDisplay();
}

function handleOperatorClick(op) {
    if (op === 'AC') {
        currentInput = '0';
        operator = null;
        previousInput = null;
    } else if (op === '+/-') {
        currentInput = (parseFloat(currentInput) * -1).toString();
    } else if (op === '%') {
        currentInput = (parseFloat(currentInput) / 100).toString();
    } else if (op === '=') {
        if (operator && previousInput !== null) {
            
            currentInput = calculate(parseFloat(previousInput), parseFloat(currentInput), operator).toString();
            operator = null;
            
            previousInput = null;
        }
        
    } else {
        if (operator && previousInput !== null) {
            currentInput = calculate(parseFloat(previousInput), parseFloat(currentInput), operator).toString();
            previousInput = currentInput;
            operator = op;
            currentInput = '0';
        } else {
            previousInput = currentInput;
            currentInput = '0';
            operator = op;
        }
    }
    updateDisplay();
}

function calculate(num1, num2, op) {
    switch (op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 === 0) {
                return 'Error';
            }
            return num1 / num2;
        default:
            return num2;
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.dataset.value;
        if (button.classList.contains('number')) {
            handleNumberClick(buttonValue);
        } else if (button.classList.contains('operator')) {
            handleOperatorClick(buttonValue);
        }
    });
});

updateDisplay();
