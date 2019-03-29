class Terrain {
  float yi;
  
  Terrain(float y){
    yi = y;
  }

  void display(int strokeWeight, int alpha) {
    stroke(strokeWeight, alpha);
    float noiseX =  0.006 * this.yi + zoff;
    for(int i = 0; i < width; i++) {
      float noiseY =  0.01 * i + zoff;
      float noiseVal = 200 * noise(noiseX, noiseY);
      point(i,this.yi + noiseVal);
    }
  }

}




int resy = 100;
Terrain[] lines;
float xoff, yoff, zoff;



void setup() {
  size(600 , 600);
  background(255);
  stroke(0,150);
  noiseSeed(270991);
  
  zoff = 0;
  lines = new Terrain[resy];

  //noiseDetail(4 , 0.4);
  
  // create array of lines
  for (int i = 0; i < resy; i++) {
    float y = floor(i * height/resy);
    lines[i] = new Terrain(y);
    lines[i].display(1, 130);
  }
  
  


}

void draw() {


}
