/*******************************************************************************
 * Firefly -  Flickering fireflies will attempt to synchronise with their
 *            neightbours.
 * Michael Ruppe
 * April 2019
 *
 * The fireflies flicker for now, but I haven't implemented the synchronisation
 * behaviour - fireflies should be influenced by their neightbours' behaviour.
 ******************************************************************************/

let fireflys = [];
let frameCount = 1;

function setup() {
  createCanvas(600,400);
  frameRate(30);
  for(let i=0; i<(width*height/5000); i++){
    fireflys[i] = new Firefly(random(width),random(height));
  }

  //once all fireflys generated, populate each with a list of neighbour IDs
  for(let i=0; i<fireflys.length; i++){
    for(let j=0; j<fireflys.length; j++){
      if(i == j) continue; //no need to compare against self
      // ToDo Radius
      if (abs(fireflys[i].x - fireflys[j].x) < 100 && abs(fireflys[i].y - fireflys[j].y) < 100){
        // close neighbours
        fireflys[i].neighbours.push(fireflys[j]);
      }
    }
  }
  // fireflys[0].wait = fireflys[1].wait;
}

function draw() {
  background(0);
  for(let i=0; i<fireflys.length; i++){
    fireflys[i].update();
    fireflys[i].show();

    // TODO
    //Evolve the timing to better suit neighbours
    //check if neighbours states are different.
    //if different, nudge start time/end time

  }

  frameCount++;
}

function Firefly(x,y) {
  this.x = x;
  this.y = y;
  this.start = floor(random(-100,100));
  if (this.start <= 0){
    this.state = 'on';
  }else{
    this.state = 'off'
  }
  this.duration = floor(random(20,100));
  this.end = this.start + this.duration;

  this.neighbours = [];

  this.update = function(){
    //Determine when to blink on/off given current timing parameters
    if (frameCount > this.start && this.state == 'off') {
      this.state = 'on';
      this.end = frameCount + this.duration;
    }
    else if (frameCount > this.end && this.state == 'on'){
      this.state = 'off';
      this.start = frameCount + this.duration;;
    }

    // at transition to on, check state of neighbours and nudge time
    for(let i in this.neighbours) {
      if(this.state == 'off' && i.state == 'on'){

      }
      // check if neighbour is different state
      if (this.start > i.start) this.start -= 5;
      else if (this.start < i.start) this.start += 5;
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
