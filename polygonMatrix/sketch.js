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
numLayers = 6


function setup() {
  
  colorMode(HSB, 100);
  createCanvas(windowWidth2, windowHeight2, SVG); // Create SVG Canvas
  strokeWeight(1); // do 0.1 for laser
  stroke(strokeColor, 100, 100); // red is good for laser
  noFill(); // better not to have a fill for laser
 
}

function printCanvasEdge() {
   rect(0,0,windowWidth2-1, windowHeight2-1);
}

function printRegistrationMarks() {
  stroke(0);
  fill(0);
  ellipse(50,50,ppi/4,ppi/4);
  ellipse(windowWidth2 - 50, windowHeight2 - 50, ppi/4, ppi / 4);
  
}


function drawCircle(circleXcenter, circleYcenter, radius){
  circleIncremeter = 45; // 360 divided by circleIncrementer = number of sides of polygon
  lastX = -1;
  lastY = -1;
  
  for (let x = 0; x <= 360; x = x+circleIncremeter)
  {
    currentX = circleXcenter - radius * cos(radians(x));
    currentY = circleYcenter - radius * sin(radians(x));
    if ((lastX != -1) && (lastY != -1))
      {
        line(lastX,lastY,currentX,currentY);
      }
    lastX = currentX;
    lastY = currentY;
  }
}

function draw() {
  edge = 1 * ppi;
  num_rows = 10;
  num_columns = 14; 
  radius = random(.05,.5) * ppi;
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

  // printCanvasEdge shows the page boarder if desired
  //printCanvasEdge();
  
  // print Registration marks for laser cutting if desired
  //printRegistrationMarks();
  
  if (count >= numLayers)
  {
    //save each layer to a separate SVG to a file if desired
    save("polygonMatrix_SVG",count,".svg"); // give file name
    //print("saved polygonMatrix_SVG",count,".svg");
    noLoop(); // we just want to export once
  }
  
  count++;
  strokeColor = strokeColor + 50;

  if (strokeColor>100)
    {
      strokeColor = 0;
    }
  print("strokeColor =", strokeColor);
  stroke(strokeColor, 100, 100); // red is good for laser
}







