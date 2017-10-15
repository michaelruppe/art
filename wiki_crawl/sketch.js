/*
 * A flow field starter for further projects
 *
 */

var inc = 0.1;
var scl = 10;
var cols,rows;
var zoff = 0;
var fr;

var particles = [];

function setup() {
  createCanvas(400,400);
  background(255);
  cols = floor(width/scl);
  rows = floor(height/scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i=0; i < 400; i++) {
    particles[i] = new Particle();
  }

}

function draw() {
  // background(255);
  var yoff = 0;
  for (var y = 0; y<rows; y++){
    var xoff = 0;
    for (var x = 0; x<cols; x++){
      var index = (x + y * cols);
      flowfield[index] = v; // Store the calculated vector in the array for later
      var angle = noise(xoff, yoff, zoff)*TWO_PI*2;
      xoff += inc;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(0.05); // for force
      // stroke(0,50);
      // push();
      // translate(x*scl,y*scl);
      // rotate(v.heading());
      // line(0,0,scl,0);
      // pop();
    }
    yoff += inc;

    zoff+=0.0003
  }

  for (var i = 0; i < particles.length; i++){
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();


  }


  fr.html(floor(frameRate()));
}
