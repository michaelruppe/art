// Recreate the famous work "Schotter" by Georg Nees

let squares = [];
let cols = 12;
let rows = 22;
let size = 30;

function setup() {
  let canvas = createCanvas(800,1200);
  canvas.parent('sketch-holder');


  for (let i = 0; i < rows; i++) {
    let noiseMag = exp(0.1*i);
    squares[i] = [];
    for (let j = 0; j < cols; j++) {
      squares[i].push(new Square(size*j, size*i, noiseMag*random(), size));

    }
  }




}

function draw() {
  background(255);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

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


  }

  show() {
    stroke(0);
    push();
    translate(this.x,this.y);
    rotate(this.ang);
    rect(0,0,this.dim,this.dim);
    pop();
  }


}
