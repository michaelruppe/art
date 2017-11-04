// Steganography demo. Hiding text data in an image.

let sourceImagePath = "lena-bw.jpg";
let sourceTextPath = "the-hobbit.txt";

let buffer = [];

let txt, len;





function preload() {
 srcImg = loadImage(sourceImagePath);
 srcTxt = loadStrings(sourceTextPath); // If no linebreaks, all text is put into the single string: srcTxt[0]
}

function setup() {
  createCanvas(srcImg.width, srcImg.height);
  image(srcImg,0,0); // Display source image


  // Create array of letters, each letter is an array of binary values
  txt = srcTxt.toString();
  len = txt.length;
  for( let i = 0; i < len; i++ ){
    let binaryByte = intToBin( unchar(txt[i]) );
    // console.log(txt[i]);
    // console.log(binaryByte);

    buffer.push(binaryByte);
  }


  // Embed the text data into the image data.


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
