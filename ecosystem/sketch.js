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
  for (let i = 0; i < 50; i++){
    vehicles.push( new Vehicle(random(width), random(height)) );
  }
  for (let i = 0; i < 30; i++){
    food.push(createVector(random(width),random(height)));
  }
  for (let i = 0; i < 20; i++){
    poison.push(createVector(random(width),random(height)));
  }
}

function draw() {
  background(51);

  if (random(1) < 0.075) food.push(createVector(random(width),random(height)));
  if (random(1) < 0.01 && poison.length < 50) poison.push(createVector(random(width),random(height)));
  for (let i = 0; i < food.length; i++){
    fill(0,255,0); noStroke();
    ellipse(food[i].x, food[i].y, 4 ,4);
  }
  for (let i = 0; i < poison.length; i++){
    fill(255,0,0); noStroke();
    ellipse(poison[i].x, poison[i].y, 4 ,4);
  }

  for (let i = vehicles.length-1; i >= 0; i--) {
    vehicles[i].boundaries()
    vehicles[i].behaviours(food, poison)
    vehicles[i].update()
    vehicles[i].show()

    var newVehicle = vehicles[i].breed();
    if (newVehicle != null) {
      vehicles.push(newVehicle);
    }

    if (vehicles[i].dead()) {
      food.push( createVector(vehicles[i].position.x, vehicles[i].position.y) ); // leave food behind
      vehicles.splice(i,1);
    }


  }

}
