int d = 120;
int nx, ny, numScales;
float overlap = 0.7;
Scaly[] scales;
int randomSeed = 0;
float jaggedness = 0.1;
float jstep = 0.01;

void setup() {
  int x = round(nx*d*overlap);
  int y = round(ny*d*overlap);
  size(600, 800);
  nx = round(width / d / overlap)-1;
  ny = round(height / d / overlap)-1;
  numScales = nx*ny;
  scales = new Scaly[numScales];
  background(255);
  stroke(0);
  int index = 0;
  for (int i = ny; i > 0; i--) {
    for (int j = nx; j > 0; j--) {
      scales[index] = new Scaly(overlap*j*d, overlap*i*d, d/2);
      index++;
    }
  }
}

void draw() {
  background(255);
  for (Scaly s : scales) {
    s.jaggedness = jaggedness;
    s.show();
  }
  jaggedness += jstep;
  if(jaggedness > 0.25 || jaggedness < 0.1) jstep*=-1;
}

class Scaly {
  float x, y, r, jaggedness = 0.1;
  OpenSimplexNoise noise;
  Scaly (float _x, float _y, float _r) {
    x=_x;
    y=_y;
    r=_r;
    noise = new OpenSimplexNoise(randomSeed++);
  }
  void show() {
    stroke(0);
    strokeWeight(2);
    ellipse(x, y, r, r);

    beginShape();
    int numPoints = 50;
    for (int i = 0; i < numPoints; i++) {
      float theta = float(i) / float(numPoints) * TWO_PI;
      float c = cos(theta);
      float s = sin(theta);
      double n = noise.eval(c, s, 0.02*float(frameCount)) * r * jaggedness;
      float rad = (float)n + r;
      vertex(x+rad*c, y+rad*s);
    }
    endShape(CLOSE);
  }
}
