var flowers = []

function setup() {
	createCanvas(800,400);
	
	for (var i = 0; i < 100; i++ ) {
		flowers[i] = new Flower();
	}

}

function draw() {
	background(120);
	
	for (var j = 0; j < flowers.length; j++ ) {
		flowers[j].show();

	}  
}