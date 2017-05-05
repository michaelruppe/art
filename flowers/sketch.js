var flowers = [];
var bees = [];
var x;
var y;
var fr;


function setup() {
	createCanvas(800,400);

	x = random();
	y = random();

	for (var i = 0; i < 200; i++ ) {
		flowers[i] = new Flower();
	}

	for (var i = 0; i < 1; i++) {
		bees[i] = new Bee();
	}

	fr = createP('');

}

function draw() {
	background(126,192,238); // sky blue

	var wind = noise(x);
	wind += noise(y);
	wind /= 2;
	wind = constrain(wind,0,1);
	wind = map(wind,0,1,-1,1);
	x+= 0.003;
	y+= 0.0001
	for (var j = 0; j < flowers.length; j++ ) {
		flowers[j].update(wind);
		flowers[j].show();
	}

	for (var i = 0; i < bees.length; i++ ) {
		bees[i].show();
	}

	fr.html(floor(frameRate()));
 
}