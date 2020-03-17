let zinc = 0.03
let scl = 30
let paddingW, paddingH, zoff = 0;
let simplex

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  paddingW = width/10
  paddingH = height/4
  simplex = new openSimplexNoise();
}

function draw() {
  background(0)

  stroke(255); noFill();

  // Perlin Noise
  for (let i = paddingH; i < height-paddingH; i+= scl){

    beginShape();
    for (let j = paddingW; j < width/2 - paddingW/2; j++ ) {
      vertex(j, i + 50*noise(i,0.05*j, zoff));
    }
    endShape(OPEN);
  }

  // Simplex Noise
  for (let i = paddingH; i < height-paddingH; i+= scl){

    beginShape();
    for (let j = width/2 + paddingW/2; j < width-paddingW; j++ ) {
      vertex(j, i + 20*simplex.noise3D(i, 0.1*j, zoff));
    }
    endShape(OPEN);
  }
  zoff += zinc
}
