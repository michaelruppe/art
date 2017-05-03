// ToDo: fix flower proportions

function Flower() {
	this.length = random(40,120);
	this.pos = createVector(random(width), height-this.length);

	this.size = 5;
	this.theta = random(0,PI/2);

	this.show = function(){
		push();
		translate(this.pos.x, this.pos.y-length);
		rotate(this.theta);
		// Petals
	    stroke(155, 129, 186);
	    strokeWeight(this.size);
	   	point(0, this.size);
	   	point(this.size, 0);
	   	point(0, -this.size);
	   	point(-this.size, 0);
	    ellipse(0,0, this.size, this.size);

	    // Pollen
	    push();
	    stroke(239,192,0)
	    point(0,0);

	    pop();
	    pop();
	    
	}


}