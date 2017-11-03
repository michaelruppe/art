let squigs = [];

function setup() {
  let can = createCanvas(1200,900);
  for (let i = 0; i < 1000; i++) {
      squigs.push(new squig);
  }

}

function draw() {
  // background(255);

  for (let i = squigs.length - 1; i >= 0; i--) {
    squigs[i].update();
    squigs[i].show();

    checkBound(i);
  }
  if (squigs.length == 0) {
    clear();
    setup();
  }
}


function squig() {
  this.theta = random(-PI/4, PI/4);
  this.pos = new p5.Vector(width/2,height-30);
  // this.vel = new p5.Vector(random(-4,4), random(-7,-20) ); // TODO could set zenith to height and solve for initial vel
  // this.vel = new p5.Vector(random(0.5*sin(this.theta), 5*sin(this.theta)), random(-5*cos(this.theta), -22*cos(this.theta)) );
  this.vel = new p5.Vector(random(-10,10), random(-5*cos(this.theta), -22*cos(this.theta)) );
  this.g = 0.3;
  this.size = 5;

  this.update = function() {
    // regular acceleration
    this.vel.add(new p5.Vector(0,this.g))
    this.pos.add(this.vel);

    // friction
    this.vel.x *= 0.985;
  }

  this.show = function() {
    fill(0,0,0,20);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}


// Delete squigs that are off screen
function checkBound(index) {
  if (squigs[index].pos.y > height) {
    squigs.splice(index,1);
  }
}
