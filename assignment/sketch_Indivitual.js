let img;
let clickCount = 0;

function preload() {
  img = loadImage("assets/scream_collage.png"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  drawOrangesky();
  drawWater();
  drawBridge();
  drawBGPeople();
  drawScreamImage();
  drawAnxietyLayer()
}

function drawOrangesky() {
  const skyH = height * 0.4; // sky band height 

  const GRID_SIZE = 40; // grid size
  const AMP = 36; // wave amplitude
  const FREQ = 0.5;
  const PAD = 6; // inner padding around each rect
  const ORANGE = [
    '#FFB84C', '#FFA559', '#FF8E3C', '#FF7F3F', '#FF9F45', '#F4A261', '#E67E22'
  ];

  const cols = max(6, floor(width / GRID_SIZE));
  const rows = max(3, floor(skyH / GRID_SIZE));
  const cellW = width / cols;
  const cellH = skyH / rows;

  noStroke();
  rectMode(CENTER);

  for (let gy = 0; gy < rows; gy++) {
    const rowPhase = gy * 0.9; // slightly offsetting each row’s wave phase
    for (let gx = 0; gx < cols; gx++) {
      const cx = gx * cellW + cellW / 2;
      const cy = gy * cellH + cellH / 2;
      const waveY = AMP * sin(gx * FREQ + rowPhase);
      const col = ORANGE[(gx + gy) % ORANGE.length];
      fill(col);
      rect(cx, cy + waveY, cellW - PAD, cellH - PAD, 6);
    }
  }
}

function drawWater() {
    // Dark swirling blues and purples
  for (let i = height * 0.6; i < height * 0.75; i += 12) {
    let wave = sin(i * 0.1) * 40;
    let wave2 = cos(i * 0.15) * 30;
    // More color variation
    let r = 20 + sin(i * 0.2) * 10;
    let g = 30 + i * 0.3 + cos(i * 0.25) * 15;
    let b = 60 + i * 0.2 + sin(i * 0.3) * 20;
    fill(r, g, b, 160);
    noStroke();
    // Draw wavy water using rectangles
    for (let x = 0; x < width; x += 3) {
      let y = i + sin(x * 0.02 + i * 0.1) * 25 + sin(x * 0.03 + i * 0.2) * 15 + cos(x * 0.015 + i * 0.12) * 10 + wave + wave2;
      rect(x, y, 3, height - y);
    }
  }
}

function drawBridge() {
  // Bridge from left middle to bottom middle
  let startX = 0;
  let startY = height *0.3;
  let endX = width * 0.8;
  let endY = height;
  
  // Calculate distance and angle
  let bridgeLength = dist(startX, startY, endX, endY);
  let angle = atan2(endY - startY, endX - startX);
  
  push();
  translate(startX, startY);
  rotate(angle);

  rectMode(CORNER);
  
   // Bridge surface
  fill(80, 40, 20, 300);
  noStroke();
  rect(10, 10, bridgeLength, 500);
  rect(-100, -50, bridgeLength + 300, 30);
  rect(-100, 50, bridgeLength + 300, 30);
  rect(-100, 150, bridgeLength + 300, 30);
  rect(-100, 250, bridgeLength + 300, 30);

  // Bridge railings
  stroke(100, 50, 30);
  strokeWeight(4);
  for (let x = 0; x < bridgeLength; x += 20) {
    line(x, 10, x, -20);
  }

  fill("white");
  rect(-100, 100, bridgeLength + 300, 30);
  rect(-100, 200, bridgeLength + 300, 30);
  rect(-100, -40, bridgeLength + 300, 10);
  
  pop();
}

function drawBGPeople() {
  fill(20, 30, 50);
  noStroke();

  // First person
  let fig1X = width * 0.1;
  let fig1Y = height * 0.5 + (height * 0.5) * 0.2;
  ellipse(fig1X, fig1Y, 40, 80);
  ellipse(fig1X, fig1Y - 40, 30, 40); 
  ellipse(fig1X, fig1Y - 45, 50, 10); 
  ellipse(fig1X - 8, fig1Y + 40, 10, 60); 
  ellipse(fig1X + 6, fig1Y + 40, 10, 60); 
  
  // Second person
  let fig2X = width * 0.05;
  let fig2Y = height * 0.5 + (height * 0.5) * 0.1;
  ellipse(fig2X, fig2Y, 35, 75);
  ellipse(fig2X, fig2Y - 35, 28, 38);
  ellipse(fig2X, fig2Y - 40, 48, 8);
  ellipse(fig2X - 5, fig2Y + 35, 8, 50);
  ellipse(fig2X + 5, fig2Y + 35, 8, 50);
}

function drawScreamImage() {// the image is nor work before, finding a method to check if the picture can be opened.
  if (!img) {
    console.log("Image not loaded");
    return;
  }

  console.log("Image loaded successfully");

  let shake = min(clickCount * 2, 50); //the biggest shaking:50px
  let dx = random(-shake, shake);
  let dy = random(-shake, shake);

  let aspectRatio = img.width / img.height;
  let newWidth = width * 0.6; 
  let newHeight = newWidth / aspectRatio;

  if (newHeight > height * 0.6) {
    newHeight = height * 0.6;
    newWidth = newHeight * aspectRatio;
  }

  let x = (width - newWidth) / 2; // Center the image horizontally
  let y = height - newHeight; // Position the image at the bottom

  image(img, x + dx, y + dy, newWidth, newHeight); 
}

function mousePressed() {
  clickCount++; 
}

function drawAnxietyLayer() {
  if (clickCount <= 0) {
    return; 
  }

  let intensity = min(clickCount * 10, 180); 

  push();
  noStroke();
  rectMode(CORNER);
  fill(255, 50, 50, intensity);
  rect(0, 0, width, height);
  pop();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
