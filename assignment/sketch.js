const BG_COLOR = '#212121ff';

// Orange grid settings
const TILE = 48;    // cell size
const AMP  = 36;    // vertical offset amount
const FREQ = 0.5;   // horizontal frequency
const PAD  = 6;     // inner padding
const ORANGE_PALETTE = ['#FFB84C','#FFA559','#FF8E3C','#FF7F3F','#FF9F45','#F4A261','#E67E22'];

let cols, rows, cellW, cellH;
let colorIndex = [];
let phaseRow   = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  rectMode(CENTER);
  initGrid();
  initOrangeData();
}

function draw() {
  background(BG_COLOR);
  drawOrangeBlocks();
}

function initGrid() {
  cols = max(6, floor(windowWidth / TILE));
  rows = max(4, floor(windowHeight / TILE));
  cellW = width / cols;
  cellH = height / rows;
}

function initOrangeData() {
  colorIndex = new Array(cols * rows);
  for (let i = 0; i < colorIndex.length; i++) {
    colorIndex[i] = floor(random(ORANGE_PALETTE.length)); // pick an orange
  }
  phaseRow = new Array(rows);
  for (let y = 0; y < rows; y++) {
    phaseRow[y] = random(TWO_PI); // per-row phase so rows look offset
  }
}

function drawOrangeBlocks() {
  for (let y = 0; y < rows; y++) {
    const rowPhase = phaseRow[y];
    for (let x = 0; x < cols; x++) {
      const i  = y * cols + x;
      const cx = x * cellW + cellW / 2;
      const cy = y * cellH + cellH / 2;
      const waveY = AMP * sin(x * FREQ + rowPhase);
      fill(ORANGE_PALETTE[colorIndex[i]]);
      rect(cx, cy + waveY, cellW - PAD, cellH - PAD, 6);
    }
  }
}

//window resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
