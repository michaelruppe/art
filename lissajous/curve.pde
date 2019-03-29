// stores the path

class Curve {
  ArrayList<PVector> path; // ArrayList is a flexibly sized array. In p5 you would just declare let path = [];
  PVector current; // a placeholder vector that x and y are loaded into separately.

  Curve() {
    path = new ArrayList<PVector>(); // an empty array list
    current = new PVector();
  }


  // So instead we have to populate x and y properties separately.
  void setX(float x) {
    current.x = x;
  }
  void setY(float y) {
    current.y = y;
  }
  // Useless becase we wrote the loops as separate. Begging to be refactored
  void addPoint() {
    path.add(current);
    stroke(255);
    strokeWeight(8);
    point(current.x, current.y);
    current = new PVector(); // finally, reset current for use with next point.
  }

  void showPath() {
    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for (PVector v : path) {
      vertex(v.x, v.y);
    }
    endShape();
  }
}
