/* export SVG
DDF 2019
need to have p5.svg.js in project and in index.html
see -https://github.com/zenozeng/p5.js-svg
this will save an SVG file in your download folder
*/


const winWidth = 5.5; // width of document in inches
const winHeight = 4.2; // height of document in inches
const ppi = 96;
const edge = .25;

const edgePixels = edge * ppi;

const windowWidth2 = winWidth * ppi;
const windowHeight2 = winHeight * ppi;

const numLayers = 100;
var strokeColor = 0;

var count = 0;

function setup() {
  angleMode(DEGREES);
  colorMode(HSB, 3);
  createCanvas(windowWidth2, windowHeight2, SVG); // Create SVG Canvas
  strokeWeight(2); // do 0.1 for laser
  stroke(strokeColor, 100, 100); 
  noFill(); // better not to have a fill for laser
}



function draw() {

  let verticalOffset = windowHeight2 / 2 + random (-30,30);
  let horizontalOffset = windowWidth2 / 2 + random (-30,30);
  let angleFactor = random(-2.1,2.1);
  let amplitudeFactor = random (-10.1,10.1)
  let firstPointDrawn = 0;
  let lastX = -1;
  let lastY = -1;

  for (let x = edgePixels ; x < windowWidth2 - edgePixels; x+=1)
  {
    //let y= sin(degrees(x - horizontalOffset ))+ verticalOffset;
    let y = (x - horizontalOffset) * angleFactor + amplitudeFactor * sin(degrees(x - horizontalOffset)) + verticalOffset
    if (firstPointDrawn != 0 && y > edgePixels && y < windowHeight2 - edgePixels)
      line(lastX, lastY, x, y);
    lastX = x;
    lastY = y;
    firstPointDrawn = 1;
  }
  

  if (count >= numLayers)
  {
    noLoop(); // we just want to export once
  }

  count++;
  strokeColor++;
  stroke(strokeColor, 100, 100);


  if (strokeColor>=3)
  {
    strokeColor = 0;
    stroke(strokeColor, 100, 100);
  }


}







