let names = [];
let addNames = document.getElementById("addNames");
let wheel = document.getElementById("wheel");
let spinAngle = 0;

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getContrastingTextColor(hexColor) {
  var r = parseInt(hexColor.substr(1, 2), 16);
  var g = parseInt(hexColor.substr(3, 2), 16);
  var b = parseInt(hexColor.substr(5, 2), 16);
  var luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

function updateNames() {
  names = addNames.value.split("\n").filter((name) => name.trim() !== "");
  let stepAngle = 360 / names.length;
  let clipPathValue = 50 * Math.tan(((stepAngle / 2) * Math.PI) / 180);
  let bottomLeftX = 50 - clipPathValue;
  let bottomRightX = 50 + clipPathValue;
  wheel.innerHTML = "";
  names.forEach((name, i) => {
    let segment = document.createElement("div");
    segment.className = "segment";
    segment.style.transform = `rotate(${stepAngle * i}deg)`;
    let innerDiv = document.createElement("div");

    if (names.length > 1) {
      if (names.length == 2) {
        innerDiv.style.clipPath = "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)";
      } else {
        innerDiv.style.clipPath = `polygon(50% 50%, ${bottomLeftX}% 100%, ${bottomRightX}% 100%)`;
      }
    }

    let color = getRandomColor();
    innerDiv.style.backgroundColor = color;
    let span = document.createElement("span");
    span.style.color = getContrastingTextColor(color);
    span.textContent = name;
    innerDiv.appendChild(span);
    segment.appendChild(innerDiv);
    wheel.appendChild(segment);
  });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function executeAfterWait() {
  console.log("Waiting for 4 seconds...");
  if (names.length > 0) await wait(4000);
  let myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {
    keyboard: false,
  });
  myModal.show();
}

function spin() {
  let randomDegree = Math.floor(Math.random() * 360);
  randomDegree = parseInt(randomDegree, 10);
  // spinAngle += randomDegree;
  // wheel.style.transform = `rotate(${
  //   270 - 360 / (names.length * 2) + randomDegree
  // }deg)`;
  wheel.style.transition = "transform 4s ease-out";
  let rotateDegree = 270 - 360 / (names.length * 2) + 720 + randomDegree;
  wheel.style.transform = `rotate(${rotateDegree}deg)`;
  let winner = Math.floor(randomDegree / 360);
  winner = randomDegree - winner * 360;
  winner = Math.floor(winner / (360 / names.length));
  winner = names.length - winner;
  if (winner === names.length) winner = 0;
  console.log(winner);
  console.log(names[winner]);
  let modalBody = document.querySelector(".modal-body");
  if (names.length === 0) {
    modalBody.innerText = `No name available.`;
  } else {
    modalBody.innerText = `The winner is ${names[winner]}!`;
  }
  executeAfterWait();
}

let myModal = document.getElementById("exampleModal");
myModal.addEventListener("hidden.bs.modal", function () {
  wheel.style.transition = "";
  wheel.style.transform = `rotate(0deg)`;
});

addNames.addEventListener("input", updateNames);
