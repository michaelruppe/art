/**
 * generate a texture I call 'perf'
 * dots of varying sizes. Experiment with different backgrounds, noStroke etc.
 */

float increment = 0.1;
int res;

OpenSimplexNoise noise;

void setup() {
  size(1000, 1000);
  noLoop();
  noise = new OpenSimplexNoise();
  
  //noStroke();
  //background(0);
  
  float xoff = 0.0; // Start xoff at 0
  float yoff = 0.0;
  res = 15;
  rows = height/res;
  cols = width/res;

  for (int i = res; i <= width; i += res) {
    xoff += increment;
    yoff = 0;
    for (int j = res; j <= height; j += res) {
      yoff += increment;
      float chance = noise(xoff, yoff);
      if (chance > 0.4) {
        int r = round(random(res/3, res));
        ellipse(i, j, r, r);
      }
    }
  }
}

void draw() {


  saveFrame("perf-preview.png");
}
