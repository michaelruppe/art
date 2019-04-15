// Javascript library for a quadtree

class Point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }

}


class Rectangle {
  constructor(x,y,w,h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  // check if point is inside this rectangle. The equality condition will
  // favour north east slightly, but this should be statistically unimportant.
  contains(point){
    return (
      point.x >= this.x - this.w &&
      point.x <= this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y <= this.y + this.h
    );
  }

  // Returns true if a range:rectangle overlap this rectangle?
  intersects(range){
    return !(
      range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h
    );
  }
}

class QuadTree {
  constructor(bound, capacity) {
    this.boundary = bound;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }

  insert(point) {
    // need to check if point is in my boundaries. See later than when a node is subdivided,
    // the point is passed into all 4 divisions
    if(!this.boundary.contains(point)) {
      return false; // exit if point not in this part
    }

    // if bin not full
    if (this.points.length < this.capacity){
      this.points.push(point);
      return true;
    } else {
    // subdivide if necessary
      if(!this.divided){
        this.subdivide();

      }
      //return true when point is inserted
      return(
      ( this.northeast.insert(point) ) ||
      ( this.northwest.insert(point) ) ||
      ( this.southeast.insert(point) ) ||
      ( this.southwest.insert(point) ) );
    }
  }

  subdivide() {
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w;
    let h = this.boundary.h;
    // Specify dimensions for subdivision
    let ne = new Rectangle(x + w/2, y - h/2, w/2, h/2);
    let nw = new Rectangle(x - w/2, y - h/2, w/2, h/2);
    let se = new Rectangle(x + w/2, y + h/2, w/2, h/2);
    let sw = new Rectangle(x - w/2, y + h/2,w/2, h/2);
    this.northeast = new QuadTree(ne, this.capacity);
    this.northwest = new QuadTree(nw, this.capacity);
    this.southeast = new QuadTree(se, this.capacity);
    this.southwest = new QuadTree(sw, this.capacity);

    this.divided = true;
  }

  // return an array of points inside a range:rectangle
  query(range, found) {
    if (!found) {
      found = [];
    }

    if (!this.boundary.intersects(range)) {
      return;
    } else {
      for (let p of this.points) {
        if (range.contains(p)) {
          found.push(p);
        }
      }
      if (this.divided) {
        this.northeast.query(range, found); // these still push to the found arr
        this.northwest.query(range, found); // but it doesn't matter
        this.southeast.query(range, found); // the only one that really counts
        this.southwest.query(range, found); // is the last one below
      }
    }
    return found;
  }


  show() {
    stroke(255); strokeWeight(1); noFill();
    rectMode(CENTER);
    rect(this.boundary.x, this.boundary.y, this.boundary.w*2, this.boundary.h*2);
    if(this.divided) {
      this.northeast.show();
      this.northwest.show();
      this.southeast.show();
      this.southwest.show();
    }
    strokeWeight(3);
    for(let p of this.points) point(p.x,p.y);
  }

}
