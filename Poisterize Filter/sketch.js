var img;

function preload() {
  // Load the image before the sketch starts
  img = loadImage("img2.png");
}

function setup() {
  createCanvas(400, 400); // Canvas size
  background(0); // Set background to black
}

function draw() {
  background(0); // Clear the background each frame
  image(img, 0, 0); // Show the image

  // Set the posterize level based on mouse X position
  var v = map(mouseX, 0, width, 2, 20);

  // Apply posterize filter to the image
  filter(POSTERIZE, v); 
}
