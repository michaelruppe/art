float x, y, z;
float a = 0.1;
float b = 0.1;
float c = 14;

void setup() {
  size(800,800, P3D);
  x=0;
  y=0;
  z=0;
  stroke(0);
  
}

void draw() {
  translate(width/2,height/2);
  point(x,y,z);
  float dx = -y-z;
  float dy = x+a*y;
  float dz = b + z*(x-c);
  
  x+=dx;
  y+=dy;
  z+=dz;
  
}