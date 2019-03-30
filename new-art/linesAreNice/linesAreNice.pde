
class Terrain {
  float yi;
  
  Terrain(float y){
    yi = y;
  }

  void display() {
    beginShape();
    noFill();
    float noiseX =  0.008 * this.yi + zoff;
    for(int i = 0; i < width; i++) {
      float noiseY =  0.005 * i + zoff;
      float noiseVal = 200 * noise(noiseX, noiseY);

      vertex(i, this.yi + noiseVal);
      
    }
    endShape();
  }

}


int resy = 100;
Terrain[] lines;
float xoff, yoff, zoff;



void setup() {
  size(1000 , 1000);
  background(255);
  noiseSeed(250892);
  
  stroke(0, 100);
  strokeWeight(1.5);
  
  zoff = 0;
  lines = new Terrain[resy];

  noiseDetail(3, 0.4);
  
  // create array of lines
  for (int i = 0; i < resy; i++) {
    float y = floor(i * 1.3*height/resy); // hack to extend above the top border
    lines[i] = new Terrain(y - 0.3*height);
    lines[i].display();
  }
  
  // again!
  zoff +=0.01;
  stroke(0, 100);

  for (int i = 0; i < resy; i++) {
    float y = floor(i * 1.3*height/resy); // hack to extend above the top border
    lines[i] = new Terrain(y - 0.3*height);
    lines[i].display();
  }
  
  


}

void draw() {


}
