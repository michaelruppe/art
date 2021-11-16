/******************************************************************************
 * Mandelbrot
 * Michael Ruppe
 *
 ******************************************************************************/

// z_n+1 = z_n^2 + c
let w
let h
let centreX
let centreY
let xmin, ymin, xmax, ymax

function setup() {
  canvas = createCanvas(600,400)
  pixelDensity(1)
  noLoop();

  centreX=-1
  centreY=0
  w = 5
  h = (w * height) / width

}

function draw() {
  background(0)

  // start at negative half the width and height
  xmin = centreX-w/2
  ymin = centreY-h/2

  // make sure we can write to the pixels array
  // only need to do this once since we don't do any other drawing
  loadPixels()

  const maxIter = 100

  xmax = xmin + w
  ymax = ymin + h

  // map x,y pixel
  const dx = (xmax - xmin) / width
  const dy = (ymax - ymin) / height

let y = ymin
  for (let j=0; j < height; j++){
    let x = xmin
    for (let i=0; i<width; i++){
      let n = 0
      let a = x
      let b = y
      while (n < maxIter) {
        const aa = a * a
        const bb = b * b
        const twoab = 2.0*a*b
        a = aa-bb + x
        b = twoab + y
        if (dist(aa,bb,0,0) > 32) {
          break;
        }
        n++
      }

      // colour the pixel based on how long it takes to get to inf
      const pix = (i+j*width)*4
      const norm = map(n,0,maxIter,0,1);
      let bright = map(sqrt(norm),0,1,0,255);
      if (n==maxIter) bright = 0
      else {
        pixels[pix + 0] = bright
        pixels[pix + 1] = 0
        pixels[pix + 2] = 0
        pixels[pix + 3] = 255

      }
      x += dx

    }
    y += dy
  }
  updatePixels()
}

function mouseClicked() {
  centreX = xmin + (mouseX/width) * w
  centreY = ymin + (mouseY/height) * h
  w = w * 0.5
  h = (w * height) / width
  draw()

}
