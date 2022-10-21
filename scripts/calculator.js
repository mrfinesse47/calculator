const rootElement = document.body;
// default style dark mode -- see theme.css
// rootElement.classList.toggle('lightMode'); -- how to change theme

let currentOperator = null;
let accumulator = '10'; //the raw tracking of the results
//display may have a different value in the case of sci notation.
let isAnswerMode = false;
let prevNum;

commaSeparate(accumulator);

const display = document.getElementById('display');
const keypad = document.getElementById('keypad');

display.innerText = commaSeparate(accumulator);

keypad.addEventListener('click', (event) => {
  const { id } = event.target;

  if (!id) return;

  if (isNumber(id)) {
    accumulator = accumulator + id;
    display.innerText = commaSeparate(accumulator);
  } else if (isOperator(id)) {
    currentOperator = id;
    prevNum = accumulator;
    accumulator = '0';
    display.innerText = commaSeparate(accumulator);
  } else if (id === '=') {
    const res = eval(`${prevNum} ${currentOperator} ${accumulator}`);
    if (typeof res === 'number') {
      accumulator = String(res);
      display.innerText = commaSeparate(String(res));
    }
    //if not a number its some kind of error
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

//------------ helpers ----------------------------------------------//

function commaSeparate(str) {
  str = Number(str).toLocaleString();
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
