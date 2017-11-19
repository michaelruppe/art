// morph/03 ported to processing to save a video


int numPoints = 400;
float theta = 0;
float r;
float offset = 0;
int frame = 0;


float inc = 4e-3;
float size = 400;
int alpha = 24;

void setup() {
  size(1080,1080);
  background(255);
  r = min(width,height) / 2;
}


void draw() {
  strokeWeight(3);
  noFill();
  translate(width/2, height/2);


  // Draw the eerie shape
  stroke(0,alpha);
  drawShape(offset);

  // Erase the eerie shape as you go.
  if (frame > size) {
    stroke(255,alpha);
    drawShape(offset - size*inc);
  }

  offset += inc;
  frame++;
  
  saveFrame("frames/####.tif");

}


// Starts with a unit circle and uses points on it as inputs to the noise function
// the noise then changes the radius of a much larger circle.
void drawShape(float ofs) {
  beginShape();
  for (theta = 0; theta <= TWO_PI + TWO_PI/numPoints; theta += (TWO_PI / numPoints) ) {
    // use the unit circle (x,y) points as inputs for the noise function
    float x = 0.5 * cos(theta)+1;
    float y = 0.5 * sin(theta)+1;

    // Add noise
    float xn = r* (noise(x,y,ofs)) * cos(theta);
    float yn = r* (noise(x,y,ofs)) * sin(theta);

    vertex(xn , yn);
  }
  endShape();
}