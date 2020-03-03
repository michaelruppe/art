/******************************************
 * Perf (Animated)
 * Michael Ruppe, Feb 2020
 *
 * A noise study - generate island masses and texture with ellipses and
 * Simplex Noise.
 *
 * Audio kindly provided by Hidden Sky:
 * https://hiddensky.bandcamp.com/
 *
 *****************************************/

let increment = 0.1;
let noise;
let alpha = 255;

  let xoff = 0.0; // Start xoff at 0
  let yoff = 0.0;
  let zoff = 0.0;
  let res = 15;
let rows, cols;


function setup() {
  let canvas = createCanvas(windowWidth+10,windowHeight+10);
  canvas.parent("sketch-holder");
  let rows = height/res;
  let cols = width/res;

  simplex = new openSimplexNoise(3600*hour()+60*minute()*+second()); // Initialise with a (almost) unique seed

}

function draw() {
  background(0);

  fill(255); noStroke();
  xoff=0;
  yoff=0;
  zoff += 0.002;
  for (let i = -1.5*res/2; i <= width; i += res) {
    xoff += increment;
    yoff = 0;
    for (let j = -1.5*res/2; j <= height; j += res) {
      yoff += increment;
      let chance = simplex.noise3D(xoff, yoff, zoff);


      if (chance > 0.3) {
        // Shimmery pattern
        // let r = random(res/3, res) * simplex.noise3D(xoff,yoff,zoff);

        // Islands
        let r = res* (simplex.noise3D(xoff,yoff,zoff))*1.3;
        ellipse(i, j, r, r);
      }


    }
  }

  displayHelperText(alpha-=1);
}

function displayHelperText(_alpha) {
  let a = _alpha;
  fill(0, a);
  rectMode(RADIUS);
  rect(width/2,height/2, 600,300);
  fill(255,a);
  let s = 'Click to toggle audio';
  textAlign(CENTER, CENTER);
  textSize(60);
  text(s, width/2, height/2);

}

function windowResized() {
  resizeCanvas(windowWidth+10, windowHeight+10);
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
