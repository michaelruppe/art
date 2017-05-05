// Autonomous agents that harvest pollen and look super-cute.

function Bee() {
	this.pos = createVector(width/2, height/2);
	this.vel = createVector(0,0);
	this.acc = createVector(0,0);
	this.mass = 10;
	this.size = 5;

	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.update = function() {
		this.pos.add(this.vel);
		this.vel.add(this.acc);
		this.acc = createVector(0,0);

	}

	this.show = function() {
		push();
		translate(this.pos.x, this.pos.y);
		scale(size);
		// Head
		stroke(152,91,16);
		strokeWeight(this.size);
		point(0,0);

		// Abdomen
		var ofs = -0.7;
		var inc = -0.3;
		stroke(246,224,0);
		point(-ofs*this.size,0); ofs += inc;
		stroke(0);
		point(-ofs*this.size,0); ofs +=inc;
		stroke(246,224,0);
		point(-ofs*this.size,0); ofs +=inc;
		stroke(0);
		point(-ofs*this.size,0); ofs +=inc;

		// Wings
		stroke(200,200);
		point(-2*inc*this.size, -2 * abs(inc*this.size) );
		point(-3.5*inc*this.size, -2 * abs(inc*this.size) );
		pop();
	}



}