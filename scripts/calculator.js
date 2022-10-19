const rootElement = document.body;
// default style dark mode -- see theme.css
// rootElement.classList.toggle('lightMode'); -- how to change theme

//focus slider on label click
document
  .getElementById('tri-state-mode-display')
  .addEventListener('click', () => {
    document.getElementById('tri-state-slider').focus();
  });

const display = document.getElementById('display');
const keypad = document.getElementById('keypad');

keypad.addEventListener('click', (event) => {
  const { id } = event.target;
  display.innerText = id; // a strategy
});
