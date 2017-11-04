// Steganography demo. Hiding text data in an image.

let sourceImagePath = "lena-bw.jpg";
let preamblePath = "preamble.txt";
let sourceTextPath = "the-hobbit-full.txt";
let srcImg, desImg;

let buffer = [];
let dBuffer=  [];
let outputText = "";
let txt, len;





function preload() {
 srcImg = loadImage(sourceImagePath);
 desImg = loadImage(sourceImagePath);
 preTxt = loadStrings(preamblePath);
 srcTxt = loadStrings(sourceTextPath);
}

function setup() {
  createCanvas(srcImg.width*2, srcImg.height);
  background(127);
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
  // If the source text would use too many pixels, only loop through number of piels available.
  // Show the image with text encoded
  image(desImg, srcImg.width,0);
  desImg.loadPixels();
  pixelCount = min( desImg.pixels.length/8, txt.length);

  for ( let i = 0; i < pixelCount; i++){
    let intDecode = 0;
    for ( let j = 0; j < 8; j++){
        let currentPixel = intToBin( desImg.pixels[8*i + j] );
        // console.log("before "+currentPixel);
        currentPixel[7] = buffer[i][j]; // Load buffer value into LSB of current pixel
        // console.log("after "+currentPixel);

        // ARRAY to INT
        // Take 8-bits and create an integer
        for (let k = 0; k < 8; k++){
          intDecode = 0;
          if (currentPixel[k] == 1) intDecode += pow(2,7-k); // MSB. if it were LSB it would be pow(2,j)
        }
        desImg.pixels[8*i+j] = intDecode;
        // desImg.pixels[8*i+j] = currentPixel;
    }

  }


  // Decode the text, and display it
  for (let i = 0; i < pixelCount; i++){
    let intDecode = 0;
    // Take 8-bits and create an integer
    for (let j = 0; j < 8; j++){
      let currentPixel = intToBin( desImg.pixels[8*i + j] );
      if (currentPixel[7] == 1) intDecode += pow(2,7-j); // MSB. if it were LSB it would be pow(2,j)
    }

    // Convert int to character
    // console.log(char(intDecode));
    outputText += char(intDecode);
  }
  createP(preTxt.toString());
  createP(outputText);

}

function draw() {
  image(desImg, srcImg.width,0); // make sure we're showing the destination image so there's no doubt...
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
