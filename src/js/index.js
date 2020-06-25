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
const hamburgerButton = document.querySelector(".navigation__button--js");
const closeButton = document.querySelector(".asside__button--js");
const assideMenu = document.querySelector(".asside");
const maxClientsInput = document.querySelector(".asside__input--js");
const assideHistoryHTMLElement = document.querySelector(".asside__history");
const data = new Date().toISOString().slice(0, 10);

let maxClients = 10;
let counter = 0;
let message = "";
let clientsToday = 0;

if (localStorage.getItem("maxValue")) {
  maxClients = localStorage.getItem("maxValue");
  maxClientsInput.value = maxClients;
}

if (localStorage.getItem(data)) {
  clientsToday = localStorage.getItem(data);
}

maxClientsInput.addEventListener("change", () => {
  maxClients = maxClientsInput.value;
  localStorage.setItem("maxValue", maxClients);
});

const handleChangeClientCounter = (changes) => {
  if (changes === "add") {
    if (counter >= maxClients) {
      message = "Maksymalna ilość klientów!";
    } else {
      counter++;
      clientsToday++;
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
  localStorage.setItem(data, clientsToday);
};

const showClients = () => {
  counterHtmlElement.innerHTML = counter;
  messageHtmlElement.innerHTML = message;
  const size = (counter / maxClients) * 100;
  progressBar.style.width = `${size}%`;
  if (size <= 70) {
    progressBar.style.background = "rgb(63,120,76)";
    progressBar.style.background =
      "linear-gradient(180deg, rgba(63,120,76,1) 0%, rgba(98,182,117,1) 50%, rgba(63,120,76,1) 100%)";
  } else if (size > 70 && size <= 99) {
    progressBar.style.background = "rgb(193,120,23)";
    progressBar.style.background =
      "linear-gradient(180deg, rgba(193,120,23,1) 0%, rgba(251,191,110,1) 50%, rgba(193,120,23,1) 100%)";
  } else {
    progressBar.style.background = "rgb(178,13,48)";
    progressBar.style.background =
      "linear-gradient(180deg, rgba(178,13,48,1) 0%, rgba(249,46,89,1) 50%, rgba(178,13,48,1) 100%)";
  }
};

const getAllStorageItems = () => {
  const values = []
  const keys = Object.keys(localStorage);
  let i = keys.length;
  // console.log(keys);
  while (i--) {
    values.push({
      data: keys[i],
      value: localStorage.getItem(keys[i]),
    });
  }

  return values;
};

const showData = () => {
  const values = []
  const keys = Object.keys(localStorage);
  let i = keys.length;
  while (i--) {
    values.push({
      data: keys[i],
      value: localStorage.getItem(keys[i]),
    });
  }

  values.forEach(item => {
    assideHistoryHTMLElement.innerHTML = " ";
    if (item.data.length == 10) {
      const p = document.createElement('p');
      p.innerHTML = `${item.data}: odwiedziło ${item.value} klientów`;
      p.classList.add("asside__item");
      assideHistoryHTMLElement.appendChild(p);
    }
  })
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

hamburgerButton.addEventListener("click", () => {
  assideMenu.classList.toggle("asside--active");
  showData();
});

closeButton.addEventListener("click", () => {
  assideMenu.classList.toggle("asside--active");
});

// console.log('HELLO 🚀')
