// can also click on keys
// a to move left
// d to move right
// w to move up 
// s to move down
// any other keys to make the sand fall

let grid; // grid holds color info
let velocityGrid; // grid holds speed info for sand
let w = 5; // size of each square
let cols, rows; // how many squares fit on canvas
let hueValue = 200; // start color hue
let gravity = 0.1; // gravity speed down

let sound; // sound variable
let virtualMouseX = 300; // fake mouse x pos
let virtualMouseY = 250; // fake mouse y pos
let isVirtualClick = false; // check if fake mouse clicked

// make 2D array for grid or velocity
function make2DArray(cols, rows) {
  let arr = new Array(cols); // create array for columns
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows); // create array for rows inside each column
    for (let j = 0; j < rows; j++) {
      arr[i][j] = 0; // start all values with 0 (empty)
    }
  }
  return arr; // return the 2D array
}

function withinCols(i) {
  return i >= 0 && i < cols; // check if col is inside grid
}

function withinRows(j) {
  return j >= 0 && j < rows; // check if row is inside grid
}

function preload() {
  sound = loadSound('sand.mp3'); // load sound before starting
}

function setup() {
  createCanvas(600, 500); // make canvas
  colorMode(HSB, 360, 255, 255); // use hue colors
  cols = width / w; // count how many cols fit
  rows = height / w; // count how many rows fit
  grid = make2DArray(cols, rows); // make grid array
  velocityGrid = make2DArray(cols, rows); // make velocity array
}

function draw() {
  background(0); // black background

  // decide mouse pos, real or virtual
  let activeX = isVirtualClick ? virtualMouseX : mouseX;
  let activeY = isVirtualClick ? virtualMouseY : mouseY;
  let isActiveClick = mouseIsPressed || isVirtualClick;

  if (isActiveClick) {
    if (!sound.isPlaying()) {
      sound.play(); // play sound if not playing
    }

    let mouseCol = floor(activeX / w); // get col under mouse
    let mouseRow = floor(activeY / w); // get row under mouse
    let matrix = 5; // size of sand cluster
    let extent = floor(matrix / 2);
    for (let i = -extent; i <= extent; i++) {
      for (let j = -extent; j <= extent; j++) {
        if (random(1) < 0.75) { // 75% chance to place sand
          let col = mouseCol + i;
          let row = mouseRow + j;
          if (withinCols(col) && withinRows(row)) {
            grid[col][row] = hueValue; // set color for sand
            velocityGrid[col][row] = 1; // set initial speed
          }
        }
      }
    }

    hueValue += 0.5; // change color slowly
    if (hueValue > 360) hueValue = 1; // reset color after full hue
  }

  isVirtualClick = false; // reset virtual click after frame

  // draw all sand squares
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] > 0) {
        fill(grid[i][j], 255, 255); // use hue color
        noStroke(); // no border
        square(i * w, j * w, w); // draw square on canvas
      }
    }
  }

  // prepare next frame grids
  let nextGrid = make2DArray(cols, rows);
  let nextVelocityGrid = make2DArray(cols, rows);

  // update sand movement
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j]; // current sand color
      let velocity = velocityGrid[i][j]; // current speed
      let moved = false;
      if (state > 0) { // if there is sand here
        let newPos = int(j + velocity); // new vertical position
        for (let y = newPos; y > j; y--) {
          if (!withinRows(y)) continue; // skip if outside rows

          let below = grid[i][y]; // sand below
          let dir = random() < 0.5 ? -1 : 1; // try left or right randomly
          let belowA = withinCols(i + dir) && withinRows(y) ? grid[i + dir][y] : -1;
          let belowB = withinCols(i - dir) && withinRows(y) ? grid[i - dir][y] : -1;

          if (below === 0) { // empty below
            nextGrid[i][y] = state; // move sand down
            nextVelocityGrid[i][y] = velocity + gravity; // speed up falling
            moved = true;
            break;
          } else if (belowA === 0) { // empty diagonal right or left
            nextGrid[i + dir][y] = state; // move sand diagonally
            nextVelocityGrid[i + dir][y] = velocity + gravity;
            moved = true;
            break;
          } else if (belowB === 0) { // empty other diagonal
            nextGrid[i - dir][y] = state; // move sand diagonally other side
            nextVelocityGrid[i - dir][y] = velocity + gravity;
            moved = true;
            break;
          }
        }
      }

      if (state > 0 && !moved) { // if sand didn't move
        nextGrid[i][j] = state; // stay in place
        nextVelocityGrid[i][j] = velocity + gravity; // still gain speed
      }
    }
  }

  grid = nextGrid; // update grid for next frame
  velocityGrid = nextVelocityGrid; // update velocity for next frame
}

// WASD keys move virtual mouse to draw without real mouse
function keyPressed() {
  let step = 10; // move step size
  if (key === 'a') virtualMouseX -= step;
  if (key === 'd') virtualMouseX += step;
  if (key === 'w') virtualMouseY -= step;
  if (key === 's') virtualMouseY += step;

  virtualMouseX = constrain(virtualMouseX, 0, width - 1); // keep inside canvas width
  virtualMouseY = constrain(virtualMouseY, 0, height - 1); // keep inside canvas height

  isVirtualClick = true; // say virtual click happened
}

// https://www.youtube.com/watch?v=L4u7Zy_b868&ab_channel=TheCodingTrain
// https://jason.today/falling-sand
// https://boredhumans.com/falling_sand.php