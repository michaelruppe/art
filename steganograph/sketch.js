// Steganography demo. Hiding text data in an image.

const sourceImagePath = "lena-bw.jpg";
const sourceTextPath = "the-hobbit-full.txt";

const charPerPixel = 2; // We can encode one ASCII character in 2 pixels, because we have (R,G,B,A) per pixel to work with.
let srcImg, desImg;
let buffer = [];
let dBuffer=  [];
let outputText = "";
let txt, len;
let encoderBit = 7; // Which bit in the pixel are we going to hide our data? MSB=0, LSB=7



function preload() {
 srcImg = loadImage(sourceImagePath);
 desImg = loadImage(sourceImagePath);
 srcTxt = loadStrings(sourceTextPath);
}

function setup() {
  let canvas = createCanvas(srcImg.width*2 + 10, srcImg.height);
  canvas.parent('sketch-holder');
  background(255);
  image(srcImg,0,0); // Display source image
  srcImg.loadPixels();

  // Create array of letters, each letter is an array of 8 bits
  txt = srcTxt.toString();
  len = txt.length;
  for( let i = 0; i < len; i++ ){
    let binaryByte = intToBin( unchar(txt[i]) );
    // console.log(txt[i]);
    // console.log(binaryByte);

    buffer.push(binaryByte);
  }

  // Encode the source text into the destination image
  // If the source text would use too many pixels, only loop through number of pixels available.
  // Show the image with text encoded
  image(desImg, srcImg.width+10,0);
  desImg.loadPixels();
  charCount = min( desImg.pixels.length/charPerPixel, txt.length);

  for ( let i = 0; i < charCount; i++){
    for ( let j = 0; j < 8; j++){
        let currentPixel = intToBin( desImg.pixels[8*i + j] );
        // console.log("before "+currentPixel);
        currentPixel[encoderBit] = buffer[i][j]; // Load buffer value into LSB of current pixel
        // console.log("after "+currentPixel);

        // ARRAY to INT
        // Take 8-bits and create an integer
        let intDecode = 0;
        for (let k = 0; k < 8; k++){
          if (currentPixel[k] == 1) intDecode += pow(2,7-k); // MSBfirst. if it were LSB it would be pow(2,j)
        }
        desImg.pixels[8*i+j] = intDecode;
        // desImg.pixels[8*i+j] = currentPixel;
    }

  }


  // Decode the text, and display it
  for (let i = 0; i < charCount; i++){ // Technically cheating by invoking charCount... we wouldn't really know *HOW MUCH* text has been encoded, but it would be trivial to reserve eg. first 32bits to act as a letter counter in the encoded message.
    let intDecode = 0;
    // Take 8-bits and create an integer
    for (let j = 0; j < 8; j++){
      let currentPixel = intToBin( desImg.pixels[8*i + j] );
      if (currentPixel[encoderBit] == 1) intDecode += pow(2,7-j); // MSB first. if it were LSB it would be pow(2,j)
    }

    // Convert int to character
    // console.log(char(intDecode));
    outputText += char(intDecode);
  }
  createP(outputText);

  image(desImg, srcImg.width+10,0); // make sure we're showing the destination image so there's no doubt...
  desImg.updatePixels();


  fill(0); stroke(255); strokeWeight(5); textSize(28);
  text('Input', 15, 30);
  text('Output', srcImg.width + 25, 30);

  noLoop();
}



// Create an 8-bit binary string from an integer number
function intToBin(int) {
  let rem;
  let remstack = [];
  let output = [];

  // Create stack of divideBy2 remainders
  while (int > 0) {
    rem = int % 2;
    int = floor(int / 2);
    // console.log(rem);
    remstack.push(rem);
  }

  // pad the output with zeros to make up an 8-bit output
  for ( let i = 0; i < 8 - remstack.length; i++) {
    output.push(0);
  }

  while (remstack.length > 0) {
    output.push(remstack.pop());

  }
  // console.log(output);
  return(output);
}
