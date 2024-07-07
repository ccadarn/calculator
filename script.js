let currentDisplayValue = '0';
let firstOperand = null;
let operator = null;
let awaitingSecondOperand = false;

const display = document.getElementById('display');

// Function to update the display
function updateDisplay() {
  display.textContent = currentDisplayValue;
}

// Function to append a number to the display
function appendNumber(number) {
  if (awaitingSecondOperand) {
    currentDisplayValue = number;
    awaitingSecondOperand = false;
  } else {
    currentDisplayValue = currentDisplayValue === '0' ? number : currentDisplayValue + number;
  }
  updateDisplay();
}

// Function to append a decimal point to the display
function appendDecimal(dot) {
  if (awaitingSecondOperand) return;
  if (!currentDisplayValue.includes(dot)) {
    currentDisplayValue += dot;
  }
  updateDisplay();
}

// Function to handle operators
function setOperator(nextOperator) {
  const inputValue = parseFloat(currentDisplayValue);
  if (operator && awaitingSecondOperand) {
    operator = nextOperator;
    return;
  }
  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = operate(operator, firstOperand, inputValue);
    currentDisplayValue = `${parseFloat(result.toFixed(7))}`;
    firstOperand = result;
  }
  awaitingSecondOperand = true;
  operator = nextOperator;
  updateDisplay();
}

// Function to perform calculation
function calculate() {
  if (operator && !awaitingSecondOperand) {
    const inputValue = parseFloat(currentDisplayValue);
    const result = operate(operator, firstOperand, inputValue);
    currentDisplayValue = `${parseFloat(result.toFixed(7))}`;
    firstOperand = null;
    operator = null;
    awaitingSecondOperand = false;
    updateDisplay();
  }
}

// Function to clear the display
function clearDisplay() {
  currentDisplayValue = '0';
  firstOperand = null;
  operator = null;
  awaitingSecondOperand = false;
  updateDisplay();
}

// Function to perform operations
function operate(operator, num1, num2) {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num2 !== 0 ? num1 / num2 : NaN;
    default:
      return null;
  }
}

// Function to toggle night mode
const nightModeBtn = document.getElementById('night-mode-btn');
nightModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('night-mode');
});

// Initial display update
updateDisplay();