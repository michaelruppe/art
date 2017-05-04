// ToDo: fix flower proportions

function Flower() {
	this.pos = createVector(random(width), height);
	this.length = random(30,70);
	this.angle = 0;
	this.omega = 0;
	this.domega = 0;
	this.k = random(0.003,0.012);
	this.b = random(0.2,0.5);
	// this.k = 0.01;
	// this.b = 0.4;
	
	this.flowerPos = createVector(0,0);
	this.flowerPos.x = this.pos.x + ( this.length * sin(this.angle) );
	this.flowerPos.y = this.pos.y - ( this.length * cos(this.angle) );	

	// Flower proportions and petal rotation
	this.size = 5;
	this.theta = random(0,PI/2);


	this.applyForce = function(force) {
		this.domega += force;
		this.domega = constrain(this.domega,-0.03,0.03);

	}

	this.update = function() {
		
		// Spring and drag
		this.applyForce( -this.k * this.angle );
		this.applyForce( -this.b * this.omega );

		// Physics engine
		this.angle = this.angle + this.omega;
		this.angle = constrain(this.angle,-PI/2, PI/2);
		this.omega = this.omega + this.domega;
		this.domega = 0;
		// this.omega = constrain(this.omega, -0.1, 0.1);

		this.flowerPos.x = this.pos.x + ( this.length * sin(this.angle) );
		this.flowerPos.y = this.pos.y - ( this.length * cos(this.angle) );

		pop();
	}

	this.show = function(){

		
		// Petals
		push();
		translate(this.flowerPos.x, this.flowerPos.y);
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


	    // debug
	    stroke(255);
		strokeWeight(3);
		line(this.pos.x, this.pos.y, this.flowerPos.x, this.flowerPos.y);
			    
	}


}