// Simple solar system
// Simulate a solar system where all planets are attracted to the sun only.
// Orbital velocity for a circular orbit is calculated, and then randomly adjusted to produce elliptical orbits.

Mover[] planet = new Mover[10];
Mover sun;

void setup() {
  size(640, 640);

  // Planet initialisers
  float mass;
  float radius;      // Starting orbital radius
  float angle;       // Starting angle on screen
  PVector planetPos;
  PVector planetVel; // Initial planet velocity
  float destabilise = 0.2; // amound to destabilise circular orbit
  
  sun = new Mover(50, new PVector(0, 0), new PVector(0, 0));

  // Initialise the planets
  for (int i = 0; i < planet.length; i++) {
    mass = random(5, 15);
    radius = random(100, 250);
    angle = random(0, TWO_PI);

    planetPos = new PVector(radius * cos(angle), radius * sin(angle));

    // Find direction of orbit and set velocity
    planetVel = planetPos.copy();
    planetVel.rotate(PI/2);  // Direction of orbit
    planetVel.normalize();
    planetVel.mult( sqrt((sun.G * sun.mass)/(radius)) ); // Circular orbit velocity
    planetVel.mult( random( 1-destabilise, 1+destabilise) ); // create elliptical orbit
    
    planet[i] = new Mover(mass, planetPos, planetVel);
  }
}

void draw() {
  background(255);
  translate(width/2, height/2);
  for (int i = 0; i < planet.length; i++) {
    PVector force = sun.attract(planet[i]);
    planet[i].applyForce(force);

    planet[i].update();
    planet[i].display();
  }
  sun.display();
}