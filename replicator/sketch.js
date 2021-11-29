/******************************************************************************
 Implementation of a Fredkin Replicator
 Cells turn on when they have an odd number of neighbours (including diagonals)
 otherwise, they turn off

 Michael Ruppe NOV 2021

 ******************************************************************************/

let scale = 20
let w,h
let cells = []
let nextCells = []
function setup() {
  frameRate(1)
  canvas = createCanvas(420,420)
  w = floor(width/scale)
  h = floor(height/scale)
  console.log(w,h)
  for (i = 0; i < w; i++) {
    for (j = 0; j < h; j++) {
      cells.push(0)
      nextCells.push(0)
    }
  }
  cells[w*floor(i/2) + floor(j/2)] = 1
    
  rectMode(CENTER)

}

function draw() {
  background(255)
  translate(scale/2,scale/2)
  for (i = 0; i < w; i++) {
    for (j=0; j < h; j++) {
      let cell = cells[j*w + h]
      if (cells[j*w + i] == 1) {
        fill(0)
        rect(i*scale, j*scale, scale/1.2, scale/1.2)
      }

    }
  }

  // update
  for (i = 0; i < w; i++) {
    for (j=0 ; j < h; j++) {
      let count = 0

      // up
      if (j > 0) {
        count += cells[(j-1)*w + i]
        if (i > 0) count += cells[(j-1)*w + (i-1)]
        if (i < w-1) count += cells[(j-1)*w + (i+1)]
      }
      // down
      if (j < h-1) {
        count += cells[(j+1)*w + i]
        if (i > 0) count += cells[(j+1)*w + (i-1)]
        if (i < w-1) count += cells[(j+1)*w + (i+1)]
      }
      // left
      if (i > 0) count += cells[j*w + (i-1)]
      // right
      if (i < w-1) count += cells[j*w + (i+1)]


      // cell becomes alive if currently touching odd numbers
      if (count % 2 != 0) nextCells[j*w + i] = 1
      else nextCells[j*w + i] = 0

    }
  }
  arrayCopy(nextCells, cells)
  // delayTime(1)
  // noLoop()
}
