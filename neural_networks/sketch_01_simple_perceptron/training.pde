// The formula for the line we want to categorise
float f(float x) {
  return 0.89 * x - 0.2;
}

// Traning data set
class Point {
  float x;
  float y;
  float bias = 1;
  int label;
  
  Point(float x_, float y_) { // Overloaded constructor function explicitly places points
    x = x_;
    y = y_;
  }
  
  Point() {                    // Regular constructor function randomly places points
    x = random(-1,1);
    y = random(-1,1);
    
    
    if (y > f(x)) {
      label = 1;
    }else{
      label = -1;
    }
  }
    float pixelX(){
      return map(x,-1,1,0,width);
    }
    
    float pixelY(){
      return map(y,-1,1,height,0);
    }
    
    void show() {
      stroke(0);
      if (label == 1) {
        fill(255);
      }else{
        fill(0);
      }
      
      float px = pixelX();
      float py = pixelY();
      ellipse(px,py,32,32);
    }
}