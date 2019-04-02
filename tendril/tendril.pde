/*
 * Create some nice plasma tendril vibes.
 * Change the characteristics by altering the s, r, and mag constants in the field() function
 * Trying my hand at coding an effect found at: https://necessarydisorder.wordpress.com/2017/11/15/drawing-from-noise-and-then-making-animated-loopy-gifs-from-there/
 *
 */

final int trajLength = 200;   // Length of each trajectory from starting point. Higher means longer tendrils
final int totalFrames = 100;  // Number of frames to record
final int bleed = 200;        // The amount of space to leave around the animation. Should be a factor of width & height. 
final int gridRes = 5;        // Smaller than 5 doesn't make much difference to the final result


OpenSimplexNoise noiseOS;

void setup() {
  size(600, 600);
  noiseOS = new OpenSimplexNoise((int) random(1,1000));
  background(0);
}

void draw() {
  background(0);  
  noFill();
  stroke(255, 30);
  
  // spaced grid, leaving bounds for tendrils to extend into
  for (int i = bleed; i <= width - bleed; i += gridRes) {
    for (int j = bleed; j <= height - bleed; j += gridRes) {

      // Place a point at its starting location within a grid
      float x = i;
      float y = j;
      point(x, y);

      // Then drag point along some trajectory in the current frame
      for (int k = 0; k < trajLength; k++) {
        PVector dPoint = field(x, y, totalFrames);
        x += dPoint.x;
        y += dPoint.y;
        point(x, y);
      }
    }
  }
  
  saveFrame("output/###.png");
  
  // Show progress and stop when rendered all frames
  String percent = nf(100*frameCount/totalFrames, 0);
  println("Progress: " + percent + "%");
  if (frameCount == totalFrames) {
    println("*** Finished ***");
    stop();
  }
}


// Field function to calculate x,y trajectories for a given frame.
// Input (x,y), and returns a vector for (x_next, y_next). This can be looped for a trajectory length for a single frame.
// Additional arguments for frame# and total#frames are for rendering a seamlessly looping gif

PVector field(float x, float y, int totalFrameNum) {

  final float s = 0.02;  // Scale for noise-change from one ordinate point to the next.
  final float r = 0.3;   // Radius of noise space
  final float mag = 4.0; // Scaling constant

  float prog = TWO_PI * (frameCount - 1) / totalFrameNum; // Animation progress 0 -> 1, converted to revolutions
  float sx = s*x;
  float sy = s*y;
  float rcosP = r*cos(prog);
  float rsinP = r*sin(prog);

  // Calculate change in (x,y). Move through toroidal noise space to create seamless loop for animation.
  float dx = (float) noiseOS.eval(sx, sy, rcosP, rsinP);
  float dy = (float) noiseOS.eval(sx, sy, rcosP + 1000, rsinP + 1000); // offset by 1000 to make dy "independent" of dx

  // Hack: noise never truly seems to hit it's limits. So multiply by 4 (Preserve numerical precision by going through 400/100)
  dx *= 400.0;
  dy *= 400.0;
  dx = (int) Math.round(dx)/100.0;
  dy = (int) Math.round(dy)/100.0;

  // output scaling
  dx *= mag;
  dy *= mag;

  return new PVector(dx, dy);
}
