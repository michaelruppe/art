// Grid properties
var cols = 30
var rows = 40;
var scl = 20;
// Colour properties
var inc = 0.000005;
var xoff = 0; // Dimension x colour offset
var yoff = 0; // Dimension y colour offset
var zoff = 0; // Temporal colour offset (change over time)
var Roff = 0; // Tone specific offsets so behaviours are decoupled.
var Goff = 100;
var Boff = 1000;

var src; // the source image and it's dimensions
var sourceWidth = 420;
var sourceHeight = 565;

var grid = [];

// Load and scale the source image
function preload() {
  src = loadImage("source-small.png")
}

function setup() {
  frameRate(15);
  createCanvas(scl*cols, scl*rows);
  background(255);

  // Scaler to transfer between canvas and source-image dimensions
  scaleX = sourceWidth / width;
  scaleY = sourceHeight / height;

  // Initialise the grid of dots (location, colour)
  for(var x=0; x<cols; x++){
    for(var y=0; y<rows; y++){
      var index = x + y * cols;

      // calculate location for the dot. Add 0.5 so dot is tangent to canvas edges
      var xInit = (x+0.5)*scl;
      var yInit = (y+0.5)*scl;

      // extract the starting colour from the source image - get from centre of each source dot
      var colour = src.get(xInit * scaleX , yInit * scaleY);

      // Instantiate the dot
      grid[index] = new Dot(xInit, yInit, colour);
      grid[index].show();
    }
  }
}

function draw() {
  background(255);

  ////// Simple conveyor-belt
  // for (var i=0; i<rows*cols; i++){
  //   var temp;
  //   if(i == 0){
  //     grid[rows*cols-1].colour = grid[0].colour;
  //   }else{
  //     grid[i-1].colour = grid[i].colour;
  //   }
  //   grid[i].show();
  // }

  // Whole-width conveyor-belt
  // for(var x=0; x<cols; x++){
  //   for(var y=0; y<rows; y++){
  //     var index = x + y * cols;
  //     if (y == 0){
  //       var nextRow = x + (rows-1) * cols;
  //     }else{
  //       var nextRow = x + (y-1) * cols;
  //     }
  //     grid[nextRow].colour = grid[index].colour;
  //     grid[index].show();
  //   }
  // }

  // Modify the colour values with perlin noise
  for(var x=0; x<cols; x++){
    for(var y=0; y<rows; y++){
      var index = x + y * cols;

      grid[index].increment();
      grid[index].show();
      yoff += inc*10;
    }
    xoff += inc*10;
  }
  zoff += inc;
}

class Dot {
  constructor(x, y, col){
    this.x = x;
    this.y = y;
    this.colour = [];
    this.initColour = [];
    arrayCopy(col,this.colour);
    arrayCopy(col,this.initColour);
    // Must arrayCopy instead of regular assignment, otherwise any assignment to
    // this.colour gets pusehd to this.initColour too! must be how arrays work
    // in p5.js
  }

  show() {
    noStroke();
    fill(this.colour);
    ellipse(this.x, this.y, scl);
    fill(this.colour[0],this.colour[1],this.colour[2],0);
    rect(this.x-scl/2, this.y-scl/2, scl,scl);
  }

  increment(){
    var mag = 35;
    var temp = [];
    arrayCopy(this.initColour, temp);
    this.colour[0] = temp[0] + (2*(noise(Roff + xoff, Roff + yoff, Roff + zoff)-1)*mag);
    this.colour[1] = temp[1] + (2*(noise(Goff + xoff, Goff + yoff, Goff + zoff)-1)*mag);
    this.colour[2] = temp[2] + (2*(noise(Boff + xoff, Boff + yoff, Boff + zoff)-1)*mag);

  }

  clamp() {
    for(var i=0; i<2; i++) {
      if (this.colour[i] < 0) {
        this.colour[i] = 255;
      }
    }
  }
}
