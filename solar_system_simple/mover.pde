class Mover {

  PVector location;
  PVector velocity;
  PVector acceleration;
  float mass;
  float G;              // Universal Gravitational Constant

  Mover(float m, PVector focus, float r, PVector velocity_) {
    mass = m;
    location = new PVector(focus.x + r, focus.y); // Start all planets aligned for simplicity
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
    stroke(2);
    fill(175);
    //[offset-down] Scaling the size according to mass.
    ellipse(location.x, location.y, mass, mass);
  }

  // Somewhat arbitrarily, we are deciding that an object bounces when it hits the edges of a window.
  void checkEdges() {
    if (location.x > width) {
      location.x = width;
      velocity.x *= -1;
    } else if (location.x < 0) {
      velocity.x *= -1;
      location.x = 0;
    }

    if (location.y > height) {
      // Even though we said we shouldn't touch location and velocity directly, there are some exceptions.
      // Here we are doing so as a quick and easy way to reverse the direction of our object when it reaches the edge.
      velocity.y *= -1;
      location.y = height;
    } else if (location.y < 0) {
      velocity.y *= -1;
      location.y = 0;
    }
  }
}