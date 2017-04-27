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
  PVector planetVel; // Initial planet velocity

  // amount by which to destabilise orbit (move away from circular)
  float tweakX;      
  float tweakY;
  PVector orbitAdjust;

  sun = new Mover(50, new PVector(0, 0), new PVector(0,0));

  // Initialise the planets
  for (int i = 0; i < planet.length; i++) {
    mass = random(5, 15);
    radius = random(75, 250);
    
    tweakY = 0.1;
    tweakX = 0.0;

    planetVel = new PVector(0, sqrt((sun.G * sun.mass)/(radius)) );
    orbitAdjust = new PVector( random(-tweakX*planetVel.y, tweakX*planetVel.y), random(tweakY*planetVel.y, tweakY*planetVel.y) );
    planetVel.add(orbitAdjust);

    planet[i] = new Mover(mass, new PVector(radius, 0), planetVel);
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