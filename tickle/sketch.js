/******************************************************************************
 * Tickle - some squidgy friends
 * Michael Ruppe - March 2020
 * michaelruppe.com | github.com/michaelruppe
 *
 * Similar to the 'morph' project. Now with simplex noise, interactive.
 *
 ******************************************************************************/

let simplex;
let scl, rows, cols;
let inc = 1;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');
  simplex = new openSimplexNoise();
   scl = width / 25;
   rows = floor(height / scl);
   cols = floor(width / scl);
}

function draw() {
  let ofs = 0;
  background(255);
  translate(scl/2, scl/2);
  for (let i = 0; i < cols; i++){
    for (let j = 0; j <= rows; j++){
      mouseXnorm = mouseX/width;
      mouseYnorm = mouseY/height
      drawShape(i*scl, j*scl, mouseXnorm, mouseYnorm);
    }
  }


}

function drawShape(_x, _y, _xofs, _yofs) {
  beginShape();
  let numPoints = 25;
  let r = scl/2;
  // decouple noise axes by large distance - prevents regular artefacts appearing
  let xOfs = 10*_x+_xofs; // precalculate for later
  let yOfs = 10000*_y+_yofs;
  for (theta = 0; theta < TWO_PI; theta += (TWO_PI / numPoints) ) {
    let cosTheta = cos(theta); // precalculate for later
    let sinTheta = sin(theta);
    // use the unit circle (x,y) points as inputs for the noise function
    let x = 0.5 * cosTheta+1;
    let y = 0.5 * sinTheta+1;

    // Add noise
    let radius = r * (1 + simplex.noise4D(x , y, xOfs, yOfs))/2;
    let xn = radius * cosTheta;
    let yn = radius * sinTheta;

    vertex(xn + _x , yn + _y);
  }
  endShape(CLOSE);
}
