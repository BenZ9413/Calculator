/*Besonderheiten noch zu programmieren
- Beginn mit negativer Zahl
- only one . at a time
*/
let firstNumber = null;
let secondNumber = null;
let operator = '';
let displayCount = false;
setupCalculator();

function setupCalculator() {
    addClickEventToNumbers();
    addClickEventToOperators();
    addClickEventToBack();
    addClickEventToClear();
    addClickEventToResult();
    addClickEventToPercent();
};

function addClickEventToNumbers() {
    const btnNumbers = document.querySelectorAll('.number');
    btnNumbers.forEach ((btn) => {
        btn.addEventListener('click', function (e) {
            if (displayCount) {
                clearDisplay();
                displayCount = false;
            };
            displayTextOnScreen(e);
        });
    });
};

function displayTextOnScreen (e) {
    const display = document.querySelector('.textField');
    const actualDisplayText = display.textContent;
    display.textContent = actualDisplayText + e.target.textContent;
    return;
};

function addClickEventToOperators() {
    const btnOperators = document.querySelectorAll('.operator');
    btnOperators.forEach ((btn) =>{
        btn.addEventListener('click', function(e) {
            storeNumber();
            if (firstNumber !== null && secondNumber !== null) {
                let result = calculate(operator, firstNumber, secondNumber);
                showResult(result);
                firstNumber = result;
                secondNumber = null;
                displayCount = true;
            } else {
                clearDisplay();
            };
            operator = storeOperator(e); 
        });
    });
};

function storeNumber() {
    const display = document.querySelector('.textField');
    if (firstNumber === null) {
        firstNumber = Number(display.textContent);
    } else {
        secondNumber = Number(display.textContent);
    };
};

function storeOperator (e) {
    const operator = e.target.textContent;
    return operator;
};

function calculate(operator, first, second) {
    switch (operator) {
        case '+':
            result = add(first, second);
            break;
        case '-':
            result = subtract(first, second);
            break;
        case 'x':
            result = multiply(first, second);
            break;
        case '/':
            if (second == 0) {
                alert('ERROR: Division by zero is not possible!');
                firstNumber = null;
                secondNumber = null;
                displayCount = false;
                operator = '';
                clearDisplay();
                result = '';
            } else {
                result = divide(first, second);
            };
            break;
    };
    return result;
};

function showResult (result) {
    const display = document.querySelector('.textField');
    display.textContent = result;
}

function add(a, b) {
    return (a+b);
};

function subtract(a, b) {
    return (a-b);
};

function multiply(a, b) {
    return (a*b);
};

function divide(a, b) {
    return (a/b);
};

function clearDisplay () {
    const display = document.querySelector('.textField');
    display.textContent = '';
};

function addClickEventToBack () {
    const btnBack = document.querySelector('.back');
    btnBack.addEventListener('click', () => {
        const display = document.querySelector('.textField');
        display.textContent = display.textContent.slice(0, -1);
    });
};

function addClickEventToClear () {
    const btnClear = document.querySelector('.clear');
    btnClear.addEventListener('click', () => {
        firstNumber = null;
        secondNumber = null;
        displayCount = false;
        operator = '';
        clearDisplay();
    });
};

function addClickEventToResult () {
    const btnResult = document.querySelector('.result');
    btnResult.addEventListener('click', () => {
        if (firstNumber == null || secondNumber == null) {
            alert('ERROR: Not enough arguments. Please enter your equation again.');
            firstNumber = null;
            secondNumber = null;
            displayCount = false;
            operator = '';
            clearDisplay();
        } else {
            storeNumber();
            let result = calculate(operator, firstNumber, secondNumber);
            showResult(result);
            firstNumber = null;
            secondNumber = null;
            displayCount = true;
        };
    });
};

function addClickEventToPercent () {
    const btnPercent = document.querySelector('.percent');
    btnPercent.addEventListener('click', () => {
        const display = document.querySelector('.textField');
        display.textContent = (Number(display.textContent) / 100);
    });
};