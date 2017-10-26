// Morphy shape - persistent on screen


numPoints = 400;
let theta = 0;
let r;
let ofs = 0;
let frame = 0;

function setup() {
  createCanvas(600,600);
  background(255);
  r = width/2;
}


function draw() {
  stroke(0,12);
  strokeWeight(3);
  noFill();

  translate(width/2, height/2);

  beginShape()
  for (theta = 0; theta < TWO_PI; theta += (TWO_PI / numPoints) ) {
    // use the unit circle (x,y) points as inputs for the noise function
    let x = 0.5 * cos(theta);
    let y = 0.5 * sin(theta);

    // Add noise
    let xn = r*noise(x,y,ofs) * cos(theta);
    let yn = r*noise(x,y,ofs) * sin(theta);

    vertex(xn , yn);
  }
  endShape();

  ofs += 4e-3;
  frame++;

}
