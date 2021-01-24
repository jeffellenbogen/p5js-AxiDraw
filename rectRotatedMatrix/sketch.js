/* export SVG
DDF 2019
need to have p5.svg.js in project and in index.html
see -https://github.com/zenozeng/p5.js-svg
this will save an SVG file in your download folder
*/

strokeColor = 0;

const winWidth = 14; // width of document in inches
const winHeight = 11; // height of document in inches
const ppi = 96;

const windowWidth2 = winWidth * ppi;
const windowHeight2 = winHeight * ppi;

var rectWidth = .4 * ppi;
var rectHeight = rectWidth;
var rectWidthIncr = .1 * ppi;
var rectHeightIncr = rectWidthIncr;

var rectRounding = .05  * ppi;

var count = 1
var numLayers = 3

function setup() {
  angleMode(DEGREES);
  colorMode(HSB, 100);

  createCanvas(windowWidth2, windowHeight2, SVG); // Create SVG Canvas
  strokeWeight(1); // do 0.1 for laser
  stroke(strokeColor, 100, 100); // red is good for laser
  //fill(strokeColor,100,100);
  noFill(); // better not to have a fill for laser
 
}


function draw() {
  edge = 1.5 * ppi;
  num_rows = 14;
  num_columns = 20; 
  hSpace = (windowWidth2 - (2 * edge)) / (num_columns - 1);
  vSpace = (windowHeight2 - (2 * edge)) / (num_rows - 1 );
  var rectRotationAngle = 0;
  var rectRotationAngleIncr = 1;
  for (let y=0; y<num_rows; y++)
  {
    for (let x=0; x<num_columns; x++)
    { 
      centerX = edge+(x*hSpace);
      centerY = edge+(y*vSpace);
      //rectRotationAngle = 0;
      rectRotationAngle += rectRotationAngleIncr;
      //rectRotationAngle = random(0,90);
      push();
      rectMode(CENTER);
      translate(centerX,centerY); 
      rotate(rectRotationAngle);
      rect(0,0,rectWidth,rectHeight, rectRounding)
      pop();

    }
  }

  
  if (count >= numLayers)
  {
    //save each layer to a separate SVG to a file if desired
    //save("polygonMatrix.svg"); // give file name
    //print("saved polygonMatrix.svg")
    noLoop(); // we just want to export once
  }
  rectWidth+=rectWidthIncr;
  rectHeight+=rectHeightIncr;

  count++;
  strokeColor = strokeColor + 30;

  if (strokeColor>100)
    {
      strokeColor = 0;
    }
  print("strokeColor =", strokeColor);
  stroke(strokeColor, 100, 100); // red is good for laser
  //fill(strokeColor, 100, 100);
}







