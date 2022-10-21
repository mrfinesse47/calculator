const rootElement = document.body;
// default style dark mode -- see theme.css
// rootElement.classList.toggle('lightMode'); -- how to change theme

const MAX_DIGITS = 12;

let currentOperator = null;
let userInput = '0';
let prevNum = null;
let res = null;
let isResultDisplayed = false;
let isOperatorSel = false;

commaSeparate(userInput);

const display = document.getElementById('display');
const keypad = document.getElementById('keypad');

display.innerText = commaSeparate(userInput);

keypad.addEventListener('click', (event) => {
  const { id } = event.target;

  if (!id) return;

  if (isNumber(id)) {
    if (isResultDisplayed && !isOperatorSel) {
      resetCalc();
    }
    userInput = userInput + id;

    updateDisplay(userInput);
  } else if (isOperator(id)) {
    isOperatorSel = true;
    currentOperator = id;
    prevNum = userInput;
    userInput = '0';
  } else if (id === '=') {
    isOperatorSel = false;

    if (res !== null) {
      prevNum = res;
    }
    if (currentOperator === '+') {
      res = Number(prevNum) + Number(userInput);
    } else if (currentOperator === '-') {
      res = Number(prevNum) - Number(userInput);
    } else if (currentOperator === '/') {
      res = Number(prevNum) / Number(userInput);
    } else if (currentOperator === '*') {
      res = Number(prevNum) * Number(userInput);
    }
    isResultDisplayed = true;
    updateDisplay(String(res));

    //if not a number its some kind of error
  } else if (id === 'delete') {
    console.log('delete');
  } else if (id === '.') {
    //decimal
    //need to check if string already has decimal or not if not add
    console.log('decimal');
  } else {
    console.log('reset');
    //reset
  }
});

//------------ helpers ----------------------------------------------//

function commaSeparate(str) {
  str = Number(str).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 9,
  });
  return String(str);
}

// determine symbol type functions -----------------------------------//

function isOperator(symbol) {
  if (symbol === '+' || symbol === '*' || symbol === '/' || symbol === '-')
    return true;

  return false;
}

function isNumber(symbol) {
  if (symbol >= 0 && symbol <= 9) return true;
  return false;
}

function updateDisplay(acc) {
  if (acc.length > MAX_DIGITS) {
    display.innerText = Number(acc).toExponential(3);
  } else {
    display.innerText = commaSeparate(String(acc));
  }
}

function resetCalc() {
  isResultDisplayed = false;
  currentOperator = null;
  userInput = '0';
  prevNum = null;
  res = null;
}
