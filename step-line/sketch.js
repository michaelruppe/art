let curves;


function setup() {
  createCanvas(800,800);


  curves = new Squig(createVector(0,0),50,80);

  for (let i = 0; i < 10; i++) {
    curves.add();
  }


}

function draw() {
  translate(width/2, height/2);
  background(120);

  for (let i = 0; i < curves.num; i++) {
    curves.show();
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
    // Select an angle from 1 of 8 directions
    let anglePool = [0, PI/4, HALF_PI, 3*PI/4, PI, 5*PI/4, 3*HALF_PI, 7*PI/4];

    // let ang = this.rAngle();
    let p1 = this.segments[this.segments.length-1].copy();
    // console.log(p1);
    let maxLen = 60;
    //find bound in that angle's direction
    // if (ang == 0) {
    //   maxLen = abs(this.bound - this.p1.x);
    // } else if (ang == HALF_PI) {
    //   maxLen = abs(this.p1.y);
    // } else if (ang == 3*HALF_PI) {
    //   maxLen = abs(this.p1.x);
    // } else {
    //   maxLen = abs(this.bound - this.p1.y);
    // }

    let ang = random(anglePool);
    let len = random(0.2*maxLen, maxLen);
    let x = len * cos(ang) + p1.x;
    let y = -len * sin(ang) + p1.y;

    this.segments.push(createVector(x,y));
    this.weights.push(random([2,3,4]));
    this.angles.push(ang);
    this.num++;



  }

  // Return a random, 45degree angle
  rAngle() {
    return random(0, TWO_PI);
    let n = random(1);
    let oldAng = this.angles[this.angles.length-1];
    // don't go back the way you came
    if (n <= 0.25 && oldAng != PI) {
      return 0;
    } else if (n <= 0.5 && oldAng != 3*HALF_PI) {
      return HALF_PI;
    } else if (n <= 0.75 && oldAng != 0) {
      return PI;
    } else {
      return 3*HALF_PI;
    }
  }


  show() {
    for (let i = 0; i < this.num -1; i++) {
      stroke(255);
      strokeWeight(this.weights[i]);
      line(this.segments[i].x, this.segments[i].y, this.segments[i+1].x, this.segments[i+1].y);

    }
  }
}
