/*Besonderheiten noch zu programmieren
- Beginn mit negativer Zahl
- Ergebnistaste drücken, wenn zuletzt ein Operator gewählt wurde
- Wie geht es nach Ergebnis anzeigen weiter??
*/

// Code which is run after loading the page
const listOfClickedNumbers = [];
const listOfClickedOperators = [];
let lastClicked = '';
setupCalculator();

// create clickEvents to Buttons
function setupCalculator() {
    const btnNumbers = document.querySelectorAll('.number');
    const btnOperators = document.querySelectorAll('.operator');

    btnNumbers.forEach ((btn) => {
        btn.addEventListener('click', function (e) {
            displayTextOnScreen(e);
            lastClicked = 'number';
        });
    });

    btnOperators.forEach ((btn) =>{
        btn.addEventListener('click', function(e) {
            saveClickedButtonAsNumber();
            saveClickedOperator(e);
        });
    });

    const btnClear = document.querySelector('.clear');
    btnClear.addEventListener('click', resetCalculator);

    const btnBack = document.querySelector('.back');
    btnBack.addEventListener('click', deleteLastClicked);

    const btnResult = document.querySelector('.result');
    btnResult.addEventListener('click', calculateAndShowResult);

    return;
};

// Calculate and show the result
function calculateAndShowResult () {
    saveClickedButtonAsNumber();
    let indexListOperators = 0;
    const result = listOfClickedNumbers.reduce((total, number) => {
        switch (listOfClickedOperators[indexListOperators]) {
            case '+':
                total = add(total, number);
                break;
            case '-':
                total = subtract(total, number);
                break;
            case 'x':
                total = multiply(total, number);
                break;
            case '/':
                total = divide(total, number);
                break;
        };
        indexListOperators++;
        return total;
    });
    const display = document.querySelector('.textField');
    display.textContent = result;

    const btnAll = document.querySelectorAll('button');
    btnAll.forEach((button) => {
        button.addEventListener('click', completelyResetCalculator);
    });
};

// add the numbers
function add(a, b) {
    return (a+b);
};

// subtract the numbers
function subtract(a, b) {
    return (a-b);
};

// multiply the numbers
function multiply(a, b) {
    return (a*b);
};

// divide the numbers 
function divide(a, b) {
    return (a/b);
};

// delete the last clicked value
function deleteLastClicked () {
    const display = document.querySelector('.textField');
    if (lastClicked == 'operator') {
        display.textContent = listOfClickedNumbers[listOfClickedNumbers.length - 1];
        listOfClickedNumbers.pop();
        listOfClickedOperators.pop();
        lastClicked = 'number';
    } else if (lastClicked == 'number' && display.textContent == '') {
        display.textContent = listOfClickedNumbers[listOfClickedNumbers.length - 1];
        listOfClickedNumbers.pop();
        listOfClickedOperators.pop();
    } else {
        display.textContent = display.textContent.slice(0, -1);
    };
};

// clear the screen and reset the arrays
function resetCalculator() {
    const clearedDisplay = document.querySelector('.textField');
    clearedDisplay.textContent = '';
    while (listOfClickedNumbers.length > 0) {
        listOfClickedNumbers.shift();
    };
    while (listOfClickedOperators.length > 0) {
        listOfClickedOperators.shift();
    };
    return;
};

// save the value of the clicked button to perform operations on it later on
function saveClickedButtonAsNumber () {
    const display = document.querySelector('.textField');
    listOfClickedNumbers.push(Number(display.textContent));
    return;
};

// save the clicked operator to perform operations on it later on and clear the display
function saveClickedOperator (e) {
    listOfClickedOperators.push(e.target.textContent);
    const display = document.querySelector('.textField');
    display.textContent = '';
    lastClicked = 'operator';
    return;
};

// display the clicked button on the screen
function displayTextOnScreen (e) {
    const display = document.querySelector('.textField');
    const actualDisplayText = display.textContent;
    display.textContent = actualDisplayText + e.target.textContent;
    return;
};

function completelyResetCalculator() {
    // remove click-event so there isn't any more resets
    const btnAll = document.querySelectorAll('button');
    btnAll.forEach((button) => {
        button.removeEventListener('click', completelyResetCalculator);
    });
    // reset the saved Lists and clear the screen
    resetCalculator();
};