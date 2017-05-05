// Flowers that flex in the wind and look pretty happy. Perhaps add some different coloured ones!

function Flower() {
	this.pos = createVector(random(width), height);
	this.lengthMin = 20;
	this.lengthMax = 80;
	this.length = random(this.lengthMin,this.lengthMax);
	this.angle = 0;
	
	// Make longer flowers more flexible
	this.flex = (this.length-this.lengthMin) / (this.lengthMax - this.lengthMin);
	this.flex = map(this.flex, 0, 1, 0.5, 1.5);

	// Underlying flower geometry
	this.flowerPos = createVector(0,0);
	this.flowerPos.x = this.pos.x + ( this.length * sin(this.angle) );
	this.flowerPos.y = this.pos.y - ( this.length * cos(this.angle) );	

	// Flower proportions and petal appearance
	this.size = 5;
	this.theta = random(0,PI/2);
	this.curvy = random(0.5*this.length, 3*this.length); // Stem curve properties

	

	this.update = function(wind) {
		wind = map(wind, -1, 1, -PI/4, PI/4);
		this.angle = this.flex * wind;

		this.flowerPos.x = this.pos.x + ( this.length * sin(this.angle) );
		this.flowerPos.y = this.pos.y - ( this.length * cos(this.angle) );
	}

	this.show = function(){
		// Stem
		// curve(x1,y1,x1,y1,x2,y2,x3,y3);
		push();
		stroke(0,104,56); strokeWeight(1.3); noFill();
		curve(this.pos.x,this.pos.y+this.curvy,  this.pos.x,this.pos.y,  this.flowerPos.x,this.flowerPos.y, this.pos.x, this.pos.y-2*this.length);
		pop();

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
	}


}