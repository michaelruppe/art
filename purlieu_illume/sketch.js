var cols = 30
var rows = 40;
var scl = 15;
var ofs = 0;

var src; // the source image and it's dimensions
var sourceWidth = 420;
var sourceHeight = 565;

var grid = [];


// Load and scale the source image
function preload() {
  src = loadImage("source-small.png")
}

function setup() {
  frameRate(30);
  createCanvas(scl*cols, scl*rows);
  background(255);

  // Initialise the grid of dots
  for(var x=0; x<cols; x++){
    for(var y=0; y<rows; y++){
      var index = x + y * cols;

      // calculate location for the dot
      var xInit = (x+0.5)*scl;
      var yInit = (y+0.5)*scl;

      // extract the starting colour from the source image - get from centre of each source dot
      scaleX = sourceWidth / width;
      scaleY = sourceHeight / height;
      var colour = src.get(xInit * scaleX , yInit * scaleY);

      // Instantiate the dot
      grid[index] = new Dot(xInit, yInit, colour); //Add 0.5 to the index so dot is tangent to edges
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
  for(var x=0; x<cols; x++){
    for(var y=0; y<rows; y++){
      var index = x + y * cols;
      if (y == 0){
        var nextRow = x + (rows-1) * cols;
      }else{
        var nextRow = x + (y-1) * cols;
      }
      grid[nextRow].colour = grid[index].colour;
      grid[index].show();
    }
  }


}

class Dot {
  constructor(x, y, colour){
    this.x = x;
    this.y = y;
    this.colour = colour;
  }

  show() {
    noStroke();
    fill(this.colour);
    ellipse(this.x, this.y, scl);
  }
}
