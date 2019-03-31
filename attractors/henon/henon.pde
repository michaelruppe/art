/* 
 * Generate Henon attractors and save
 * it seems like a good formula for an art-size print is:
 *    int numTravellers = 3000;
 *    int numPoints = 20000;
 *    float scale = 2;
 *    
 *    size(3000,3000);
 
 * for something with more sensible rendering times try numTravellers = 500, numPoints = 3000, size(500,500);
 */


int numTravellers = 1000;
int numPoints = 3000;

float scale = 2;


Henon[] travellers = new Henon[numTravellers];


color[] earthTones = {#493829, #816C5B, #A9A18C, #613318, #855723, #B99C6B, #8F3B1B, #D57500, #DBCA69, #404F24, #668D3C, #BDD09F, #4E6172, #83929F, #A3ADB8};

void setup(){
  noLoop();
  //randomSeed(271191);
  size(3000,3000);
  translate(width/2, height/2);
  background(255);
  stroke(255);
  strokeWeight(floor((float)width/500.0)); // increased stroke size for higher images means fewer points to render
  
  float x0 = 1;
  
  float a = random(TWO_PI); // use same a value for all
  for (int i=0; i < numTravellers; i++){
    //x0 = random(0,5.2);
    x0 = (float)i / (float)numTravellers * 2; // smoothly pan the starting point of the travellers
    travellers[i] = new Henon(x0, 0, a);
    
    // Select a colour from the palette
    int colIndex = int(random(earthTones.length));
    stroke(earthTones[colIndex],50);
    
    travellers[i].draw(numPoints);
  }
  
    String d = nf(day(),2); String m = nf(month(),2); String y = nf(year());
    String hr = nf(hour(),2); String mn = nf(minute(),2); String s = nf(second(),2);
    String filename = "/media/michael/ExtraDrive1/art-renders/henon-"+y+m+d+"-"+hr+mn+s+".jpg";
    saveFrame(filename);
    print("complete");
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
