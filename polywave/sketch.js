/*******************************************************************************
 * Polywave - trying to capture a trangular mesh that morphs and squishes.
 * WORK IN PROGRESS
 *
 * Michael Ruppe
 * Feb 2020
 *
 * long description
 ******************************************************************************/

let scl = 30;
let rows, cols;


function setup() {
  createCanvas(600, 600);
  background(0);

  cols = width / scl;
  rows = height / scl;

}

function draw() {
  let x = 0, y=0;
  background(0);
  stroke(255); noFill();
  for (let y = 0; y < rows; y+=2){
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++){
      // rect(x*scl,y*scl,scl,scl);
      vertex(x*scl,y*scl);
      vertex(x*scl,(y+1)*scl);
    }
    endShape();
  }

}
