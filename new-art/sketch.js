let canvas;
let resy = 50;
let lines = [];
let xoff, yoff, zoff;



function setup() {
  canvas = createCanvas(windowWidth, windowHeight); // makes a little too large with scrollbars
  background(255);
  zoff = 0;

  // create array of lines
  for (let i = 0; i < resy; i++) {
    let y = floor(i * height/resy);
    lines.push(new Terrain(y));
  }
}

function draw() {
  background(255);
  noiseDetail(3 , 0.6);

  for(let i = 0; i < lines.length; i++) {
    lines[i].display();
  }

  zoff += 0.01;

}


class Terrain {
  constructor(y) {
    this.yi = y;
  }

  display() {
    stroke(0);
    noFill();
    // strokeWeight(1);
    let noiseX =  0.01 * this.yi + zoff;
    for(let i = 0; i < width; i++) {
      let noiseY =  0.01 * i + zoff;
      let noiseVal = 150 * noise(noiseX, noiseY);
      point(i,this.yi + noiseVal);
    }
  }

}
