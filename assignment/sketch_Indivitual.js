//------let section-------------//
let img;
let clickCount = 0;
let bgImg;

let waterTexture;
let waterMask;
let maskedWater;
//------function section-------------------------//
function preload() {
   bgImg = loadImage("assets/background2.jpg");//backgroudn image(texture)
    img = loadImage("assets/scream_collage.png"); //the collage work fo the scream
    waterTexture = loadImage("assets/water.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  waterMask = createGraphics(width, height); 
}

function draw() {
    if (bgImg) {
    image(bgImg, 0, 0, width, height); 
  } else {
    background(0);
  }
// draw the layer one by one
drawOrangesky();
drawWater();
drawBridge();
drawBGPeople();
drawScreamImage();
drawAnxietyLayer();
drawAnxietyBar();

//the click input. Once the user didn't click, the laye effect decrease thourgh the time.
   if (clickCount > 0) {
    clickCount -= 0.05; //
  }
}

function drawOrangesky() {
  const skyH = height * 0.4; // sky band height 

  const GRID_SIZE = 40; // grid size
  const AMP = 36; // wave amplitude
  const FREQ = 0.5;
  const PAD = 6; // inner padding around each rect
  const ORANGE = [
    '#FFB84C', '#FFA559', '#FF8E3C', '#FF7F3F', '#FF9F45', '#F4A261', '#E67E22'
  ];// the orange color palette.

  const cols = max(6, floor(width / GRID_SIZE));
  const rows = max(3, floor(skyH / GRID_SIZE));
  const cellW = width / cols;
  const cellH = skyH / rows;

  noStroke();
  rectMode(CENTER);
//draw the grid
  for (let gy = 0; gy < rows; gy++) {
    const rowPhase = gy * 0.9; // slightly offsetting each row’s wave phase
    for (let gx = 0; gx < cols; gx++) {
      const cx = gx * cellW + cellW / 2;//calculate the centre of gird's X position
      const cy = gy * cellH + cellH / 2;//calculate the centre of gird's Y position
      const waveY = AMP * sin(gx * FREQ + rowPhase);
      const col = ORANGE[(gx + gy) % ORANGE.length];
      fill(col);
      rect(cx, cy + waveY, cellW - PAD, cellH - PAD, 6);
    }
  }
}

function drawWater() {
    // water mask
    waterMask.clear();
    waterMask.noStroke();
    waterMask.fill(255);
    // Dark swirling blues and purples
  for (let i = height * 0.6; i < height * 0.75; i += 12) {
    let wave = sin(i * 0.1) * 40;
    let wave2 = cos(i * 0.15) * 30;
    // More color variation
    let r = 30 + sin(i * 0.1) * 5;
    let g = 50 + i * 0.15 + cos(i * 0.1) * 15;
    let b = 90 + i * 0.1 + sin(i * 0.2) * 10;
    fill(r, g, b, 160);
    noStroke();
    // Draw wavy water using rectangles
    for (let x = 0; x < width; x += 3) {
      let y = i + sin(x * 0.02 + i * 0.1) * 25 + sin(x * 0.03 + i * 0.2) * 15 + cos(x * 0.015 + i * 0.12) * 10 + wave + wave2;
      rect(x, y, 3, height - y);
      waterMask.rect(x, y, 3, height - y);
    }
  }

  //water mask
  if(waterTexture){
    maskedWater = waterTexture.get();
    maskedWater.mask(waterMask);

    push();
    image(maskedWater,0,0,width,height);
    pop();
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
  blendMode(OVERLAY);// layer effect
  rectMode(CORNER);
  fill(255, 50, 50, intensity);
  rect(0, 0, width, height);
  pop();
}

//a anxiety progress bar at top-left corner
function drawAnxietyBar() {

  let maxAnxiety = 50; 
  let barWidth = 200; 
  let barHeight = 14; 
  let marginX = 20;
  let marginY = 20; 

  let t = constrain(clickCount, 0, maxAnxiety);
  let filled = map(t, 0, maxAnxiety, 0, barWidth);

  push();
  noStroke();

  // background of the bar
  fill(0, 0, 0, 150);
  rect(marginX - 4, marginY - 16, barWidth + 8, barHeight + 24);

  // empty bar outline
  fill(60);
  rect(marginX, marginY, barWidth, barHeight);

  // filled part (anxiety level)
  fill(255, 80, 80);
  rect(marginX, marginY, filled, barHeight);

  // label text
  fill(255);
  textSize(12);
  text("Anxiety level", marginX, marginY - 4);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  waterMask = createGraphics(width, height); 
}
