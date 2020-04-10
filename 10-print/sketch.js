/******************************************************************************
 * Michael Ruppe, April 2020
 * Inspired by the 10 Print one-line program
 ******************************************************************************/

let scl = 30;
let x = 0;
let y = 0;

function setup() {
  createCanvas(800, 800);
  strokeWeight(3);
}

function draw() {
  y = 0;
  background(255);
  randomSeed(0);
  let chance = 0.5 + 0.4 * sin(frameCount / 1000);
  while(y < height) {
    if (random(1) < chance) {
      line(x,y,x+scl,y+scl);
    } else {
      line(x,y+scl,x+scl,y);
    }
    x += scl;
    if (x > width) {
      x = 0;
      y += scl;
    }
  }
}
