/*******************************************************************************
 * Particle - Emulate a popular stock-background effect
 * Michael Ruppe
 *
 * Probably 80% of the way there - all that remains are the artistic colours
 * and tuning.
 ******************************************************************************/

let numParticles;
let bleed = 100; // how big is the bleed off the edge of the canvas
let particles = [];
let dmax = 250;  // maximum distance to draw links

function setup() {
	let canvas = createCanvas(600, 600);
	canvas.parent('sketch-holder');

	// Create some particles based on screen size and desired density
	const particleDensity = 100 / (1920*1080); // Particles per unit-screen-area
	numParticles = (width*height) * particleDensity;
	for (let i = 0; i < numParticles; i++){
		particles[i] = new Particle(random(-bleed, width+bleed), random(-bleed, height+bleed));
	}

}


function draw() {
	console.log(frameRate());
	background(color('#2C001E')); // Aubergine
	for (let i = particles.length - 1; i >= 0; i--) {
		particles[i].update(i);		// Update location and position in array
		particles[i].linkup();		// Draw lines between particles
		particles[i].boundCheck(); // Delete offscreen particles
	}
	// Separate loop for show() so that particles are last thing drawn (no over-drawing)
	for (let i = particles.length - 1; i >= 0; i--) {
		particles[i].show();			// Show the particle
	}

	// Replenish particles just offscreen, rather than dumping them in the middle
	while(particles.length < numParticles) {
		let bound = 0;
		// Select which border bleed to generate in
		push();
		translate(width/2,height/2);
		let chance = random(1);
		if (chance < 0.25) {
			x_ = - bleed;
			y_ = random(height);
		} else if (chance < 0.5) {
			x_ = width+bleed;
			y_ = random(height);
		} else if (chance < 0.75) {
			x_ = random(width);
			y_ = - bleed;
		} else {
			x_ = random(width);
			y_ = height+bleed;
		}
		particles.push(new Particle(x_,y_) );
		pop();
	}

}





function Particle(x_, y_) {
	this.i = 0;
	this.r = random(2,5);
	this.x = x_;
	this.y = y_;
	this.v = random(1e-1,8e-1);
	// Initial direction: towards centre of canvas
	let rcx = width/2 - this.x;
	let rcy = height/2 - this.y;
	this.theta = atan2(rcy, rcx);
	this.theta += random(-0.8*HALF_PI, 0.8*HALF_PI); // Modify direction
	this.vx = this.v * cos(this.theta);
	this.vy = this.v * sin(this.theta);

	this.update = function(index) {
		this.i = index;
		this.x += this.vx;
		this.y += this.vy;
	}

	this.show = function() {
		fill(0,190,255);
		fill(255);
		noStroke();
		rectMode(CENTER);
		rect(this.x, this.y, this.r,this.r);
	}

	this.linkup = function() {
		// Draw the lines between particles.
		for (let j = this.i + 1; j < particles.length; j++){ // Draw from jth element to elements after j. Save doubling up the lines.
			let v1 = createVector(this.x,this.y);
			let v2 = createVector(particles[j].x, particles[j].y);

			let v3 = v1.copy();
			v3.sub(v2);
			let d = v3.mag(); // Minimise calls to mag() by saving in variable.
			if (d <= dmax) { // save some cycles - don't bother doing calculations if distance is too great anyway.
				d = constrain(d,20,dmax);
				let alpha = map(d,0,dmax,255,20, 1);
				// stroke(205,102,204,alpha); // Pink
				// stroke(0,alpha);
				// stroke(0,75*(255/162),255,alpha);
				stroke(255,alpha);
				strokeWeight(1);
				line(this.x,this.y,particles[j].x,particles[j].y);
				// console.log(d);
			}
		}
	}

	this.boundCheck = function() {
		if (
		this.x > width + bleed ||
		this.y > height + bleed ||
		this.x < -bleed ||
		this.y < -bleed ) {
			particles.splice(this.i,1);
		}
	}

}
