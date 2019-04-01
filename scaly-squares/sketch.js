// I started by trying to recreate the famous work "Schotter" by Georg Nees
// but it turned into a nice tiled flow field instead.

let squares = [];
let size = 30;
let cols, rows;
let zoff = 0;
let rubiks = ['white', 'red', 'blue', 'green', 'yellow', 'orange'];

function setup() {
  // colorMode(HSB,100);
  let canvas = createCanvas(windowWidth,windowHeight);
  // let canvas = createCanvas(800,800);

  cols = floor(windowWidth/size)+2;
  rows = floor(windowHeight/size)+2;

  canvas.parent('sketch-holder');


  for (let i = 0; i < rows; i++) {
    squares[i] = [];
    for (let j = 0; j < cols; j++) {
      let angle = noise(0.1*i,j*0.1, zoff) * TWO_PI;
      squares[i].push(new Square(size*j, size*i, angle, size));
      squares[i][j].col = color(random(rubiks));


    }
  }




}

function draw() {
  background(255);
  zoff += 0.01;

  let from = color(255, 0, 0, 0.2 * 255);
  let to = color(0, 0, 255, 0.2 * 255);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        let angle = noise(0.1*i,j*0.1, zoff) * TWO_PI;
        squares[i][j].ang = angle;
        let temp = map(angle,-TWO_PI/8,TWO_PI/8,0,1);
        let c = lerpColor(from, to, temp);
        squares[i][j].col = c;
        // squares[i][j].col = color(255, 255, map(angle,0,TWO_PI,0,255));
        // let colour = map(angle,-PI/4,PI/4,0,360);
        // let colourString = 'hsl(' + nf(colour,NULL,0) + ',100%, 0%)';
        // let colourString = 'hsl(120,100%, 50%)';

        // squares[i][j].col = color(colourString);
        // squares[i][j].col = color(colour,100,100);
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
    this.col;// = color('hsl(120,100%, 50%)');


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
