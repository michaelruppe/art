// Now with R G B morphs that overlap.

numPoints = 400;
let theta = 0;
let r;
let offset = 0;
let frame = 0;


let inc = 4e-3;
let size = 400;
let alpha = 24;

function setup() {
  createCanvas(600,600);
  background(255);
  r = width/3;
}


function draw() {
  strokeWeight(3);
  noFill();

  // RED
  translate(width/2, height/3);
  stroke(255, 0, 0,alpha);
  drawShape(offset);
  // Erase the eerie shape as you go.
  if (frame > size) {
    stroke(255,alpha);
    drawShape(offset - size*inc);
  }

  // GREEN
  translate(-r/2, 0);
  stroke(0, 255, 0,alpha);
  drawShape(offset);
  // Erase the eerie shape as you go.
  if (frame > size) {
    stroke(255,alpha);
    drawShape(offset - size*inc);
  }

  // BLUE
  translate(r, 0);
  stroke(0, 0, 255,alpha);
  drawShape(offset);
  // Erase the eerie shape as you go.
  if (frame > size) {
    stroke(255,alpha);
    drawShape(offset - size*inc);
  }



  offset += inc;
  frame++;

}


// Starts with a unit circle and uses points on it as inputs to the noise function
// the noise then changes the radius of a much larger circle.
function drawShape(ofs) {
  beginShape()
  for (theta = 0; theta < TWO_PI; theta += (TWO_PI / numPoints) ) {
    // use the unit circle (x,y) points as inputs for the noise function
    let x = 0.5 * cos(theta)+1;
    let y = 0.5 * sin(theta)+1;

    // Add noise
    let xn = r* (noise(x,y,ofs)) * cos(theta);
    let yn = r* (noise(x,y,ofs)) * sin(theta);

    vertex(xn , yn);
  }
  endShape();
}
