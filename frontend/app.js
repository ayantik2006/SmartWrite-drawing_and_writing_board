const blackBox = document.getElementById("black-ink");
const redBox = document.getElementById("red-ink");
const blueBox = document.getElementById("blue-ink");
const greenBox = document.getElementById("green-ink");
const thicknessIndicator = document.querySelector("#ink-width div");
const penWidthInput = document.querySelector("#ink-width input");
const eraser = document.getElementById("eraser");

thicknessIndicator.style.backgroundColor =
  localStorage.getItem("inkColor") || "black";

if (localStorage.getItem("inkColor")) {
  switch (localStorage.getItem("inkColor")) {
    case "black":
      blackBox.innerHTML = '<i class="fa-solid fa-check"></i>';
      break;
    case "red":
      redBox.innerHTML = '<i class="fa-solid fa-check"></i>';
      break;
    case "blue":
      blueBox.innerHTML = '<i class="fa-solid fa-check"></i>';
      break;
    case "green":
      greenBox.innerHTML = '<i class="fa-solid fa-check"></i>';
      break;
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function fixDPR() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
fixDPR();

let startX, startY;
let isDrawing = false;
let isErasing = false;
let inkColor = localStorage.getItem("inkColor") || "black";
let penWidth = 3;

canvas.addEventListener("mousedown", (e) => {
  const rect = canvas.getBoundingClientRect();
  startX = e.clientX - rect.left;
  startY = e.clientY - rect.top;
  isDrawing = true;
});
function draw(startX, startY, endX, endY, inkColor, penWidth) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = inkColor;
  ctx.lineWidth = penWidth;
  ctx.stroke();
}

function erase(startX, startY, endX, endY, inkColor, penWidth){
    ctx.beginPath();
ctx.moveTo(startX, startY);
ctx.lineTo(endX, endY);
ctx.globalCompositeOperation = "destination-out"; // makes it erase
ctx.lineWidth = 16;
ctx.stroke();
ctx.globalCompositeOperation = "source-over";
}

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  
  const rect = canvas.getBoundingClientRect();
  const endX = e.clientX - rect.left;
  const endY = e.clientY - rect.top;
  if(isErasing){
    erase(startX, startY, endX, endY, inkColor, penWidth);
    return
  }
  draw(startX, startY, endX, endY, inkColor, penWidth);

  startX = endX;
  startY = endY;
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
  
});

canvas.addEventListener("mouseleave", () => {
  isDrawing = false;
});

blackBox.addEventListener("click", () => {
  inkColor = "black";
  blackBox.innerHTML = '<i class="fa-solid fa-check"></i>';
  redBox.innerHTML = "";
  blueBox.innerHTML = "";
  greenBox.innerHTML = "";
  localStorage.setItem("inkColor", "black");
  thicknessIndicator.style.backgroundColor = "black";
});
redBox.addEventListener("click", () => {
  inkColor = "red";
  redBox.innerHTML = '<i class="fa-solid fa-check"></i>';
  blackBox.innerHTML = "";
  blueBox.innerHTML = "";
  greenBox.innerHTML = "";
  localStorage.setItem("inkColor", "red");
  thicknessIndicator.style.backgroundColor = "red";
});
blueBox.addEventListener("click", () => {
  inkColor = "blue";
  blueBox.innerHTML = '<i class="fa-solid fa-check"></i>';
  blackBox.innerHTML = "";
  redBox.innerHTML = "";
  greenBox.innerHTML = "";
  localStorage.setItem("inkColor", "blue");
  thicknessIndicator.style.backgroundColor = "blue";
});
greenBox.addEventListener("click", () => {
  inkColor = "green";
  greenBox.innerHTML = '<i class="fa-solid fa-check"></i>';
  blackBox.innerHTML = "";
  redBox.innerHTML = "";
  blueBox.innerHTML = "";
  localStorage.setItem("inkColor", "green");
  thicknessIndicator.style.backgroundColor = "green";
});

penWidthInput.addEventListener("input", (e) => {
  penWidth = e.target.value;
  thicknessIndicator.style.height = e.target.value + "px";
});

eraser.addEventListener("click", () => {
  if (!isErasing) {
    eraser.style.border = "0.3rem solid";
    eraser.style.boxShadow = "0 0 10px";
    isErasing=true;
  }
  else{
    eraser.style.border = "0rem solid";
    eraser.style.boxShadow = "0 0 0";
    isErasing=false;
  }
});
