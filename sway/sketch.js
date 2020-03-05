/******************************************************************************
 * Sway
 * Michael Ruppe, Feb 2020
 *
 * A smoky, colourful tangle.
 * Each particle is assigned its own flow field to move it around.
 * Each particle-pair will draw with a colour chosen out of a palette.
 *
 ******************************************************************************/

let alphaMax = 15; // Max alpha for a line
let numParticles = 50;
let inc = 0.01;
let scl = 100;
let cols, rows;
let zoff = 100; // near zero, all particles move in the same direction at start
let palette, colours;

let particles = [],
  simplex = [],
  flowfield = [];


function setup() {
  palette = new Array();
  setPalette();
  colours = random(palette);

  createCanvas(windowWidth, windowHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);
  (random(100) < 50) ? background(255) : background(0);

  // Unique seed noise
  let seedTime = (3600 * 24 * 30 * 12 * year() +
    3600 * 24 * 30 * month() +
    3600 * 24 * day() +
    3600 * hour() +
    60 * minute() +
    second());

  // ******************* Initialise particles *******************
  // Decide what format to start with (line, ring, random)
  let select = random(100); // Roll the dice
  let x,y,r = min(width,height)/4;
  for (let i = 0; i < numParticles; i++) {
    // Need a flowfield and simplex instance for each particle
    flowfield.push(new Array(cols * rows));
    simplex.push(new openSimplexNoise(seedTime + random(1000)));

    // generate the starting configuration
    if (select < 33) {
      // horizontal line
      x = random(width); y = height/2;
    } else if (select < 66) {
      // start at center
      x = random(width); y = random(height);
    } else {
      // a ring of particles
      let theta = random(TWO_PI);
      x = width/2 + r*cos(theta);
      y = height/2 + r*sin(theta);
    }
    particles.push(new Particle(x,y));
  }
}

function draw() {
  for (let i = 0; i < flowfield.length; i++) {
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
        let index = (x + y * cols);
        let angle = simplex[i].noise3D(xoff, yoff, zoff) * TWO_PI;
        xoff += inc;
        let v = p5.Vector.fromAngle(angle);
        v.setMag(0.05); // for force
        flowfield[i][index] = v; // Store the calculated vector in the array for later
      }
      yoff += inc;
    }

  }
  zoff += 0.002

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield[i]);
    particles[i].update();
    particles[i].edges();
    // particles[i].show();
  }

  linkup();
}


linkup = function() {
  let dmax = width / 10;

  // Draw the lines between particles.
  for (let i = 0; i < particles.length; i++) {
    for (let j = 0; j < i; j++) { // Draw from jth element up to i. Prevents double lines or drawing line from self to self
      let v1 = particles[i].pos.copy();
      let v2 = particles[j].pos.copy();
      let v = v1.copy();
      v.sub(v2);
      let d = v.mag(); // Minimise calls to mag() by saving in variable.
      if (d <= dmax) { // save some cycles - don't bother doing calculations if distance is too great anyway.
        d = constrain(d, 20, dmax);
        let alpha = map(d, 0, dmax, alphaMax, 0, 1);
        let palletteIndex = (i + j) % colours.length; // select a colour for a pair of particles
        let c = colours[palletteIndex];
        c.setAlpha(alpha);
        stroke(c);

        strokeWeight(1);
        line(v1.x, v1.y, v2.x, v2.y);
      }
    }
  }

}


// Populates an array with several pallettes that can be selected by the script.
setPalette = function() {

  // Forest
  palette.push([color(109, 64, 13),
    color(3, 137, 113),
    color(59, 158, 184),
    color(113, 193, 108),
    color(52, 87, 32),
  ]);

  // Warm
  palette.push([color(211, 217, 35),
    color(214, 217, 143),
    color(241, 242, 206),
    color(140, 91, 48),
    color(64, 57, 26)
  ]);

  // Night
  palette.push([color(1, 2, 35, 1),
    color(2, 11, 61, 1),
    color(124, 158, 212, 1),
    color(117, 179, 212, 1),
    color(135, 239, 239, 1)
  ]);

  // Soda
  palette.push([color(2, 7, 114),
    color(131, 191, 3),
    color(242, 202, 4),
    color(242, 127, 26),
    color(242, 101, 19)
  ]);

  // Beach
  palette.push([color(91, 193, 216, 1),
    color(167, 228, 242, 1),
    color(101, 205, 216, 1),
    color(216, 186, 160, 1),
    color(242, 212, 186, 1)
  ]);

}
