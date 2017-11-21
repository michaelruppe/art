let numPoints = 7500;
let frameNum = 0;
let x = [];
let y = [];
let r;

function setup() {
	createCanvas(windowWidth, windowHeight);
	translate(width/2, height/2);
	background(255);
	strokeWeight(2);
	stroke(0);

	r = min(width,height)/100;

	let buffer = 30;
	// Generate points
	for (i=0; i <= numPoints; i++) {
		x[i] = random(-width/2 - buffer, width/2 + buffer);
		y[i] = random(-height/2 - buffer, height/2 + buffer);
		point(x[i],y[i]);
	}
}


function draw() {
	background(255);

	// let angle = 0.1* sin(frameNum/20);
	angle = 0.025;


	frameNum++;
	tx = r * sin(frameNum / 20);
	ty = r * cos(frameNum / 20);

	translate(width/2, height/2);
	for (i=0; i<= numPoints; i++) {
		point(x[i],y[i]);
	}
		rotate(angle);
		translate(tx,ty);
	for (i=0; i<= numPoints; i++) {
		point(x[i],y[i]);
	}

}
