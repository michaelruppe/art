let x = [];
let y = [];
let fourierX;
let fourierY;
let time = 0;
let path = [];

function setup() {
  createCanvas(600,400);
  // for (let i = 0; i < 20; i++) {
  //   angle = map(i,0,50,0,TWO_PI)
  //   x[i] = 150*noise(angle*i/50);
  //   y[i] = 150*noise(angle*i/50 + 1000);
  // }
  //
  // fourierX = dft(x);
  // fourierY = dft(y);
}

function epicycles(x,y,rotation, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;

    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;
    x += radius * cos(freq * time + phase + rotation);
    y += radius * sin(freq * time + phase + rotation);

    stroke(255,100); noFill();
    ellipse(prevx, prevy, radius * 2);
    stroke(255);
    line(prevx, prevy, x, y);
  }

  return createVector(x,y);
}


function draw() {
  background(0);
if (fourierX) {
  let vx = epicycles(300,80, 0, fourierX);
  let vy = epicycles(70, 0.6*height, HALF_PI, fourierY);
  let v = createVector(vx.x, vy.y);
  path.unshift(v);


  stroke(255,100);
  line(vx.x,vx.y,v.x,v.y);
  line(vy.x,vy.y,v.x,v.y);

  beginShape(); stroke(255); noFill();
  for (let i = 0; i < path.length; i++){
    vertex(path[i].x,path[i].y);
  }
  endShape();




  const dt = TWO_PI / fourierY.length;
  time += dt;

  if (path.length > 250) {
    path.pop();
  }

}

}

// reset path on mouse press
function mousePressed() {
  x= [];
  y = [];
}

// generate path
function mouseDragged() {
  x.push(mouseX);
  y.push(mouseY);

}

function mouseReleased() {

  fourierX = dft(x);
  fourierY = dft(y);
}
