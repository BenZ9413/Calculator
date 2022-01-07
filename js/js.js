/*Besonderheiten noch zu programmieren
- Beginn mit negativer Zahl
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
    addKeyboardSupport();
};

function addClickEventToNumbers() {
    const btnNumbers = document.querySelectorAll('.number');
    btnNumbers.forEach ((btn) => {
        btn.addEventListener('click', function (e) {
            if (displayCount) {
                clearDisplay();
                displayCount = false;
            };
            checkIfDoubleDotAndDisplayTextOnScreen(e);
        });
    });
};

function addKeyboardSupport() {
    document.addEventListener('keydown', function (e) {
        if (displayCount) {
            clearDisplay();
            displayCount = false;
        };
        if (e.key >= 0 && e.key <= 9) {
            console.log('number');
        } else if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/") {
            console.log('operator');
        } else if (e.key == ".") {
            console.log('dot');
        } else if (e.key == "%") {
            console.log('%');
        } else if (e.key == "Backspace") {
            console.log('back');
        } else if (e.key == "c") {
            resetCalculator();
        } else if (e.key == '=') {
            showResultFunction();
        };
        // checkIfDoubleDotAndDisplayTextOnScreen(e);
    });
};

function displayTextOnScreen (e) {
    const display = document.querySelector('.textField');
    const actualDisplayText = display.textContent;
    display.textContent = actualDisplayText + e.target.textContent;
};

function checkIfDoubleDotAndDisplayTextOnScreen (e) {
    const display = document.querySelector('.textField');
    if (display.textContent.split('').includes('.') && e.target.textContent == '.') {
        alert('Don\'t be too picky.');
    } else {
        displayTextOnScreen(e);
    };
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
    btnClear.addEventListener('click', resetCalculator);
};

function resetCalculator () {
    firstNumber = null;
    secondNumber = null;
    displayCount = false;
    operator = '';
    clearDisplay();
};

function addClickEventToResult () {
    const btnResult = document.querySelector('.result');
    btnResult.addEventListener('click', showResultFunction);
};

function showResultFunction () {
    storeNumber();
    if (firstNumber == null || secondNumber == null) {
        alert('ERROR: Not enough arguments. Please enter your equation again.');
        firstNumber = null;
        secondNumber = null;
        displayCount = false;
        operator = '';
        clearDisplay();
    } else {
        let result = calculate(operator, firstNumber, secondNumber);
        showResult(result);
        firstNumber = null;
        secondNumber = null;
        displayCount = true;
    };
};

function addClickEventToPercent () {
    const btnPercent = document.querySelector('.percent');
    btnPercent.addEventListener('click', () => {
        const display = document.querySelector('.textField');
        display.textContent = (Number(display.textContent) / 100);
    });
};