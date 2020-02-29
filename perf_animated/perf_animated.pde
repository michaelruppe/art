/******************************************
 * Perf (Animated)
 * Michael Ruppe, Feb 2020
 *
 * A noise study - generate island masses and texture with ellipses
 *
 *****************************************/

float increment = 0.1;


OpenSimplexNoise noise;

  float xoff = 0.0; // Start xoff at 0
  float yoff = 0.0;
  float zoff = 0.0;
  int res = 15;
int rows, cols;

void setup() {
  size(1000, 1000);
  int rows = height/res;
  int cols = width/res;

  noise = new OpenSimplexNoise();

}

void draw() {
  background(0);
  stroke(255);
  xoff=0;
  yoff=0;
  zoff += 0.01;
  for (int i = res; i <= width; i += res) {
    xoff += increment;
    yoff = 0;
    for (int j = res; j <= height; j += res) {
      yoff += increment;
      float chance = noise(xoff, yoff, zoff);


      if (chance > 0.4) {
        // Shimmery pattern
        //float r = random(res/3, res) * noise(xoff,yoff,zoff);
        
        // Islands
        float r = res* (noise(xoff,yoff,zoff))*1.3;
        ellipse(i, j, r, r);
      }


    }
  }

  //saveFrame("perf-preview.png");
}
