/**
 * Noise3D. 
 * 
 * Using 3D noise to create simple animated texture. 
 * Here, the third dimension ('z') is treated as time. 
 */

float increment = 0.1;
// The noise function's 3rd argument, a global variable that increments once per cycle
float zoff = 0.0;  
// We will increment zoff differently than xoff and yoff
float zincrement = 0.02; 
int rows, cols, res;

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

  // Optional: adjust noise detail here
  // noiseDetail(8,0.65f);

  //loadPixels();

  //float xoff = 0.0; // Start xoff at 0

  //// For every x,y coordinate in a 2D space, calculate a noise value and produce a brightness value
  //for (int x = 0; x < width; x++) {
  //  xoff += increment;   // Increment xoff 
  //  float yoff = 0.0;   // For every xoff, start yoff at 0
  //  for (int y = 0; y < height; y++) {
  //    yoff += increment; // Increment yoff

  //    // Calculate noise and scale by 255
  //    float bright = (float) noise.eval(xoff, yoff, zoff)*255;
  //    bright = map(bright, 0, 1, 0, 255);


  //    // Try using this line instead
  //    //float bright = random(0,255);

  //    // Set each pixel onscreen to a grayscale value
  //    pixels[x+y*width] = color(bright, bright, bright);
  //  }
  //}
  //updatePixels();

  zoff += zincrement; // Increment zoff
  saveFrame("perf-temp.png");
}
