// Attractor structure and constants from
// http://www.complexification.net/gallery/machines/peterdejong/

let a = -0.89567065;
let b = 1.5909586;
let c = 1.8515863;
let d = 2.1974306;

let scl = 200;

let x = 0;
let y = 0;

let bufferLen = 5e5;

function setup() {
	createCanvas(900,900);
	background(255);
	translate(width/2,height/2);

	stroke(0);
	strokeWeight(0.31);

	for (i=1; i < bufferLen; i++){
		xNext = sin(a*y) - cos(b*x);
		yNext = sin(c*x) - cos(d*y);

		point(x*scl, y*scl);

		x = xNext;
		y = yNext;
	}
	noLoop();
}

function draw() {
	// translate(width/2,height/2);
	//
	// for (i=1; i < bufferLen; i++){
	// 	x[i] = sin(a*y[i-1]) - cos(b*x[i-1]);
	// 	y[i] = sin(c*x[i-1]) - cos(d*y[i-1]);
	//
	// }
	//
	// for (i=0; i < bufferLen; i++){
	// 	point(x[i]*scl, y[i]*scl);
	// }
	//
	// arrayCopy(x,bufferLen,x,0,1);
	// arrayCopy(y,bufferLen,y,0,1);
	// x[0] = x[20];
	// y[0] = y[20];

}
