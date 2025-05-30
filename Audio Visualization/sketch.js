let size = 15; // size of each cube
let num = 10; // how many cubes in each row, column, and layer
let grid = []; // to store the cubes in 3D grid
let min = 150; // minimum color value to show cube

let song; // variable to hold the sound
let fft; // for analyzing the sound
let spectrum = []; // to hold sound frequency data
let distFromCenter = []; // to store how far each cube is from the center

function preload() {
  song = loadSound("htyd.mp3"); // load the sound file before sketch starts
}

function setup() {
  createCanvas(400, 400, WEBGL); // 3D canvas of size 400x400
  song.play(); // play the sound
  fft = new p5.FFT(); // create FFT object to analyze sound

  // Loop through all cube positions (x, y, z)
  for (let i = 0; i < num; i++) {
    grid[i] = [];
    for (let j = 0; j < num; j++) {
      grid[i][j] = [];
      for (let k = 0; k < num; k++) {
        grid[i][j][k] = floor(random(2)); // randomly set cube color (will change later)

        // Calculate distance of each cube from the center
        let offset = size / 2 - num / 2 * size; // shift grid to center
        let x = i * size + offset;
        let y = j * size + offset;
        let z = k * size + offset;
        let distance = dist(x, y, z, 0, 0, 0); // distance from center

        // Store the cube's position and distance
        distFromCenter.push({ i, j, k, distance });
      }
    }
  }

  // Sort cubes so we draw from center outwards
  distFromCenter.sort(compareDistances);
}

// Helper function to sort based on distance from center
function compareDistances(a, b) {
  return a.distance - b.distance;
}

function draw() {
  background(220); // white background

  orbitControl(); // allow mouse to rotate the view

  spectrum = fft.analyze(); // get frequency data from sound
  let vol = fft.getEnergy(20, 140); // get volume from low-mid frequencies

  // Set stroke color based on volume
  if (vol > 240) {
    stroke(255, 255, 0, 20); // yellow outline if loud
  } else {
    stroke(0, 20); // soft black outline otherwise
  }

  let totalCubes = num * num * num; // total number of cubes
  for (let i = 0; i < totalCubes; i++) {
    let pos = distFromCenter[i]; // get position info
    let c = map(spectrum[i], 0, 255, min, 255); // convert frequency to color
    grid[pos.i][pos.j][pos.k] = c; // update color value in grid
  }

  let offset = size / 2 - num / 2 * size; // to center the grid
  translate(offset, offset, offset); // shift everything to center

  noFill(); // no fill by default
  // Loop through all cubes
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      for (let k = 0; k < num; k++) {
        // Only fill if the cube is active (volume made it bright)
        if (grid[i][j][k] > min) {
          fill(grid[i][j][k], 0, 200); // color the cube based on sound
        } else {
          noFill(); // no color if too quiet
        }

        push(); // save current position
        translate(i * size, j * size, k * size); // move to cube position
        box(size - size / 4); // draw the cube (smaller than full size)
        pop(); // go back to previous position
      }
    }
  }
}

// https://www.youtube.com/watch?v=8O5aCwdopLo&ab_channel=PattVira