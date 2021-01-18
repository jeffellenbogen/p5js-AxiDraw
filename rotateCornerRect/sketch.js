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


function drawCornerRect(BRcornerX, BRcornerY, length, baseAngle){
  let Ax = BRcornerX
  let Ay = BRcornerY
  let a = length * cos(radians(baseAngle))
  let b = length * sin(radians(baseAngle))
  
  stroke(0, 100, 100); 
  let Bx = Ax - a
  let By = Ay - b
  line (Ax, Ay, Bx, By)
  
  stroke(0, 100, 100);  
  let Cx = Bx + b
  let Cy = By - a
  line (Bx, By, Cx, Cy)
  
  stroke(0, 100, 100); 
  let Dx = Cx + a
  let Dy = Cy + b
  line (Cx, Cy, Dx, Dy)
  
  stroke(0, 100, 100); 
  line (Dx, Dy, Ax, Ay)
  
}

function draw() {
   
  for (let angle = 0; angle <360; angle = angle + 15)
    { 
    drawCornerRect(200,200,100,angle)

    }
    //save each layer to a separate SVG to a file if desired
    //save("polygonMatrix_SVG",count,".svg"); // give file name
    //print("saved polygonMatrix_SVG",count,".svg");
    noLoop(); // we just want to export once
  

}







