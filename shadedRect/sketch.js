  topLeftX = 40
  topLeftY = 40
  rectWidth = 200
  rectHeight = 150

function setup() {
  createCanvas(600, 400);
  colorMode(HSB,100);
}

//currently only working with positive slope hatching (1-89 degrees)
function shadeRect(TLcornerX, TLcornerY, width, height, hatchAngle, hatchSpacing)
{
  //draw the rectangle first
  rect(TLcornerX, TLcornerY, width, height)
  let hatchSpaceX = (hatchSpacing / sin(radians(90-hatchAngle)))
  let hatchSpaceY = (hatchSpacing / cos(radians(90-hatchAngle)))
  
  // For loop 1 - move down along the left edge of the rectangle to create hatching in two segments: those that hit the top and then those that hit the right
  for (let yStepA = 0; yStepA <= height; yStepA = yStepA + hatchSpaceX)
    {
      let xStepA = yStepA * tan(radians(90-hatchAngle))
      if (xStepA <=width) //hatches from topLeft corner along left edge that intersect the top of the rectangle
      {
        stroke(10,100,100) //stroke this hatch in red
        line (TLcornerX, TLcornerY + yStepA, TLcornerX + xStepA, TLcornerY)
      }
      else //hatches continuing down along left side that intersect the right side of the rectangle
      {
        let yDistFromBRCorner = width * tan(radians(hatchAngle))
        let yDistFromTRCorner = yStepA - yDistFromBRCorner
        stroke(30,100,100) //stroke this hatch in green
        line (TLcornerX, TLcornerY+yStepA, TLcornerX+width, TLcornerY+yDistFromTRCorner)
      }
    }
  
  // For loop 2 - move right along the bottom edge of the rectangle to create hatching in two segments: those that hit the top and then those that hit the right
  let transitionOffsetX = height % hatchSpaceX 
  let transitionOffsetY = transitionOffsetX / tan(radians(90-hatchAngle))

  for (let d = transitionOffsetY; d <= width; d = d + hatchSpaceY)
    {
      
      let e = height / tan(radians(hatchAngle))
      if (d + e < width) //hatches from bottomLeft corner along bottom edge that intersect the top of the rectangle
      {
        stroke(60,100,100) //stroke this hatch in lightblue
        line (TLcornerX + d, TLcornerY+height, TLcornerX + d+e, TLcornerY)
      }
    
      else //hatches continuing right along bottom side that intersect the right side of the rectangle
      {
        let f = (width - d) * tan(radians(hatchAngle))
        let f2 = height - f
        stroke(80,100,100) //stroke this hatch in purple
        line (TLcornerX + d, TLcornerY+height, TLcornerX+width, TLcornerY + f2)
      }
    
    }
    
    
  
}

function draw() {
  background(220);
  shadeRect(topLeftX, topLeftY, rectWidth, rectHeight, 15, 10)
  noLoop()
}