int trajLength = 200;
int totalFrames = 100;


int frame = 0;


int bleed = 150; // The amount of space to leave around the animation. Should be a factor of width & height. 


OpenSimplexNoise noiseOS;

void setup(){
  size(500,500);
  noiseOS = new OpenSimplexNoise();
  background(0);

}

void draw() {
  background(0); stroke(255);  noFill();
  // spaced grid, leaving bounds for tendrils to extend
  for (int i = bleed; i <= width - bleed; i+=5) {
    for (int j = bleed; j <= height - bleed; j+=5) {
      
      // Place a point at its starting location within a grid
      float x = i;
      float y = j;
      point(x,y);
      
      // Then drag point along some trajectory in the given frame
      for (int k = 0; k < trajLength; k++) {
        PVector dPoint = field(x, y, frame, totalFrames);
        x += dPoint.x;
        y += dPoint.y;
        point(x, y);

        
      }
      
      
      
    }
  }
  frame++;
  percent = nf(100*frame/totalFrames,0);
  println("Progress: " + percent + "%");
  
  saveFrame("output/###.png");
  if (frame == totalFrames) {
    println("finished");
    stop();
  }
}


// Field function to calculate x,y trajectories for a given frame.
// Input (x,y), and returns a vector for (x_next, y_next). This can be looped for a trajectory length for a single time frame.
// Additional arguments for frame# and total#frames can close the loop seamlessly for rendering a looping gif

PVector field(float x, float y, int frameNum, int totalFrameNum) {
  
  final float s = 0.03;  // Scale for noise-change from one grid point to the next
  final float r = 0.5;   // Radius of noise space
  final float mag = 4.0; // Scaling constant
  
  float prog = TWO_PI * frameNum / totalFrameNum; // Animation progress 0 -> 1, converted to revolutions
  float sx = s*x;
  float sy = s*y;
  float rcosP = r*cos(prog);
  float rsinP = r*sin(prog);
  
  // Calculate change in (x,y). Move through toroidal noise space to create seamless loop for animation.
  float dx = (float) noiseOS.eval(sx, sy, rcosP, rsinP);
  float dy = (float) noiseOS.eval(sx, sy, rcosP + 1000, rsinP +1000); // offset by 1000 to make dy "independent" of dx
  dx += 400.0;
  dy += 400.0;
  
  dx = (int) Math.round(dx)/100.0;
  dx = (int) Math.round(dy)/100.0;
  // output scaling
  dx *= mag;
  dy *= mag;
  //if(random(1) < 0.02) println(dx, dy);

  return new PVector(dx, dy);
}
