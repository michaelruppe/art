// Attractor structure referenced in
// http://www.complexification.net/gallery/machines/peterdejong/

// first
//float a = 1.1;
//float b = 1;
//float c = 1.8515863;
//float d = 2.1974306;

// another
//float a = 3.141;
//float b = 1.2345;
//float c = 1.8515863;
//float d = 2.1974306;


//float a = 1.1;
//float b = 1;
//float c = 1.8515863;
//float d = 2.1974306;

//float a = 1.254896;
float b = 1.75532479;
float c = 1.7566621;
float d = 2.248562;

float a = 1.63700253;


float scl = 200;

// GIF recording

float x = 0;
float y = 0;

int bufferLen = 200000;

void setup() {
  size(900,900);

}

void draw() {
    background(255);
    translate(width/2,height/2);

    stroke(0);
    strokeWeight(0.31);

    drawAttractor();
    a+=0.01; // Here's where the magic happens baby
   //capture gif
   saveFrame("frames/####.tif");

}



void drawAttractor() {
  for (int i=1; i < bufferLen; i++){
    float xNext = sin(a*y) - cos(b*x);
    float yNext = sin(c*x) - cos(d*y);

    point(x*scl, y*scl);

    x = xNext;
    y = yNext;
  }
}