/* export SVG
DDF 2019
need to have p5.svg.js in project and in index.html
see -https://github.com/zenozeng/p5.js-svg
this will save an SVG file in your download folder
*/


const winWidth = 12; // width of document in inches
const winHeight = 8; // height of document in inches
const ppi = 96;

const windowWidth2 = winWidth * ppi;
const windowHeight2 = winHeight * ppi;

var rectWidth;
var rectHeight;
var rectWidthIncr;
var rectHeightIncr;
var rectRounding;

var rectStartRotationAngle;
var rectRotationAngleIncr;
var count;
var numLayers;
var strokeColor;

var edge = 1.5 * ppi;
var num_rows = 8;
var num_columns = 20; 
var hSpace = (windowWidth2 - (2 * edge)) / (num_columns - 1);
var vSpace = (windowHeight2 - (2 * edge)) / (num_rows - 1 );


function initializeVars(){
  count = 1;
  numLayers = 1;
  strokeColor = 0;
  rectWidth = .3 * ppi;
  rectHeight = rectWidth;
  rectWidthIncr = .1  * ppi;
  rectHeightIncr = rectWidthIncr;
  rectRounding = .02  * ppi;
  rectStartRotationAngle = random(-90,90);
  rectRotationAngleIncr = 5;
}

function setup() {
  initializeVars();
  angleMode(DEGREES);
  colorMode(HSB, 100);

  createCanvas(windowWidth2, windowHeight2); 
  strokeWeight(2); // do 0.1 for laser
  stroke(strokeColor, 100, 100); // red is good for laser
  //fill(strokeColor,100,100);
  noFill(); // better not to have a fill for laser

}

function saveToSVG(){
    count = 0;
    clear();
    loop();
    createCanvas(windowWidth2, windowHeight2, SVG); // Create SVG Canvas
    drawMatrix();
    save("rectRotatedMatrix.svg"); // give file name
    print("Saved SVG!")
    //initializeVars();   
}

function reloadPage(){
  print("reload page!");
  location.reload();
}

function drawMatrix(){
  let rectRotationAngle = rectStartRotationAngle; 
  for (let y=0; y<num_rows; y++)
  {
    for (let x=0; x<num_columns; x++)
    { 
      centerX = edge+(x*hSpace);
      centerY = edge+(y*vSpace);
      rectRotationAngle += rectRotationAngleIncr;     
      push();
        rectMode(CENTER);
        translate(centerX,centerY); 
        rotate(rectRotationAngle);
        rect(0,0,rectWidth,rectHeight, rectRounding)
      pop();

    }
  }
}

function draw() {
      //save each layer to a separate SVG to a file if desired
  saveButton = createButton("saveSVG");
  saveButton.position(windowWidth2-100, windowHeight2-100);
  saveButton.mouseClicked(saveToSVG);

    //save each layer to a separate SVG to a file if desired
  reloadButton = createButton("reload page");
  reloadButton.position(windowWidth2-100, windowHeight2-125);
  reloadButton.mouseClicked(reloadPage);
  
  
  drawMatrix();

  if (count >= numLayers)
  {
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







