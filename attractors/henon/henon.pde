float scale = 2.5;
float dim = 1000.0;
int numTravellers = 2000;
float aspect;

Henon[] travelers = new Henon[numTravellers];

int numPoints = 3000;

color[] earthTones = {#493829, #816C5B, #A9A18C, #613318, #855723, #B99C6B, #8F3B1B, #D57500, #DBCA69, #404F24, #668D3C, #BDD09F, #4E6172, #83929F, #A3ADB8};

void setup(){
  //randomSeed(1657952);
  size(1000,1000);
  translate(width/2, height/2);
  aspect = (float)width/(float)height;
  background(0);
  stroke(255);
  strokeWeight(1);
  
  float a = random(TWO_PI); // use same a value for all
  for (int i=0; i < numTravellers; i++){
    float tx = random(0,5.2);
    travelers[i] = new Henon(tx,0, a);
    
    // Select a colour from the palette
    int colIndex = int(random(earthTones.length));
    stroke(earthTones[colIndex]);
    
    travelers[i].draw(numPoints);
  }
  
}

class Henon {
  float x,y,ox,oy,a;
  
  Henon(float ox_, float oy_, float a_){
    ox = ox_;
    oy = oy_;
    x = ox_;
    y = oy_;
    a = a_;
  }
  
  
  void update() {
    float sina = sin(a);
    float brkt = (y - x*x);
    float cosa = cos(a);
    float temp = x * cosa - brkt * sina;
    y = x * sina + brkt * cosa;
    x = temp; 
    
    // render proportional to the window size
    point((x/scale)*width, (y/scale)*height);
  }
  
  void draw(int iterations) {
    for (int i=0; i < iterations; i++) {
      update();
    }
  }
  
}
