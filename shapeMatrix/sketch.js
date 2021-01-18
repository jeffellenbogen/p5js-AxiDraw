/* export SVG
DDF 2019
need to have p5.svg.js in project and in index.html
see -https://github.com/zenozeng/p5.js-svg
this will save an SVG file in your download folder
*/

strokeColor = 0;

winWidth = 10; // width of document in inches
winHeight = 6; // height of document in inches
ppi = 96;

windowWidth2 = winWidth * ppi;
windowHeight2 = winHeight * ppi;
count = 1
numLayers = 3

function setup() {
  
  colorMode(HSB, 100);
  createCanvas(windowWidth2, windowHeight2, SVG); // Create SVG Canvas
  strokeWeight(3); // do 0.1 for laser
  stroke(strokeColor, 100, 100); // red is good for laser
  //fill(strokeColor,100,100);
  noFill(); // better not to have a fill for laser
 
}


function drawCircle(circleXcenter, circleYcenter, radius){
  circleIncrementer = 60; // 360 divided by circleIncrementer = number of sides of polygon
  beginShape();
  //startAngle = circleIncrementer / 2
  startAngle = 0
  for (let x = startAngle; x <= 360 + startAngle; x += circleIncrementer)
  {
    currentX = circleXcenter - radius * cos(radians(x));
    currentY = circleYcenter - radius * sin(radians(x));
    vertex(currentX,currentY);
  }
  endShape(CLOSE);
}

function draw() {
  edge = 1.5 * ppi;
  num_rows = 5;
  num_columns = 7; 
  radius = random(.05,1.5) * ppi;
  hSpace = (windowWidth2 - (2 * edge)) / (num_columns - 1);
  vSpace = (windowHeight2 - (2 * edge)) / (num_rows - 1 );

  for (let y=0; y<num_rows; y++)
  {
    for (let x=0; x<num_columns; x++)
    { 
      centerX = edge+(x*hSpace);
      centerY = edge+(y*vSpace);
      drawCircle(centerX,centerY,radius);

    }
  }

  
  if (count >= numLayers)
  {
    //save each layer to a separate SVG to a file if desired
    //save("polygonMatrix.svg"); // give file name
    //print("saved polygonMatrix.svg")
    noLoop(); // we just want to export once
  }
  
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







