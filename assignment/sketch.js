const BG_COLOR = '#212121ff';

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  rectMode(CENTER);
}

function draw() {
  background(BG_COLOR);
}
//window resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
