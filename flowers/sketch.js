var flowers = []

function setup() {
	createCanvas(800,400);
	
	for (var i = 0; i < 200; i++ ) {
		flowers[i] = new Flower();
	}

}

function draw() {
	background(126,192,238); // sky blue
	
	for (var j = 0; j < flowers.length; j++ ) {
		flowers[j].show();

	}  
}