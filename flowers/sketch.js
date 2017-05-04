var flowers = []
var perlin;
var windSpeed;

function setup() {
	createCanvas(800,400);
	
	perlin = random();
	windSpeed = 3;


	for (var i = 0; i < 100; i++ ) {
		flowers[i] = new Flower();
	}

}

function draw() {
	background(126,192,238); // sky blue

	var wind = random(perlin);
	if (wind < 0.2) {
		var force = windSpeed; 
	} else if ( wind < 0.4 ) { 
		var force = -windSpeed; 
	} else {
		var force = 0;
	}
	for (var j = 0; j < flowers.length; j++ ) {
		flowers[j].applyForce(force);
		flowers[j].update();
		flowers[j].show();

	}

	perlin += 0.1;  
}