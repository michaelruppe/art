// Noise study
const DOB = 250892;
let bleed = 150; // how big is the bleed off the edge of the canvas
let particles = [];
let dmax = 120;
let numBenches = 5;
let particlesPerBench = 120;
let numParticles = numBenches * particlesPerBench;
let benchRatio = 1.1; // Leave
let benchWidth;

function setup() {
	benchWidth =  dmax*2.5;
	height_ = benchWidth * numBenches;
	createCanvas(1600,height_);
	background(249,139,136);
	noiseSeed(DOB);
	randomSeed(DOB);
	benchWidth = benchRatio*height/numBenches;

	// generate particle positions along some number of "benches"
	for (let bench = 1; bench <= numBenches; bench++){
		let centreOfBench = height*(bench)/(numBenches +1 )- benchWidth/2;
		for (let i = 0; i < particlesPerBench; i++){
			let x = random(bleed, width-bleed);
			let y = centreOfBench + benchWidth*noise(0.03*x, bench);
			particles.push(new Particle(x, y));

		}
	}

	// Display the particles
	for (let i = particles.length - 1; i >= 0; i--) {
		// particles[i].update(i);		// Update location and position in array
		particles[i].linkup();		// Draw lines between particles
	}
	// Separate loop for show() so that particles are last thing drawn (no over-drawing)
	for (let i = particles.length - 1; i >= 0; i--) {
		particles[i].show();			// Show the particle
	}
}


function draw() {

}


class Particle {
	constructor(x_, y_){
		this.i = 0;
		// this.r = random(3,8);
		this.r = 3;
		this.x = x_;
		this.y = y_;
		this.v = random(1e-1,2);
		this.theta = random(TWO_PI);
		this.vx = this.v * cos(this.theta);
		this.vy = this.v * sin(this.theta);

	}


	show() {
		stroke(0); fill(0);
		strokeWeight(this.r);
		// noStroke();
		rectMode(CENTER);
		// rect(this.x, this.y, this.r,this.r);
		point(this.x,this.y);
	}

	linkup() {
		// Draw the lines between particles.
		for (let j = this.i + 1; j < particles.length; j++){ // Draw from jth element to elements after j. Save doubling up the lines.
			let v1 = createVector(this.x,this.y);
			let v2 = createVector(particles[j].x, particles[j].y);

			let v3 = v1.copy();
			v3.sub(v2);
			let d = v3.mag(); // Minimise calls to mag() by saving in variable.
			if (d <= dmax) { // save some cycles - don't bother doing calculations if distance is too great anyway.
			d = constrain(d,20,dmax);
			let alpha = map(d,0,dmax,230,20, 1);
			// stroke(205,102,204,alpha); // Pink
			// stroke(0,alpha);
			// stroke(0,75*(255/162),255,alpha);
			stroke(0,alpha);
			strokeWeight(1);
			line(this.x,this.y,particles[j].x,particles[j].y);
			// console.log(d);
			}
		}
	}



}
