let firstNumber = null;
let secondNumber = null;
let operator = '';
let displayCount = false;
let eventType = '';
setupCalculator();

function setupCalculator() {
    addKeyboardSupport();
    addClickEventToNumbers();
    addClickEventToOperators();
    addClickEventToBack();
    addClickEventToClear();
    addClickEventToResult();
    addClickEventToPercent();
};

function addKeyboardSupport() {
    document.addEventListener('keydown', function (e) {
        if (e.key >= 0 && e.key <= 9) {
            if (displayCount) {
                clearDisplay();
                displayCount = false;
            };
            displayTextOnScreen(e);
        } else if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/") {
            operate(e);
            storeOperator(e);
        } else if (e.key == ".") {
            if (displayCount) {
                clearDisplay();
                displayCount = false;
            };
            checkIfDoubleDotAndDisplayTextOnScreen(e);
        } else if (e.key == "%") {
            convertToPercent();
        } else if (e.key == "Backspace") {
            backspace();
        } else if (e.key == "c") {
            resetCalculator();
        } else if (e.key == '=') {
            showResultFunction();
        };
    });
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

function displayTextOnScreen (e) {
    const display = document.querySelector('.textField');
    const actualDisplayText = display.textContent;
    switch (e.type) {
        case 'keydown':
            display.textContent = actualDisplayText + e.key;
            break;
        case 'click':
            display.textContent = actualDisplayText + e.target.textContent;
            break;
    };
};

function checkIfDoubleDotAndDisplayTextOnScreen (e) {
    const display = document.querySelector('.textField');
    let dot = '';
    switch (e.type) {
        case 'keydown':
            dot = e.key;
            break;
        case 'click':
            dot = e.target.textContent;
            break;
    };
    if (display.textContent.split('').includes('.') && dot == '.') {
        alert('Don\'t be too picky.');
    } else {
        displayTextOnScreen(e);
    };
};

function addClickEventToOperators() {
    const btnOperators = document.querySelectorAll('.operator');
    btnOperators.forEach ((btn) =>{
        btn.addEventListener('click', function(e) {
            operate(e);
            storeOperator(e); 
        });
    });
};

function operate (e) {
    const display = document.querySelector('.textField');
    let content = '';
    switch (e.type) {
        case 'keydown':
            content = e.key;
            break;
        case 'click':
            content = e.target.textContent;
            break;
    };
    if (content == '-' && (display.textContent == ''|| (displayCount == true && operator !== ''))) {
        clearDisplay();
        displayTextOnScreen(e);
        displayCount = false;
    } else {
        if (display.textContent !== '-') {
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
        };
    };
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
    const display = document.querySelector('.textField');
    if (display.textContent !== '-') {
        switch (e.type) {
            case 'keydown':
                operator = e.key;
                break;
            case 'click':
                operator = e.target.textContent;
                break;
        };
    };
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
        case '*':
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
    btnBack.addEventListener('click', backspace);
};

function backspace () {
    const display = document.querySelector('.textField');
    display.textContent = display.textContent.slice(0, -1);
};

function addClickEventToClear () {
    const btnClear = document.querySelector('.clear');
    btnClear.addEventListener('click', resetCalculator);
};

function resetCalculator () {
    firstNumber = null;
    secondNumber = null;
    operator = '';
    displayCount = false;
    eventType = '';
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
        resetCalculator();
    } else {
        let result = calculate(operator, firstNumber, secondNumber);
        showResult(result);
        firstNumber = null;
        secondNumber = null;
        operator = '';
        eventType = '';
        displayCount = true;
    };
};

function addClickEventToPercent () {
    const btnPercent = document.querySelector('.percent');
    btnPercent.addEventListener('click', convertToPercent);
};

function convertToPercent () {
    const display = document.querySelector('.textField');
    display.textContent = (Number(display.textContent) / 100);
};