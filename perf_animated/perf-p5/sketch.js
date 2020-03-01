/******************************************
 * Perf (Animated)
 * Michael Ruppe, Feb 2020
 *
 * A noise study - generate island masses and texture with ellipses
 *
 *****************************************/

let increment = 0.1;


let noise;

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

  simplex = new openSimplexNoise();

}

function draw() {
  // background(255,229,180);
  background(0);
  // fill(189,169,133); noStroke();
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
}
