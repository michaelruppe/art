let mutationRate = 0.3;
let mutationAmount = 0.15;

function Vehicle(x, y, dna) {
  this.acceleration = createVector(0,0)
  this.velocity = createVector(random(-1,1), random(-1,1))
  this.position = createVector(x, y)
  this.maxspeed = 5
  this.velocity.setMag(this.maxspeed)

  this.r = 4
  this.health = 1;
  this.maxhealth = 2;
  this.maxforce = 0.3

  this.dna = [];
  if (dna === undefined) {
    this.dna[0] = random(-2,2); // food weight
    this.dna[1] = random(-2,2); // poison weight
    this.dna[2] = random(0,100); // food perception
    this.dna[3] = random(0,100); // poison perception
  } else {
    this.dna = mutate(dna);
  }


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

  this.show = function(debug) {
    let theta = this.velocity.heading() - PI / 2
    push(); translate(this.position.x, this.position.y);
    rotate(theta);

    // Debugging information
    if (debug !== undefined) {
      stroke(0,255,0); noFill();
      line(0,0,0, 20*this.dna[0]);
      ellipse(0,0, this.dna[2] * 2)
      stroke(255,0,0);
      line(0,0,0, 20*this.dna[1]);
      ellipse(0,0, this.dna[3] * 2)
    }

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
    return (this.health <= 0);
  }

  // Weights of attraction/repulsion to food/poison
  this.behaviours = function(good, bad) {
    let steerG = this.eat(good, 0.5, this.dna[2]);
    let steerB = this.eat(bad, -0.5, this.dna[3]);

    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);

    this.applyForce(steerG);
    this.applyForce(steerB);

  }

  this.eat = function(list, nutrition, perception) {
    // find closest food
    let record = Infinity
    let closest = null;
    for (let i=list.length-1; i>=0; i--) {
      let d = this.position.dist(list[i])

      // eat whatever is close enough
      if (d < this.maxspeed) {
        list.splice(i,1);
        this.health += nutrition
        constrain(this.health, 0, this.maxhealth);

      } else if (d < record && d < perception) {
        record = d;
        closest = list[i];
      }
    }

    // Seek the food, eat the food
    if (closest != null){
      return this.seek(closest);
    }
    return createVector(0,0);
  }

  // reflect desired velocity near boundaries
  this.boundaries = function() {
    let d = -25; // distance from the edge to stay away
    let desired = null;

    if (this.position.x < d) {
      desired = createVector(this.maxspeed, this.velocity.y)
    } else if (this.position.x > width - d) {
      desired = createVector(-this.maxspeed, this.velocity.y)
    }
    if (this.position.y < d) {
      desired = createVector(this.velocity.x, this.maxspeed)
    } else if (this.position.y > height - d) {
      desired = createVector(this.velocity.x, -this.maxspeed)
    }
    if (desired !== null) {
      desired.setMag(this.maxspeed);
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }

  // chance of reproduction if in good health.
  this.breed = function() {
    let healthThreshold = 0.5;
    let breedChance = 0.005;
    if (this.health >= healthThreshold && random(1) < breedChance) {
      return new Vehicle(this.position.x, this.position.y, this.dna)
    } else {
      return null;
    }
  }

  mutate = function(_dna) {
    let dna = []
    for (let i = 0; i < _dna.length; i++){
      if (random(1) < 1) {
        dna[i] = _dna[i] * random(1 - mutationAmount, 1 + mutationAmount);
      }
    }
    return dna
  }


}
