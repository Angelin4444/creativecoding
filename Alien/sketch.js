function setup() {
  createCanvas(500, 500);         // Create canvas of size 500x500
  background('#d6fdee');          // Set background to light alien sky color
  noLoop();                       // Stop draw() from looping
  drawMikeAlien();                // Call function to draw the alien
}

function drawMikeAlien() {
  push();                         // Save current drawing settings
  translate(width / 2, height / 2); // Move origin to center of canvas

  // BODY / HEAD
  fill('#77DD77');                // Set fill to green (Mike’s color)
  stroke(0);                      // Black outline
  strokeWeight(2);                // Line thickness
  ellipse(0, 0, 200, 200);        // Draw the main round body

  // EYE
  drawEye();                      // Call function to draw layered eye

  // MOUTH - curved smile
  noFill();                       // No fill for arc (just line)
  stroke(0);                      // Black outline
  strokeWeight(6);                // Thick line
  arc(0, 50, 80, 40, 0, PI);      // Draw smiling mouth (bottom half circle)

  // HORNS
  drawHorn(-60, -80, -1);         // Draw left horn
  drawHorn(60, -80, 1);           // Draw right horn

  pop();                          // Restore original drawing settings
}

function drawEye() {
  push();                         // Save drawing settings

  // Outer white part of the eye
  fill(255);                      // White color
  stroke(0);                      // Black outline
  ellipse(0, -40, 70, 70);        // Big white eye

  // Green iris
  fill('#1f7034');                // Dark green color
  ellipse(0, -40, 40, 40);        // Iris inside white

  // Black pupil
  fill(0);                        // Black color
  ellipse(0, -40, 20, 20);        // Pupil inside iris

  // White sparkle (shine)
  fill(255);                      // White color
  noStroke();                     // No outline
  ellipse(7, -47, 8, 8);          // Small sparkle on top-right

  pop();                          // Restore drawing settings
}

function drawHorn(x, y, direction) {
  push();                         // Save settings
  translate(x, y);                // Move to horn position
  scale(direction, 1);            // Flip left/right horn using scale
  stroke(80);                     // Grey outline
  strokeWeight(2);                // Thin outline
  fill('#f4e2d8');                // Light cream horn color

  // Draw custom horn shape using bezier curves
  beginShape();
  vertex(0, 0);
  bezierVertex(-10, -20, -30, -20, -20, -50); // First curve
  bezierVertex(-10, -60, 10, -30, 0, 0);      // Return curve
  endShape(CLOSE);

  pop();                          // Restore settings
}

// https://openprocessing.org/sketch/180944/