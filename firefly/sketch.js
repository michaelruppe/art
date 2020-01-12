/*******************************************************************************
 * Title - Description
 * Michael Ruppe
 * April 2019
 *
 * Long description
 ******************************************************************************/

let fireflys = [];
let frameCount = 1;

function setup() {
  createCanvas(600,400);
  frameRate(30);
  for(let i=0; i<(width*height/5000); i++){
    fireflys[i] = new Firefly();
  }

}

function draw() {
  background(0);
  for(let i=0; i<fireflys.length; i++){
    fireflys[i].update();
    fireflys[i].show();
  }

  frameCount++;
}

function Firefly() {
  this.x = random(width);
  this.y = random(height);
  this.wait = floor(random(75,300));
  this.duration = floor(random(20,100));
  this.state = random(['on', 'off']);
  this.state == 'on' ? this.start = -floor(random(this.wait)) : this.start //initialise start variable if initial state is 'on'. Don't initialise to 0 because the start looks unnatural

  this.update = function(){
    //determine on/off state
    if (frameCount % this.wait == 0 && this.state == 'off') {
      this.state = 'on';
      this.start = frameCount;
    }
    else if (frameCount - this.start >= this.duration){
      this.state = 'off';
    }
  }

  this.show = function(){
    if (this.state == 'on') {
      fill(200,255,0); noStroke();
      ellipse(this.x,this.y,8,8);
    } else {
      fill(255,50); noStroke();
      ellipse(this.x,this.y,8,8);
    }
  }
}
