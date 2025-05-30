var img, x, y;

function preload() {
  // Load the image before the sketch starts
  img = loadImage("img.jpeg");
}

function setup() {
  createCanvas(400, 400); // Canvas size
  background(0); // Set background to black
  noStroke(); // No border for the dots
}

function draw() {
  // Pick a random x and y position
  x = random(width);
  y = random(height);

  // Get the color from that part of the image
  var c = img.get(x, y); 

  // Use the color to draw a transparent dot
  fill(c[0], c[1], c[2], 50); 
  ellipse(x, y, 30, 30); // Draw the dot
}
