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

function setup() {
  let canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent('sketch-holder');


  simplex = new openSimplexNoise();
  scl = max(width,height) / 20; // keep the scale manageable
  rows = floor(height / scl);
  cols = floor(width / scl);

  // Select a palette
  setPalette();
  colours = palette[paletteIndex]

  randomSeed(second());
  sequenceSeed = random();

}

function draw() {
  let ofs = 0;
  background(255);
  translate(scl / 2, scl / 2);
  randomSeed(sequenceSeed); // Re-seed the random sequence - this drives our colour selector and we want constant, random colours
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j <= rows; j++) {
      mouseXnorm = 3* mouseX / width;
      mouseYnorm = 3* mouseY / height;

      fill(random(colours));
      noStroke();
      drawShape(i * scl, j * scl, mouseXnorm, mouseYnorm);
    }
  }
}

function drawShape(_x, _y, _xofs, _yofs) {
  beginShape();
  let numPoints = 25;
  let r = scl / 2;

  // decouple noise axes by large distance between shapes - prevents regular artefacts appearing
  let xOfs = 100 * _x + _xofs; // precalculate outside the for-loop
  let yOfs = 10000 * _y + _yofs;

  let centreOfsX = simplex.noise4D(xOfs, yOfs, _xofs,_yofs)*scl/5; // Jiggle the centre of mass
  let centreOfsY = simplex.noise4D(xOfs, yOfs, _xofs+10000,_yofs+10000)*scl/5;

  for (theta = 0; theta < TWO_PI; theta += (TWO_PI / numPoints)) {
    let cosTheta = cos(theta); // precalculate for later
    let sinTheta = sin(theta);
    // use the unit circle (x,y) points as inputs for the noise function
    let x = 0.5 * cosTheta + 1;
    let y = 0.5 * sinTheta + 1;

    // Add noise
    let radius = r * (1 + simplex.noise4D(x, y, xOfs, yOfs)) / 2;
    let xn = radius * cosTheta;
    let yn = radius * sinTheta;

    vertex(xn + _x + centreOfsX, yn + _y + centreOfsY);
  }
  endShape(CLOSE);
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
