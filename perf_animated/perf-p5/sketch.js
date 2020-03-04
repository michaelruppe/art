/******************************************************************************
 * Perf (Animated)
 * Michael Ruppe, Feb 2020
 *
 * A noise study - Simple creatures (colonies?) grow, move, interact and die.
 * Reminiscent of cellular-automata, this behaviour is generated with
 * simplex noise.
 *
 * Audio: Hidden Sky - Day 10
 * https://hiddensky.bandcamp.com/
 *
 ******************************************************************************/

let increment = 0.1; // Spatial noise increment
let alpha = 255;

// Noise offsets
let xoff = 0.0;
let yoff = 0.0;
let zoff = 0.0;
let noise;

// Resolution: nominal dot size
let res = 15;
let rows, cols;


function setup() {
  let canvas = createCanvas(windowWidth + 10, windowHeight + 10);
  canvas.parent("sketch-holder");
  if (windowWidth * windowHeight < 600 * 600) res = res / 2.5; // Increase density for small screens
  let rows = height / res;
  let cols = width / res;

  // Initialise with a seed unique to this very second
  simplex = new openSimplexNoise(
    3600*24*30*12 * year() +
    3600*24*30 * month() +
    3600*24 * day() +
    3600 * hour() +
    60 * minute() +
    second());

}

function draw() {
  background(0);

  fill(255); noStroke();
  xoff = 0;
  yoff = 0;
  zoff += 0.002;
  for (let i = -1.5 * res / 2; i <= width; i += res) {
    xoff += increment;
    yoff = 0;
    for (let j = -1.5 * res / 2; j <= height; j += res) {
      yoff += increment;

      // This is where the effect is built. Only reneder some dots (chance
      // based off noise) and set dot size as function of simplex noise
      let chance = simplex.noise3D(xoff, yoff, zoff);
      if (chance > 0.3) {
        // Islands
        let r = res * ( chance ) * 1.3;
        ellipse(i, j, r, r);

        // Shimmery pattern
        // let r = random(res/3, res) * simplex.noise3D(xoff,yoff,zoff);

      }
    }
  }
  displayHelperText(alpha -= 1); // Displays the text at beginning of animation
}

function displayHelperText(_alpha) {
  let a = _alpha;
  if (a > 0) {
    fill(0, a);
    rectMode(RADIUS);
    rect(width / 2, height / 2, 600, 300);
    fill(255, a);
    let s = 'Click to toggle audio';
    textAlign(CENTER, CENTER);
    textSize(60);
    text(s, width / 2, height / 2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth + 10, windowHeight + 10);
  rows = height / res;
  cols = width / res;
}


// Toggle the audio on click
document.addEventListener('click', musicPlay);

function musicPlay() {
  let audio = document.getElementById('player');
  if (audio.currentTime == 0) {
    audio.play();
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
}
