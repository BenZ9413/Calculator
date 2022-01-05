// Code which is run after loading the page
const listOfClickedNumbers = [];
const listOfClickedOperators = [];
setupCalculator();

// create clickEvents to Buttons
function setupCalculator() {
    const btnNumbers = document.querySelectorAll('.number');
    const btnOperators = document.querySelectorAll('.operator');

    btnNumbers.forEach ((btn) => {
        btn.addEventListener('click', function (e) {
            const clickedNumbers = saveClickedButtonAsNumber(e);
            displayTextOnScreen(e);
        });
    });

    btnOperators.forEach ((btn) =>{
        btn.addEventListener('click', function(e) {
            const clickedOperators = saveClickedOperator(e);
            displayTextOnScreen(e);
        });
    });
    return 
};

// save the value of the clicked button to perform operations on it later on
function saveClickedButtonAsNumber (e) {
    listOfClickedNumbers.push(Number(e.target.textContent));
    return listOfClickedNumbers;
};

// save the clicked operator to perform operations on it later on
function saveClickedOperator (e) {
    listOfClickedOperators.push(e.target.textContent);
    return listOfClickedOperators;
};

// display the clicked button on the screen
function displayTextOnScreen (e) {
    const display = document.querySelector('.textField');
    const actualDisplayText = display.textContent;
    display.textContent = actualDisplayText + e.target.textContent;
    return
};