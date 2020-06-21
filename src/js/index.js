import "../scss/main.scss";

// uncomment the lines below to enable PWA
// import { registerSW } from './pwa.js';
// registerSW();

/* place your code below */

const addButton = document.querySelector(".clients__button--add-js");
const removeButton = document.querySelector(".clients__button--remove-js");
const counterHtmlElement = document.querySelector(".clients__counter--js");
const messageHtmlElement = document.querySelector(".clients__message--js");
const progressBar = document.querySelector(".clients__bar--progress");

let counter = 0;
const maxClients = 15;
let message = "";

const handleChangeClientCounter = (changes) => {
  if (changes === "add") {
    if (counter >= maxClients) {
      message = "Maksymalna ilość klientów!";
    } else {
      counter++;
      message = "";
    }
  } else {
    if (counter <= 0) {
      message = "Brak klientów na sklepie";
    } else {
      counter--;
      message = "";
    }
  }
  showClients();
};

const showClients = () => {
  counterHtmlElement.innerHTML = counter;
  messageHtmlElement.innerHTML = message;
  const size = (counter / maxClients) * 100;
  progressBar.style.width = `${size}%`;
  if (size <= 70) {
    progressBar.style.background = "#3F784C";
  } else if (size > 70 && size <= 99) {
    progressBar.style.background = "#C17817";
  } else {
    progressBar.style.background = "#B20D30";
  }
};

addButton.addEventListener("click", () => {
  handleChangeClientCounter("add");
  addButton.classList.toggle("clients__button--active");

  setTimeout(() => addButton.classList.toggle("clients__button--active"), 200);
});

removeButton.addEventListener("click", () => {
  handleChangeClientCounter("remove");
  removeButton.classList.toggle("clients__button--active");
  setTimeout(() => removeButton.classList.toggle("clients__button--active"), 200);
});

// console.log('HELLO 🚀')
