// Wish you were here FFT demo

var song;
var fft;
var amp;
var smoothing = 0.7;
var bins = 128;

function setup() {
	createCanvas(640,640);
	song = loadSound('wish you were here.mp3', loaded);
	fft = new p5.FFT(smoothing, bins);
	angleMode(DEGREES);
}

// A callback triggered when loadSound is complete
function loaded() {
	song.play();
}

function draw() {
	background(0);
	var spectrum = fft.analyze();

	translate(width/2, height/2);
	stroke(255);
	fill(64,224,208); 
	// Loop through spectrum elements
	var span = spectrum.length - 1/3 * spectrum.length; // A bit of a hack to cut high frequencies
	beginShape();
	for ( var i = 0; i < span; i++ ){
		var angle = map(i, 0, span, 0, 360);
		var level = spectrum[i]; // Get the level of a frequency bin
		var r = map(level, 0, 256, 50, 300);
		var x = r * cos(angle);
		var y = r * sin(angle);
		vertex(x,y);
	}
	endShape();
}