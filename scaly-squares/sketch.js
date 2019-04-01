// I started by trying to recreate the famous work "Schotter" by Georg Nees
// but it turned into a nice tiled flow field instead.


let squares = [];
let size = 30;  // Square size
let cols, rows;
let zoff = 0;


function setup() {
  let canvas = createCanvas(800,800);
  canvas.parent('sketch-holder');

  cols = floor(windowWidth/size)+2; // add some overflow so there are no gaps at canvas edges
  rows = floor(windowHeight/size)+2;

  for (let i = 0; i < rows; i++) {
    squares[i] = [];
    for (let j = 0; j < cols; j++) {
      let angle = noise(0.1 * i, 0.1 * j, zoff) * TWO_PI;
      squares[i].push(new Square(size*j, size*i, angle, size));
      squares[i][j].col = color(random(rubiks));

    }
  }

}

function draw() {
  background(255);
  zoff += 0.01;

  let from = color(255, 0, 0, 0.3 * 255);
  let to = color(0, 0, 255, 0.3 * 255);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let noiseVal = noise(0.1*i,j*0.1, zoff);
        let angle =  noiseVal * TWO_PI;
        squares[i][j].ang = angle;

        let c = lerpColor(from, to, noiseVal);
        squares[i][j].col = c;
        squares[i][j].show();
    }
  }
}

class Square {
  constructor(x,y,ang,dim) {
    this.x = x;
    this.y = y;
    this.ang = ang;
    this.dim = dim;
    this.col;
  }

  show() {
    stroke(0);
    fill(this.col);
    push();
    translate(this.x,this.y);
    rotate(this.ang);
    rect(0,0,this.dim,this.dim);
    pop();
  }
}
