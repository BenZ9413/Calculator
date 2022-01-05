// Code which is run after loading the page
const listOfClickedNumbers = [];
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
            displayTextOnScreen(e);
        });
    });
    return 
};

// save the value of the clicked button to perform operations on it later on
function saveClickedButtonAsNumber (e) {
    listOfClickedNumbers.push(Number(e.target.textContent));
    console.log(listOfClickedNumbers);
    return listOfClickedNumbers
}

// display the clicked button on the screen
function displayTextOnScreen (e) {
    const display = document.querySelector('.textField');
    const actualDisplayText = display.textContent;
    display.textContent = actualDisplayText + e.target.textContent;
    return
};