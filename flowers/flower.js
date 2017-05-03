// ToDo: fix flower proportions

function Flower() {
	this.length = random(40,120);
	this.pos = createVector(random(width), height);
	this.flowerPos = this.pos.copy();

	this.size = 5;
	this.theta = random(0,PI/2);

	// Beam characteristics. I studies mechanical engineering, so the best way I know how to make flowers bendy is to model them like steel beams...
	this.E = 1; // Elastic modulus
	this.I = 1; // Second moment of area
	this.load = 0; // The "load" on the "beam" model.

	this.update = function() {
		var defMax = ( this.load * this.length^3 ) / ( 3 * this.E * this.I ); // The maximum deflection of the flower end
		this.flowerPos = createVector(this.pos.x, this.pos.y - this.length);
	}

	this.show = function(){
		
		// Petals
		push();
		translate(this.flowerPos.x, this.flowerPos.y-this.length);
		rotate(this.theta);
	    stroke(155, 129, 186);
	    strokeWeight(this.size*1.3);
	   	point(0, this.size);
	   	point(this.size, 0);
	   	point(0, -this.size);
	   	point(-this.size, 0);
	    ellipse(0,0, this.size, this.size);

	    // Pollen
	    stroke(239,192,0);
	    strokeWeight(this.size);
	    point(0,0);

	    pop();
	    
	}


}