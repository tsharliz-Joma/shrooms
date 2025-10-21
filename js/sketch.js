let m;
let r;
let d;
let shrooms = [];
let num = 4000;
const canvasDiv = document.getElementById("canvasOne");

function setup() {
  createCanvas(windowWidth, windowHeight);
  // canvasOne.parent(canvasDiv)
  d = pixelDensity();
  angleMode(DEGREES);
  for (let i = 0; i < num; i++) {
    shrooms[i] = new Shroom();
  }
}

function draw() {
  background(0, 5);
  loadPixels();
  for (let i = 0; i < num; i++) {
    shrooms[i].update();
    shrooms[i].display();
  }
}
