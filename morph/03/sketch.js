// Removed the symmetry!
// This one had me puzzled until I realised the reference (unit circle) had
// to be moved so that x,y >= 0
// What is happening in morph/01,02 is that noise takes abs(input)


// TODO: Add slider for user-settable parameters
// inc, size, alpha,
// xn = r* (noise(x,y,ofs)) * cos(theta); to become
// xn = r* m*(noise(x,y,ofs)+b) * cos(theta); where m{1:2} and b{-0.5:0}

let numPoints = 400;
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
  r = width/2;
}


function draw() {
  strokeWeight(3);
  noFill();
  translate(width/2, height/2);


  // Draw the eerie shape
  stroke(0,alpha);
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
  beginShape();
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
