let m = 1;
let l = 1;
let g = 9.8;

let theta1;
let theta2;

let dtheta1;
let dtheta2;

let x1,x2,y1,y2;

let p1,p2,dp1, dp2;
function setup() {
  createCanvas(400,400);
  background(127);
  theta1 = random(-PI,PI);
  theta2 = random(-PI,PI);

}

function draw() {
  background(127);
  translate(width/2,height/2);

  p1 = 1/6 * m*l^2 * (8*dtheta1 + 3*dtheta2*cos(theta1-theta2));
  p2 = 1/6 * m*l^2 * (2*dtheta1 + 3*dtheta1*cos(theta1-theta2));

  dtheta1 = 6/(m*l^2) * (2*p1 - 3*cos(theta1-theta2)*p2)/(16-9*cosSquared(theta1-theta2));
  dtheta2 = 6/(m*l^2) * (8*p2 - 3*cos(theta1-theta2)*p1)/(16-9*cosSquared(theta1-theta2));

  dp1 = -0.5*m*l^2 * (dtheta1 * dtheta2 * sin(theta1-theta2) + 3*(g/l)*sin(theta1));
  dp2 = -0.5*m*l^2 * (-dtheta1 * dtheta2 * sin(theta1-theta2) + (g/l)*sin(theta2));

  let h = 0.005;
  theta1 += (100.0* dtheta1*h)/100.0;
  theta2 += (100.0* dtheta2*h)/100.0;
  p1 += dp1*h;
  p2 += dp2*h;

  let sc = 50;
  x1 = sc*l/2 * sin(theta1);
  y1 = -sc*l/2 * cos(theta1);
  x2 = sc*l*(sin(theta1) + 0.5*sin(theta2));
  y2 = -sc*l*(cos(theta1) + 0.5*cos(theta2));

  line(0,0,x1,y1);
  line(x1,y1,x2,y2);

}

// State models
function model_p1(state) {
  return 1/6 * m*l^2 * (8*dtheta1 + 3*dtheta2*cos(theta1-theta2));
}
function model_p2(state) {
  return 1/6 * m*l^2 * (2*dtheta1 + 3*dtheta1*cos(theta1-theta2));
}
function model_dtheta1(state) {
  return 6/(m*l^2) * (2*p1 - 3*cos(theta1-theta2)*p2)/(16-9*cosSquared(theta1-theta2));
}
function model_dtheta2(state) {

}


state_next = function model(state) {
  p1 = 1/6 * m*l^2 * (8*dtheta1 + 3*dtheta2*cos(theta1-theta2));
  p2 = 1/6 * m*l^2 * (2*dtheta1 + 3*dtheta1*cos(theta1-theta2));

  dtheta1 = 6/(m*l^2) * (2*p1 - 3*cos(theta1-theta2)*p2)/(16-9*cosSquared(theta1-theta2));
  dtheta2 = 6/(m*l^2) * (8*p2 - 3*cos(theta1-theta2)*p1)/(16-9*cosSquared(theta1-theta2));

  dp1 = -0.5*m*l^2 * (dtheta1 * dtheta2 * sin(theta1-theta2) + 3*(g/l)*sin(theta1));
  dp2 = -0.5*m*l^2 * (-dtheta1 * dtheta2 * sin(theta1-theta2) + (g/l)*sin(theta2));

}

function rk4(y, x, dx, f) {
    var k1 = dx * f(x, y),
        k2 = dx * f(x + dx / 2.0,   +y + k1 / 2.0),
        k3 = dx * f(x + dx / 2.0,   +y + k2 / 2.0),
        k4 = dx * f(x + dx,         +y + k3);

    return y + (k1 + 2.0 * k2 + 2.0 * k3 + k4) / 6.0;
}

function cosSquared(ang) {
  return (1+cos(2*ang)/2);
}
