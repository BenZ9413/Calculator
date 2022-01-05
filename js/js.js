setupCalculator();

// create clickEvents to Buttons
function setupCalculator() {
    const btnNumbers = document.querySelectorAll('.number');
    const btnOperators = document.querySelectorAll('.operator');

    btnNumbers.forEach ((btn) => {
        btn.addEventListener('click', function (e) {
            displayTextOnScreen(e);
        });
    });

    btnOperators.forEach ((btn) =>{
        btn.addEventListener('click', function(e) {
            displayTextOnScreen(e);
        });
    });
};

// display the clicked button on the screen
function displayTextOnScreen (e) {
    const display = document.querySelector('.textField');
    const actualDisplayText = display.textContent;
    display.textContent = actualDisplayText + e.target.textContent;
};