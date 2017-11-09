// Approximate the value of Pi using a Monte Carlo method
// Michael Ruppe 2017

var d = 500; // Radius of circle and 1/2 the side length of the square
var cCount = 0.0; // number of particles fallen in circle
var sCount = 0.0; // number of particles fallen in square

var points = [];
var numPoints = 100; // Number of "raindrops" to show at a time
var last = 0;		 // Track which raindrop to splice

function setup() {
	createCanvas(640,640);
	rectMode(CENTER);
	textSize(32);
	frameRate(60);
}

function draw() {
	background(255);
	translate(width/2, height/2);

	showShapes();

	var dot = createVector(random(-width/2,width/2),random(-height/2,height/2));
	points.push(dot);

	// Check if raindrop is inside a shape and increment counter

	// Inside circle AND square?
	if (dot.mag() <= d/2) {
		cCount++;
		sCount++;
		// console.log("Circle");

	// Inside square only
	} else if (abs(dot.x) < d/2 && abs(dot.y) < d/2) {
		sCount++;
		// console.log("Square");
	}

	if (points.length > numPoints){ // Remove raindrops for animation
		points.splice(points[last],1);
		last++;
		if (last > numPoints) last = 0;
	}

	for (var i = 0; i < points.length; i++){ // Display all raindrops
		stroke(0); strokeWeight(3);
		point(points[i].x, points[i].y);
	}

	// Display Results
	var pi = 4.0*(float(cCount/sCount));
	var displayText = "Pi is about \n " + nf(pi, 1,6);
	stroke(0); fill(0); strokeWeight(1);
	textAlign(CENTER);
	text(displayText,0,0);



}


function showShapes(){ // Display the overlayed circle and square
	stroke(0); strokeWeight(1);
	fill(200);
	rect(0,0, d, d);
	fill(120);
	ellipse(0,0, d, d);
}
