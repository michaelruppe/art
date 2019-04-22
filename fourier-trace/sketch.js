// Drawing with Epicycles and the Discrete Fourier Transform
// Michael Ruppe
// April 2019
//
// Accept a user drawing, saving the coordinates
// treat the coordinates as a 'signal' to perform DFT on
// generate epicycles from DFT analysis
// redraw the input using epicycles

let x = [];
let y = [];
let fourierX = [];
let fourierY = [];
let time = 0;
let path = [];
let userPath = [];

function setup() {
  createCanvas(600,400);

}




function draw() {
  background(0);

  // Draw the user-path
  if (userPath.length > 0) {
    push(); translate(width/2, height/2);
    console.log('path')
    beginShape(); stroke(255,150); strokeWeight(1); noFill();
    for (let i = 0; i < userPath.length; i++) {
      vertex(userPath[i].x, userPath[i].y)
    }
    endShape(CLOSE);
    pop();
  }

  // Run the epicycle drawing machine
  if (fourierX.length > 0) {
    push(); translate(width/2,height/2)
    let vx = epicycles(0,0, 0, fourierX);
    let vy = epicycles(vx.x, vx.y, HALF_PI, fourierY);
    let v = createVector(vx.x, vy.y);
    path.unshift(v);


    stroke(255,75);
    line(vx.x,vx.y,v.x,v.y);
    line(vy.x,vy.y,v.x,v.y);

    beginShape(); stroke(255); noFill();
    for (let i = 0; i < path.length; i++){
      vertex(path[i].x,path[i].y);
    }
    endShape();
    pop();




    const dt = TWO_PI / fourierY.length;
    time += dt;

    if (path.length > fourierY.length) {
      path.pop();
    }

  }

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



// reset everything on mouse-press
function mousePressed() {
  x = [];
  y = [];
  fourierX = [];
  fourierY = [];
  path = [];
  time = 0;
}

// generate path while dragging
function mouseDragged() {
  let px = mouseX - width/2;
  let py = mouseY - height/2;
  x.push(px);
  y.push(py);
  userPath.push(createVector(px,py));

}


// Perform DFT when mouse released (path is finished)
function mouseReleased() {
  fourierX = dft(x);
  fourierY = dft(y);
  userPath = [];
}
