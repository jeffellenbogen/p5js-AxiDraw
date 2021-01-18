//This p5.js sketch creates a grid of hexagons

const winWidth = 14; // width of document in inches
const winHeight = 11; // height of document in inches
const ppi = 96;

const winWidthScaled = winWidth * ppi;
const winHeightScaled = winHeight * ppi;

var count = 1;
const numLayers = 6;
var strokeColor = 0;

const edge = 1.5 * ppi;
const num_rows = 10;
const num_columns = 16; 

var gridRadius = .4 * ppi;
var curRadius = gridRadius;


function setup() {
  colorMode(HSB, 100);
  createCanvas(winWidthScaled, winHeightScaled, SVG); // Create SVG Canvas
  strokeWeight(2); // do 0.1 for laser
  stroke(strokeColor, 100, 100); // red is good for laser
  //fill(strokeColor,100,100);
  noFill(); // better not to have a fill for laser
 
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

function draw() {

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
  curRadius -= .05 * ppi;

  if (count >= numLayers)
  {
    save("hexagonGrid2.svg"); // give file name
    print("saved hexagonGrid.svg")
    noLoop(); // we just want to export once
  }
  
  count++;
  strokeColor = strokeColor + 50;

  if (strokeColor>100)
    {
      strokeColor = 0;
    }
  stroke(strokeColor, 100, 100); // red is good for laser
  //fill(strokeColor, 100, 100);
}







