// very much an experiment at this point.

let curves = [];
let cols = 10;
let rows = 10;
let resx, resy;

function setup() {
  let canvas = createCanvas(800,800);
  canvas.parent('sketch-holder');

  resx = width / cols;
  resy = height / rows;

  for (let i = 0; i < rows; i++) {
    curves[i] = [];
    for (let j = 0; j < cols; j++) {
      curves[i].push(new Squig(createVector(j*resy,i*resx),resx,resy));

      for (let z = 0; z < 4; z++) {
        curves[i][j].add();
      }

    }
  }




}

function draw() {
  background(120);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

        curves[i][j].show();


    }
  }
}

class Squig {
  constructor(start, boundX, boundY){
    this.root = start;
    this.boundX = boundX;
    this.boundY = boundY;
    this.segments = [];
    this.weights = [];
    this.angles = [];
    this.num = 0;

    this.segments.push(this.root);
    this.weights.push(1);
    this.angles.push(HALF_PI);


  }


  add() {
    // Select an angle from 1 of 8 directions. TODO: make sure we don't go back the way we came eg. don't select 0 if the last angle was PI
    let anglePool = [0, PI/4, HALF_PI, 3*PI/4, PI, 5*PI/4, 3*HALF_PI, 7*PI/4];

    let p1 = this.segments[this.segments.length-1].copy();

    let maxLen = 60;

    let ang = random(anglePool);
    let len = random(0.2*maxLen, maxLen);
    let x = len * cos(ang) + p1.x;
    let y = -len * sin(ang) + p1.y;

    this.segments.push(createVector(x,y));
    this.weights.push(random([2,3,4]));
    this.angles.push(ang);
    this.num++;



  }


  show() {
    for (let i = 0; i < this.num -1; i++) {
      stroke(255);
      strokeWeight(this.weights[i]);
      line(this.segments[i].x, this.segments[i].y, this.segments[i+1].x, this.segments[i+1].y);

    }
  }
}
