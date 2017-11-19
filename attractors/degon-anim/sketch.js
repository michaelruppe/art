// Attractor structure and constants from
// http://www.complexification.net/gallery/machines/peterdejong/
let a,b,c,d;
// Jong's constants
// a = -0.89567065;
// b = 1.5909586;
// c = 1.8515863;
// d = 2.1974306;

// my own
a = 2.89567065;
b = 1.5909586;
c = 1.8515863;
d = 2.1974306;

// another
a = 1.1;
b = 1;
c = 1.8515863;
d = 2.1974306;



let scl = 200;

let x = 0;
let y = 0;

let bufferLen = 2e5;

function setup() {
	createCanvas(900,900);

}

function draw() {
	background(255);
	translate(width/2,height/2);

	stroke(0);
	strokeWeight(0.31);

	drawAttractor();
	a+=0.05; // Here's where the magic happens baby

}

function drawAttractor() {
	for (i=1; i < bufferLen; i++){
		xNext = sin(a*y) - cos(b*x);
		yNext = sin(c*x) - cos(d*y);

		point(x*scl, y*scl);

		x = xNext;
		y = yNext;
	}
}
