//This p5.js sketch creates a grid of hexagons

var mainBuffer;
var controlBuffer;

const winWidth = 8; // width of document in inches
const winHeight = 6; // height of document in inches
const conrolWidth = 2;
const ppi = 96;

const winWidthScaled = winWidth * ppi;
const winHeightScaled = winHeight * ppi;
const controlWidthScaled = conrolWidth * ppi;

var count = 1;
const numLayers = 8;

var strokeColor = 40;
const colorIncr = 10;

var edge = 1.5 * ppi;
var num_rows = 5;
var num_columns = 4; 

var gridRadius = .4 * ppi;
var curRadius = gridRadius;
var radiusIncr = -.04

var sliderRows;
var sliderCols;


function setup() {
  colorMode(HSB, 100);
  createCanvas(winWidthScaled + controlWidthScaled, winHeightScaled, SVG); // Create SVG Canvas
  mainBuffer = createGraphics(winWidthScaled, winHeightScaled, SVG);
  controlBuffer = createGraphics(controlWidthScaled, winHeightScaled, SVG);

  strokeWeight(3); // do 0.1 for laser
  stroke(strokeColor, 100, 100); // red is good for laser
  //fill(strokeColor,100,100);
  noFill(); // better not to have a fill for laser

  sliderRows = createSlider(2,12,8);
  sliderRows.position(winWidthScaled + 5,80);
  sliderRows.style('controlWidthScaled', '80px');

}

function draw() {
  drawMainBuffer();
  drawControlBuffer();
  image(mainBuffer,0,0);
  image(controlBuffer,winWidthScaled,0);
}


function drawPolygon(polyXcenter, polyYcenter, polyRadius, polySides){
  circleIncrementer = 360 / polySides;
  beginShape();
  startAngle = circleIncrementer / 2
  //startAngle = 0
  for (let x = startAngle; x <= 360 + startAngle; x += circleIncrementer)
  {
    currentX = polyXcenter - polyRadius * cos(radians(x));
    currentY = polyYcenter - polyRadius * sin(radians(x));
    vertex(currentX,currentY);
  }
  endShape(CLOSE);

}

function drawMainBuffer() {

  let numSides = 6;
  let apothem = gridRadius * cos(PI/numSides)

  for (let vertPolyCount=0; vertPolyCount<num_rows; vertPolyCount++)
  {
    for (let horiPolyCount=0; horiPolyCount<num_columns; horiPolyCount++)
    { 
      let centerX = edge+(horiPolyCount*apothem*2);
      if (vertPolyCount % 2 == 1)
        centerX += apothem;
      let centerY = edge+(vertPolyCount*gridRadius*1.5); //radius * 1.5 -> perfect nested hexagons
      if (vertPolyCount % 2 == 0 || horiPolyCount < num_columns - 1)
      {
        if (random(1)<(1/count))  
          drawPolygon(centerX, centerY, curRadius, numSides);
      }
    }
  }
  curRadius += radiusIncr * ppi;

  if (count >= numLayers)
  {
    //save("hexagonGrid2.svg"); // give file name
    //print("saved hexagonGrid.svg")
    noLoop(); // we just want to export once
    //background(255);
  }
  
  count++;
  strokeColor += colorIncr;
  
  if (strokeColor>100)
    {
      strokeColor = 0;
    }
  
  stroke(strokeColor, 100, 100); // red is good for laser
  //fill(strokeColor, 100, 100);
}

function drawControlBuffer(){
  controlBuffer.colorMode(HSB,100);
  controlBuffer.background(100,100,100);
  controlBuffer.fill(20,100,100);
  controlBuffer.textSize(20);
  controlBuffer.text("Control Buffer HERE", 5, 50);
  var valRowSlider = sliderRows.value();
  num_rows = valRowSlider; 



}






