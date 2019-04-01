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
