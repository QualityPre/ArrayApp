"use strict";
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

/// Data Array

let data = [];

// Fetch user and add the money
const getRandomUser = async () => {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();

  // getting only the user data
  const user = data.results[0];
  //   console.log(user);

  // creating a new User object
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  console.log(newUser);

  // add the new user to the data array

  addData(newUser);
};

// Add a new user object to the data array

const addData = (obj) => {
  data.push(obj);
  renderDOM();
};

// rendering the DOM and filling with information
const renderDOM = (userData = data) => {
  // clear main

  main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;
  userData.forEach((person) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`;
    main.appendChild(element);
  });
};

// Doubling Money

function doubleMoney() {
  data = data.map((person) => {
    return { ...person, money: person.money * 2 };
  });
  renderDOM();
}

// Sort users by the richest

function sortMoney() {
  data.sort((a, b) => b.money - a.money);
  renderDOM();
}

function filterMoney() {
  data = data.filter((person) => person.money > 1000000);
  renderDOM();
}

function totalWealth() {
  const wealth = data.reduce((acc, person) => (acc += person.money), 0);

  const wealthElement = document.createElement("div");
  wealthElement.innerHTML = `<h3>Total Wealth:<strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthElement);
}

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortMoney);
showMillionairesBtn.addEventListener("click", filterMoney);
calculateWealthBtn.addEventListener("click", totalWealth);

// Format Money into pounds

const formatMoney = (number) => {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  });

  return formatter.format(number);
};
