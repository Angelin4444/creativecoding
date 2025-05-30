let trail = []; // this will store all the rainbow trail circles
let on = false; // to turn the trail ON or OFF
let sparkleCount = 20; // how many sparkles to show

function setup() {
  createCanvas(800, 800); // set the size of the canvas
  noStroke(); // no outlines on shapes
  colorMode(HSB, 360, 100, 100); // use HSB colors for easy rainbow effects
}

function draw() {
  background(0, 0, 0, 20); // black background with some transparency for fading

  // Show every circle in the trail
  for (let i = 0; i < trail.length; i++) {
    trail[i].display(); // show that circle
  }

  // If trail is ON, show sparkles and add new circle
  if (on) {
    // draw sparkles near the mouse
    for (let i = 0; i < sparkleCount; i++) {
      drawSparkle(mouseX + random(-15, 15), mouseY + random(-15, 15));
    }

    // add a new colorful circle where mouse is
    trail.push(new Trace());
  }

  // If too many circles, remove the oldest one
  if (trail.length > 100) {
    trail.splice(0, 1); // remove first circle to keep it smooth
  }
}

// This class makes one colorful circle at the mouse
class Trace {
  constructor() {
    this.x = mouseX; // x position
    this.y = mouseY; // y position
    this.hue = (frameCount * 2) % 360; // change color each frame for rainbow
    this.size = random(10, 20); // random small size
  }

  // Draw the circle
  display() {
    fill(this.hue, 100, 100); // colorful fill using HSB
    ellipse(this.x, this.y, this.size); // draw the circle
  }
}

// Draw a white sparkle (tiny star)
function drawSparkle(x, y) {
  push(); // save current drawing settings
  fill(360, 0, 100, 80); // white color with some transparency
  star(x, y, 2, 6, 5); // draw the star shape
  pop(); // go back to previous drawing settings
}

// This function draws a star shape
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints; // angle between points
  let halfAngle = angle / 2.0;
  beginShape(); // start drawing shape
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2; // outer point
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1; // inner point
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE); // finish the star
}

// When user clicks mouse, turn the trail ON or OFF
function mousePressed() {
  on = !on; // toggle between true and false
}
