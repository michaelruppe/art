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
let palette, colours, paletteIndex = 0;
let sequenceSeed;
let squidges = [];

function setup() {
  let canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent('sketch-holder');

  simplex = new openSimplexNoise();
  scl = max(width, height) / 20; // keep the scale manageable
  rows = floor(height / scl);
  cols = floor(width / scl);

  // Select a palette
  setPalette();
  colours = palette[paletteIndex]

  // Unique blob-colour sequence
  randomSeed(second() + random(100));
  sequenceSeed = random();

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j <= rows; j++) {
      squidges.push( new Squidge(i*scl, j*scl, colours));
    }
  }

}

function draw() {
  let ofs = 0;
  background(255);
  translate(scl / 2, scl / 2);
  for (s of squidges) s.draw(mouseX, mouseY);
}


function Squidge(_x, _y, _colourArray) {
  this.x = _x;
  this.y = _y;
  this.colour = random(_colourArray);


  this.draw = function(_xnoise, _ynoise) {
    let distance = dist(this.x, this.y, _xnoise, _ynoise);
    // let decay = map (distance, 0,0.3*width, 1,0, true);
    let decay = pow(2.71828, -5*distance/width);
    let mouseXnorm = decay;
    let mouseYnorm = decay;
    // let mouseXnorm = (3* _xnoise / width) * decay;
    // let mouseYnorm = (3* _ynoise / height) * decay;

    fill(this.colour);
    beginShape();
    let numPoints = 25;
    let r = scl / 2;

    // decouple noise axes by large distance between shapes - prevents regular artefacts appearing
    let xOfs = 100 * this.x + mouseXnorm; // precalculate outside the for-loop
    let yOfs = 10000 * this.y + mouseYnorm;

    // let centreOfsX = simplex.noise4D(xOfs, yOfs, mouseXnorm, mouseYnorm) * scl / 5; // Jiggle the centre of mass
    // let centreOfsY = simplex.noise4D(xOfs, yOfs, mouseXnorm + 10000, mouseYnorm + 10000) * scl / 5;

    let centreOfsX = 0;
    let centreOfsY = 0;
    
    for (let theta = 0; theta < TWO_PI; theta += (TWO_PI / numPoints)) {
      cosTheta = cos(theta); // precalculate for later
      sinTheta = sin(theta);
      // use the unit circle (x,y) points as inputs for the noise function
      px = 0.5 * cosTheta + 1;
      py = 0.5 * sinTheta + 1;

      // Add noise
      let radius = r * (1 + simplex.noise4D(px, py, xOfs, yOfs)) / 2;
      let xn = radius * cosTheta;
      let yn = radius * sinTheta;

      vertex(xn + this.x + centreOfsX, yn + this.y + centreOfsY);
    }
    endShape(CLOSE);

  }

}


// Populates an array with several pallettes that can be selected by the script.
setPalette = function() {
  palette = new Array();

  /* Rivendell */
  palette.push([color(32, 191, 191),
    color(101, 216, 130),
    color(242, 230, 65),
    color(165, 57, 18),
    color(242, 60, 60),
  ]);

  // generate pallete
  palette.push([color(255, 249, 186),
    color(177, 130, 146),
    color(255, 212, 226),
    color(149, 192, 204),
    color(140, 170, 177)
  ]);

  palette.push([color(116, 191, 255),
    color(255, 154, 191),
    color(234, 211, 126),
    color(166, 216, 195),
    color(234, 231, 231)
  ]);

  palette.push([color(242, 67, 99),
    color(242, 220, 236),
    color(242, 216, 140),
    color(242, 185, 79),
    color(242, 124, 113)
  ]);

  /* pink acrylic paints */
  palette.push([color(242, 186, 201),
    color(216, 4, 82),
    color(165, 3, 62),
    color(242, 99, 151),
    color(242, 242, 242),
  ]);

}

function cyclePalette() {
  // Cycle through palettes
  if (++paletteIndex > palette.length - 1) paletteIndex = 0;
  colours = palette[paletteIndex];
  sequenceSeed = second(); // otherwise, for a given blob, the colour INDEX will still be the same ie. constant patterns
}

function mousePressed() {
  cyclePalette();
}
