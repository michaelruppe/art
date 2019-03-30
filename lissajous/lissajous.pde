float angle = 0;
int w = 80;  // width of the circle 'footprint'?
int rows;
int cols;
int frameNum = 0;
Curve[][] curves;



void setup() {
  //fullScreen(P2D);
  size(400, 400, P2D);
  cols = floor(width / w) - 1;
  rows = floor(height / w) - 1;
  curves = new Curve[rows][cols];

  for (int i = 0; i < cols; i++) {
    for (int j = 0; j < rows; j++) {
      curves[j][i] = new Curve();
    }
  }
}


void draw() {
  background(0);
  float d = 0.8*w; // diameter - leave some space between circles
  float r = d/2;

  for (int i = 0; i < cols; i++) {
    // find the centre of ith circle and draw that circle
    float cx = w + i*w + w/2;
    float cy = w/2;
    stroke(255); 
    strokeWeight(2); 
    noFill();

    ellipse(cx, cy, d, d);

    // draw the point which tracks the angle
    float x = r * cos(angle * (i+1) - HALF_PI);
    float y = r * sin(angle * (i+1) - HALF_PI);
    stroke(255); 
    strokeWeight(8);
    point(cx+x, cy+y);
    stroke(255, 100); 
    strokeWeight(2);
    line(cx + x, cy+y, cx+x, height);

    // save that ordinate for all curves in this column
    for (int j = 0; j < rows; j++) {
      curves[j][i].setX(cx + x);
    }
  }
  for (int j = 0; j < rows; j++) {
    // find the centre of ith circle and draw that circle
    float cx = w/2;
    float cy = w + j*w + w/2;
    stroke(255); 
    strokeWeight(2); 
    noFill();

    ellipse(cx, cy, d, d);

    // draw the point which tracks the angle
    float x = r * cos(angle * (j+1) - HALF_PI);
    float y = r * sin(angle * (j+1) - HALF_PI);
    stroke(255); 
    strokeWeight(8);
    point(cx+x, cy+y);
    stroke(255, 100); 
    strokeWeight(2);
    line(cx + x, cy+y, width, cy+y);

    // save that ordinate for all curves in this row
    for (int i = 0; i < rows; i++) {
      curves[j][i].setY(cy + y);
    }
  }

  // save the co-ordinates for every curve and display them
  for (int i = 0; i < cols; i++) {
    for (int j = 0; j < rows; j++) {
      if (angle > -TWO_PI) { // Don't save points that we don't need to. save limited frames
        curves[j][i].addPoint();
        curves[j][i].showPath();
        //if (frameNum % 3 == 0) saveFrame("line-######.jpg");
      } else {
        curves[j][i].showPath();
      }
    }
  }
  angle -= 0.01;
  frameNum++;
}
