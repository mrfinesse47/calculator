const rootElement = document.body;
// default style dark mode -- see theme.css
// rootElement.classList.toggle('lightMode'); -- how to change theme

let accumulator = 3999813; //the raw tracking of the results
//display may have a different value in the case of sci notation.

commaSeparate(accumulator);

const display = document.getElementById('display');
const keypad = document.getElementById('keypad');

display.innerText = commaSeparate(accumulator);

keypad.addEventListener('click', (event) => {
  const { id } = event.target;

  if (id >= 0 && id <= 9) {
    accumulator += Number(id);
    display.innerText = commaSeparate(accumulator);
  }
});

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
