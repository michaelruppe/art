// Emulate the neat particle animation from www.particle.io
// still pretty primitive

let numParticles = 15;
let bleed = 100; // how big is the bleed off the edge of the canvas
let particles = [];

function setup() {
	createCanvas(800,800);

	for (let i = 0; i<numParticles; i++){
		particles[i] = new Particle(random(width), random(height));
	}

}


function draw() {
	background(127);

	for (let i = particles.length - 1; i >= 0; i--) {
		particles[i].update(i);		// Update location and position in array
		particles[i].show();			// Show the particle
		particles[i].linkup();		// Draw lines between particles
		particles[i].boundCheck(); // Delete offscreen particles
	}

	// Replenish particles just offscreen, rather than dumping them in the middle
	// TODO broken. Only generates particles in the corners.
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
		particles.push(new Particle(x_,y_) )
	}

}





function Particle(x_, y_) {
	this.i;
	this.r = 10;
	this.x = x_;
	this.y = y_;
	this.v = random(1e-1,4);
	this.theta = random(TWO_PI);
	this.vx = this.v * cos(this.theta);
	this.vy = this.v * sin(this.theta);

	this.update = function(index) {
		this.i = index;
		this.x += this.vx;
		this.y += this.vy;
	}

	this.show = function() {
		noFill();
		stroke(0,255);
		strokeWeight(1);
		ellipse(this.x, this.y, this.r);
	}

	this.linkup = function() {
		for (let j = this.i+1; j < particles.length; j++){
			let d = sqrt( (this.x + particles[j].x)^2 + (this.y + particles[j].y)^2 );
			strokeWeight(1);
			stroke(0,50);
			line(this.x,this.y,particles[j].x,particles[j].y);
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
