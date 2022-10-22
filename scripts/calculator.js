const rootElement = document.body;
// default style dark mode -- see theme.css
// rootElement.classList.toggle('lightMode'); -- how to change theme

const MAX_DIGITS = 12;
const MAX_NUM = 10 ** (MAX_DIGITS - 1);
const MIN_NUM = 10 ** (MAX_DIGITS - 2) * -1; //has to be one less due to - sign taking up a space
const SMALL_NUM = 0.1 ** (MAX_DIGITS - 2); //one less due to decimal point

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
    if (
      (isResultDisplayed && !isOperatorSel) ||
      res === Infinity ||
      res === -Infinity
    ) {
      resetCalc();
    }
    userInput = userInput + id;

    updateDisplay(userInput);
  } else if (isOperator(id)) {
    currentOperator = id;
    if (!isOperatorSel) {
      prevNum = userInput;
      userInput = '0';
      isOperatorSel = true;
    }
  } else if (id === '=') {
    if (currentOperator === null) return;
    console.log('current operator', currentOperator);
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

    const digitsLeftOfDecimal = Math.floor(Math.log10(Math.abs(res))) + 1;

    // console.log('digits', digitsLeftOfDecimal);

    let truncateHowMuch = 12 - digitsLeftOfDecimal;
    if (truncateHowMuch <= 0) {
      truncateHowMuch = 0;
    }
    if (truncateHowMuch > 100) {
      truncateHowMuch = 100;
    }

    // console.log(truncateHowMuch);

    const num = res.toFixed(truncateHowMuch); //need to truncate it to the exact size of the screen of max digits

    console.log(num);
    isResultDisplayed = true;
    updateDisplay(String(num));

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

//------------- display -------------------------------------------//

function updateDisplay(acc) {
  if (
    acc >= MAX_NUM ||
    acc <= MIN_NUM ||
    (acc <= SMALL_NUM && acc > 0) ||
    (acc >= -1 * SMALL_NUM && acc < 0)
  ) {
    display.innerText = Number(acc).toExponential(3);
  } else {
    display.innerText = commaSeparate(String(acc));
  }
  if (display.innerText === '-0') {
    display.innerText = '0';
  }
}

//--------------- reset --------------------------------------------//

function resetCalc() {
  isResultDisplayed = false;
  currentOperator = null;
  userInput = '0';
  prevNum = null;
  res = null;
}
