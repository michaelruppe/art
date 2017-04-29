// Create the Barnsley fern
// https://en.wikipedia.org/wiki/Barnsley_fern

var cur; 			// The current point
var scaler = 70; 	// Scale up the fern so it is visible

function setup() {
	createCanvas(800,800);
	background(200);

	cur = createVector(0,0); // Fern starts at origin
	point(cur.x,cur.y);

}

function draw() {
	translate(width/2,height-20);
	stroke(0, 255, 0);
	strokeWeight(4);

	// Update the next location of the point according to the formulae
	var chance = random();
	if ( chance <= 0.01 ) {			// 1% chance
		cur = createVector(0, 0.16 * cur.y);
	} else if ( chance <= 0.07 ) { 	// 7% chance
		cur = createVector(0.2 * cur.x - 0.26 * cur.y, 0.23 * cur.x + 0.22 * cur.y + 1.6);
	} else if ( chance <= 0.14 ) {	// 7% chance
		cur = createVector( -0.15 * cur.x + 0.28 * cur.y, 0.26 * cur.x + 0.24 * cur.y + 0.44);
	} else {						// 85% chance
		cur = createVector(0.85 * cur.x + 0.04 * cur.y, -0.04 * cur.x + 0.85 * cur.y + 1.6);
	}
	
	// Scale and show the current point
	var show = p5.Vector.mult(cur,scaler);
	point(show.x, -show.y);
  
}