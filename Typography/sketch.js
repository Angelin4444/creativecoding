let font; // to store the custom font
let points = []; // will hold all the points that make up the text
let msg = "BathSpa"; // the message we want to show
let size = 150; // size of the text
let r = 20; // radius for the line movement
let angle = 0; // starting angle
let t = 0; // used to animate the lines

// color palette for line colors (purple, pink, orange, etc.)
let colors = ['#6a5acd', '#ff69b4', '#ff4500', '#8a2be2', '#ff1493', '#ffa500'];
let currentColorIndex = 0; // keeps track of which color to use

// preload the font from an online link before sketch starts
function preload() {
  font = loadFont("https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf");
}

function setup() {
  createCanvas(1000, 600); // set canvas size
  background('#f5f5dc'); // beige background
  textFont(font); // apply the font
  textSize(size); // set text size
  angleMode(DEGREES); // use degrees instead of radians

  // turn the message into a list of points for each letter shape
  points = font.textToPoints(msg, 50, 300, size, {
    sampleFactor: 0.3, // how many points (0.3 = medium detail)
    simplifyThreshold: 0 // no simplification
  });
}

function draw() {
  background('#f5f5dc'); // reset background each frame
  stroke(colors[currentColorIndex]); // set stroke color from current choice
  strokeWeight(1); // thin line

  // calculate how much each line should move using cosine and sine
  let xOffset = r * cos(angle);
  let yOffset = r * sin(angle);

  // draw lines from each letter point in the direction of the angle
  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    line(pt.x, pt.y, pt.x + xOffset, pt.y + yOffset);
  }

  // draw the static text on top
  fill('#333'); // dark gray fill
  noStroke(); // no outline
  text(msg, 50, 300);

  // animate the movement using sine wave
  let increment = 4 * sin(t);
  t += 0.5;
  angle += increment;
}

// change to the next color in the array when any key is pressed
function keyPressed() {
  currentColorIndex = (currentColorIndex + 1) % colors.length;
}

// also change color if user clicks anywhere on the canvas
function mousePressed() {
  currentColorIndex = (currentColorIndex + 1) % colors.length;
}

// https://www.youtube.com/watch?v=84AKFhqynvs&list=PL0beHPVMklwhDvna8wS-oJXuQO3ZCvDFl&index=2&ab_channel=PattVira