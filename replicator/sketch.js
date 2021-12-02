/******************************************************************************
 Implementation of a Fredkin Replicator
 Cells turn on when they have an odd number of neighbours (including diagonals)
 otherwise, they turn off

 Michael Ruppe NOV 2021

 ******************************************************************************/

let numTiles = 33
let scale = 20
let w,h
let cells = []
let nextCells = []

let button, reset, slider
let state
let initialRun = true

function setup() {
  state = 'setup'
  canvas = createCanvas(numTiles*scale+1,numTiles*scale+1)
  frameRate(30)
  canvas.mouseClicked(clickEvent)
  w = floor(width/scale)
  h = floor(height/scale)
  console.log(w,h)
  cells = []
  for (i = 0; i < w; i++) {
    for (j = 0; j < h; j++) {
      cells.push(0)
      nextCells.push(0)
    }
  }
  cells[w*floor(i/2) + floor(j/2)] = 1

  rectMode(CENTER)

  if (initialRun) {
    initialRun = false
    button = createButton("Start");
    button.position(10,height+10)
    button.mouseClicked(start)
    reset = createButton("Reset");
    reset.position(200,height+10)
    reset.mouseClicked(setup)

    speedSlider = createSlider(1,30,1)
    speedSlider.position(width-150,height+10)
    speedSlider.style('width','150px')
  }
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

  if (state == 'run') {
    frameRate(speedSlider.value())
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
  }

}


function clickEvent() {
  if (state == 'setup'){
    x = round((mouseX+scale/2) / scale)-1
    y = round((mouseY+scale/2) / scale)-1
    i = y*w + x
    cells[i] = !cells[i]
  }
}

function start() {
  state = 'run'
}
