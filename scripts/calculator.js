const rootElement = document.body;
// default style dark mode -- see theme.css
// rootElement.classList.toggle('lightMode'); -- how to change theme

//focus slider on label click
document
  .getElementById('tri-state-mode-display')
  .addEventListener('click', () => {
    document.getElementById('tri-state-slider').focus();
  });
