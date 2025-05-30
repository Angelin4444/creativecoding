var img, x, y;

function preload() {
  // Load the image before sketch starts
  img = loadImage("img3.png");
}

function setup() {
  createCanvas(500, 500); // Set canvas size
  background(0); // Background is black
  noStroke(); // No border for the circle
}

function draw() {
  background(0); // Clear background every frame
  x = mouseX; // Get mouse X
  y = mouseY; // Get mouse Y
  image(img, 0, 0); // Display the image

  var c = get(x, y); // Get the color from the pixel at mouse point
  fill(c); // Use that color
  ellipse(x, y, 100, 100); // Draw a big circle at the mouse
}
