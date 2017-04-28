class Mover {

  PVector location;
  PVector velocity;
  PVector acceleration;
  float mass;
  float G;              // Universal Gravitational Constant

  Mover(float mass_, PVector location_, PVector velocity_) {
    mass = mass_;
    location = location_;
    velocity = velocity_;
    acceleration = new PVector(0, 0);
    G = 10;
  }

  void applyForce(PVector force) {
    PVector f = PVector.div(force, mass);
    acceleration.add(f);
  }

  void update() {
    velocity.add(acceleration);
    location.add(velocity);
    acceleration.mult(0);  // Remember to clear acceleration so it is not accumulated across frames.
  }

  PVector attract(Mover m) {
    PVector force = PVector.sub(location, m.location);
    float distance = force.mag();

    // Constrain force if distance is zero
    if (distance == 0) {
      force.mult(0);
    } else {
      force.normalize();
      float strength = (G * mass * m.mass) / (distance * distance);
      force.mult(strength);
    }
    return force;
  }

  void display() {
    fill(175);
    ellipse(location.x, location.y, mass, mass);
  }
}