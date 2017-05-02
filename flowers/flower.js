// ToDo: fix flower proportions

function Flower() {
	this.pos = createVector(random(width), height);
	this.length = random(40,120);


	this.show = function(){
	    stroke(155, 129, 186);
	    strokeWeight(3);
	    point(this.pos.x +1,this.pos.y-this.length);
	    point(this.pos.x -1,this.pos.y-this.length);
	    point(this.pos.x,this.pos.y-this.length +1);
	    point(this.pos.x,this.pos.y-this.length -1);

	    strokeWeight(1);
	    stroke(239,192,0)
	    point(this.pos.x,this.pos.y-this.length);
	    
	}


}