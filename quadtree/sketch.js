let qt;

function setup() {
  createCanvas(600,600)


  // Create the quadtree
  let boundary = new Rectangle(width/2, height/2, width/2, height/2);
  qtree = new QuadTree(boundary, 8);
  console.log(qtree)

  // random points distribute too evenly to really test the quadtree
  for (let i = 0; i < 1000; i++) {
    let x = randomGaussian(width/2, width/8);
    let y = randomGaussian(height/2, height/8);
    let p = new Point(x,y);
    qtree.insert(p);
  }




}

function draw() {
  background(0);
  qtree.show();

  stroke(0,255,0);
  rectMode(CENTER);
  let range = new Rectangle(mouseX,mouseY,60,60);
  rect(range.x, range.y, range.w*2, range.h*2);
  let points = qtree.query(range);
  for (let p of points) {
    stroke(0,255,0);
    point(p.x,p.y);
  }

}
