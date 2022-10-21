const rootElement = document.body;
// default style dark mode -- see theme.css
// rootElement.classList.toggle('lightMode'); -- how to change theme

let currentOperator = null;
let accumulator = 3999813; //the raw tracking of the results
//display may have a different value in the case of sci notation.
let prevNum;

commaSeparate(accumulator);

const display = document.getElementById('display');
const keypad = document.getElementById('keypad');

display.innerText = commaSeparate(accumulator);

keypad.addEventListener('click', (event) => {
  const { id } = event.target;

  if (!id) return;

  if (isNumber(id)) {
    accumulator = Number(accumulator + id);
    display.innerText = commaSeparate(accumulator);
  } else if (isOperator(id)) {
    operators(id);
  } else if (id === '=') {
    console.log('equals');
    equals();
  } else if (id === 'delete') {
    console.log('delete');
  } else if (id === '.') {
    //decimal
    console.log('decimal');
  } else {
    console.log('reset');
    //reset
  }
});

//-------------operators---------------------------------------------//

function operators(sign) {
  prevNum = accumulator;
  if (sign === '+') {
    currentOperator = '+';
    display.innerText = commaSeparate(accumulator);
    accumulator = 0;
  } else if (sign === '-') {
    currentOperator = '-';
  } else if (sign === '*') {
    currentOperator = '*';
  } else {
    currentOperator = '/';
  }
}

//------------ equals -----------------------------------------------//

function equals() {
  switch (currentOperator) {
    case '+':
      console.log(accumulator);
      accumulator += Number(prevNum);
      console.log(accumulator);

      display.innerText = commaSeparate(accumulator);
      prevNum = 0;
      break;
    case '-':
      // code block
      break;
    case '*':
      // code block
      break;
    case '/':
      // code block
      break;
    default:
    //no current
  }
}

//------------ helpers ----------------------------------------------//

function commaSeparate(number) {
  const numberStr = String(number);
  let resultStr = '';

  for (let i = numberStr.length - 1, k = i; i >= 0; i--) {
    if ((k - i) % 3 === 0 && i !== k) {
      resultStr = ',' + resultStr;
    }
    resultStr = numberStr[i] + resultStr;
  }

  return resultStr;
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
