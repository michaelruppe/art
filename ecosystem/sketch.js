/******************************************************************************
 * Michael Ruppe, April 2020
 * Following along with Dan Shiffman of Coding Train
 * https://youtu.be/flxOkx0yLrY
 ******************************************************************************/

let vehicles = [];
let food = [];
let poison = [];

function setup() {
  createCanvas(600,600)
  vehicle = new Vehicle(width/2, height/2)
  for (let i = 0; i < 10; i++){
    vehicles.push( new Vehicle(random(width), random(height) ) );
  }
  for (let i = 0; i < 10; i++){
    food.push(createVector(random(width),random(height)));
  }
  for (let i = 0; i < 10; i++){
    poison.push(createVector(random(width),random(height)));
  }
}

function draw() {
  background(80);
  let target = createVector(mouseX, mouseY)

  for (let i = 0; i < food.length; i++){
    fill(0,255,0); noStroke();
    ellipse(food[i].x, food[i].y, 8 ,8);
  }
  for (let i = 0; i < poison.length; i++){
    fill(255,0,0); noStroke();
    ellipse(poison[i].x, poison[i].y, 8 ,8);
  }

  for (let i = vehicles.length-1; i >= 0; i--) {
    vehicles[i].behaviours(food, poison)
    vehicles[i].update()
    vehicles[i].show()

    if (vehicles[i].dead()) {
      vehicles.splice(i,1);
    }

  }

}


function Vehicle(x, y) {
  this.acceleration = createVector(0,0)
  this.velocity = createVector(0, -2)
  this.position = createVector(x, y)
  this.r = 4
  this.maxspeed = 5
  this.maxforce = 0.3

  this.health = 1;

  this.dna = [1,-0.5];
  this.dna[0] = random(-5,5);
  this.dna[1] = random(-5,5);


  this.update =  function() {
    this.health -= 0.01;
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxspeed)
    this.position.add(this.velocity)
    this.acceleration.setMag(0)
  }

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.seek = function(target) {
    // set to max speed in desired direction
    let desired = p5.Vector.sub(target, this.position)
    desired.setMag(this.maxspeed);

    // steering = desired - current
    let steer = p5.Vector.sub(desired, this.velocity)
    steer.limit(this.maxforce)

    return steer;
  }

  this.show = function() {
    let theta = this.velocity.heading() - PI / 2
    push(); translate(this.position.x, this.position.y);
    rotate(theta);

    stroke(0,255,0);
    line(0,0,0, 20*this.dna[0]);
    stroke(255,0,0);
    line(0,0,0, 20*this.dna[1]);

    let gr = color(0,255,0);
    let rd = color(255,0,0);
    let col = lerpColor(rd,gr, this.health);
    fill(col); noStroke();
    beginShape();
    vertex(0, 3*this.r);
    vertex(-this.r,-this.r);
    vertex(this.r,-this.r);
    endShape(CLOSE);



    pop();
  }

  this.dead = function() {
    return (this.health < 0);
  }

  // Weights of attraction/repulsion to food/poison
  this.behaviours = function(good, bad) {
    let steerG = this.eat(good, 0.5);
    let steerB = this.eat(bad, -0.5);

    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);

    this.applyForce(steerG);
    this.applyForce(steerB);

  }

  this.eat = function(list, nutrition) {
    // find closest food
    let record = Infinity
    let closest = null;
    for (let i=0; i<list.length; i++) {
      let d = this.position.dist(list[i])
      if (d < record) {
        record = d;
        closest = i;
      }
    }

    // Seek the food, eat the food
    if (record < 5) {
      list.splice(closest,1)
      this.health += nutrition;
    } else if (closest != null){
      return this.seek(list[closest]);
    }
    return createVector(0,0);
  }

}
