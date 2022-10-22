const rootElement = document.body;
// default style dark mode -- see theme.css
// rootElement.classList.toggle('lightMode'); -- how to change theme

//------------------ global vars -----------------------------------//

let currentOperator = null;
let userInput = '0';
let prevNum = null;
let res = null;
let isResultDisplayed = false;
let isOperatorSel = false;

const display = document.getElementById('display');
const keypad = document.getElementById('keypad');

display.innerText = commaSeparate(userInput);

//------------ event listeners ------------------------------------//

keypad.addEventListener('click', (event) => {
  const { id } = event.target;

  if (!id) return;

  if (isNumber(id)) {
    handleNumber(id);
  } else if (isOperator(id)) {
    handleOperator(id);
  } else if (id === '=') {
    handleEquals(id);
  } else if (id === 'delete') {
    console.log('delete');
  } else if (id === '.') {
    handleDecimal(id);
  } else if (id === 'reset') {
    resetCalcMemory(id);
    updateDisplay(userInput);
  }
});

//------------- handlers ------------------------------------------//

function handleEquals(id) {
  if (currentOperator === null) return;

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

  const num = res.toFixed(9); //need to truncate it to stay out of scientific notation for as long as possible

  isResultDisplayed = true;

  updateDisplay(String(num));
}

//-----------------------------------------------------------------//

function handleDecimal() {
  if (!userInput.includes('.')) {
    if (isResultDisplayed && !isOperatorSel) {
      resetCalcMemory();
      userInput = '0.';
    } else {
      userInput += '.';
    }
  }
}

//-----------------------------------------------------------------//

function handleOperator(id) {
  currentOperator = id;
  if (!isOperatorSel) {
    prevNum = userInput;
    userInput = '0';
    isOperatorSel = true;
  }
}

//-----------------------------------------------------------------//

function handleNumber(id) {
  if (
    (isResultDisplayed && !isOperatorSel) ||
    res === Infinity ||
    res === -Infinity
  ) {
    resetCalcMemory();
  }
  userInput = userInput + id;
  updateDisplay(userInput);
}

//------------ helpers ----------------------------------------------//

function commaSeparate(str) {
  const minimumFractionDigits = res === null ? decimalPointCount(str) : 0;

  str = Number(str).toLocaleString('en-US', {
    minimumFractionDigits,
    maximumFractionDigits: 20, //starts screwing up past 20 digits, so i limit display to 17
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
  const formattedDisplayVal = commaSeparate(String(acc));
  display.innerText = formattedDisplayVal;
  if (
    isOverflowing(display) ||
    decimalPointCount(formattedDisplayVal) >= 17 //due to toLocaleString limitations
  ) {
    display.innerText = Number(acc).toExponential(6);
  }

  if (display.innerText === '-0') {
    display.innerText = '0';
  }
}

//------------------------------------------------------------------//

function decimalPointCount(str) {
  let startCount = false;
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (startCount) count++;
    if (str[i] === '.') startCount = true;
  }
  return count;
}

//--------------- reset --------------------------------------------//

function resetCalcMemory() {
  isResultDisplayed = false;
  currentOperator = null;
  userInput = '0';
  prevNum = null;
  res = null;
}

//-------------------overflow ------------------------------------------//

function isOverflowing(element) {
  //used to send display numbers to scientific notation on overflow of div
  return 0 > element.clientWidth - element.scrollWidth ? true : false;
}
