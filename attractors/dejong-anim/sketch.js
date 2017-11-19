// Attractor structure and constants from
// http://www.complexification.net/gallery/machines/peterdejong/

// gif recording demo:
// https://stackoverflow.com/questions/42437971/exporting-a-video-in-p5-js

let a,b,c,d;
// Jong's constants
// a = -0.89567065;
// b = 1.5909586;
// c = 1.8515863;
// d = 2.1974306;

// my own
a = 2.89567065;
b = 1.5909586;
c = 1.8515863;
d = 2.1974306;

// another
a = 1.1;
b = 1;
c = 1.8515863;
d = 2.1974306;



let scl = 200;

// GIF recording
let cnv;
let gif;
let recording = false;
let frameNum = 0;

let x = 0;
let y = 0;

let bufferLen = 2e5;

function setup() {
	cnv = createCanvas(900,900);

	var start_rec = createButton("Start Recording");
    start_rec.mousePressed(saveVid);

    var stop_rec = createButton("Stop Recording");
    stop_rec.mousePressed(saveVid);

    start_rec.position(30, height + 30);
    stop_rec.position(30, height+60);

	setupGIF();


}

function draw() {
	if (recording) {
		background(255);
		translate(width/2,height/2);

		stroke(0);
		strokeWeight(0.31);

		drawAttractor();
		a+=0.05; // Here's where the magic happens baby

		// Capture screen to gif
		gif.addFrame(cnv.elt, {
			delay: 1,
			copy: true
		});
	} else {

	}

}



function drawAttractor() {
	for (i=1; i < bufferLen; i++){
		xNext = sin(a*y) - cos(b*x);
		yNext = sin(c*x) - cos(d*y);

		point(x*scl, y*scl);

		x = xNext;
		y = yNext;
	}
}



function setupGIF() {
	gif = new GIF({
		workers: 5,
		quality: 20
	});
	gif.on('finished', function(blob) {
	  window.open(URL.createObjectURL(blob));
  });
}

function saveVid() {
    recording = !recording;
    if (!recording) {
        gif.render();
    }
}
