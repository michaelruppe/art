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

let helpButton;
let helpState = false;  // show the help text or not
let canReset = true;   // enables and disables clearing of the screen

function setup() {
  createCanvas(windowWidth,windowHeight);
  helpButton = createButton('?');
  helpButton.position(0.95*width, 0.95*height);
  helpButton.mousePressed(showHelp);
  helpButton.mouseOver(disableReset);
  helpButton.mouseOut(enableReset);
}




function draw() {
  background(0);

  // display nice text when no path
  if (fourierX.length == 0) {
    noStroke(); fill(255,100);
    textSize(40); textAlign(CENTER)
    text("Draw Something",width/2,height/2);

  }

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

    // The Path
    beginShape(); stroke(255); noFill();
    for (let i = 0; i < path.length; i++){
      vertex(path[i].x,path[i].y);
    }
    endShape();
    ellipse(path[0].x,path[0].y, 10,10)
    pop();

    const dt = TWO_PI / fourierY.length;
    time += dt;

    if (path.length > fourierY.length) {
      path.pop();
    }

  }


  // Help Text
  if (helpState) {

    noStroke(); fill(75,0,130, 50);
    rectMode(CENTER);
    rect(width/2,height/2,0.8*width,0.8*height);
    noStroke(); fill(255)
    str = "The line you draw is re-created using Epicycles: circles whose centres move around the circumference of a larger one.\nBy stacking many of these epicycles with different sizes and rotation speeds, you can reconstruct any line"
    textSize(16)
    text(str, width/2, height/2, 0.6*width, 0.6*height);

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

    stroke(255,50); noFill();
    ellipse(prevx, prevy, radius * 2);
    stroke(255,150);
    line(prevx, prevy, x, y);
  }
  return createVector(x,y);
}



// reset everything on mouse-press
function mousePressed() {
  if (canReset) {
    x = [];
    y = [];
    fourierX = [];
    fourierY = [];
    path = [];
    time = 0;
  }
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


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function showHelp() {
  helpState = !helpState;
}

function disableReset() {
  canReset = false;
}

function enableReset() {
  canReset = true;
}
