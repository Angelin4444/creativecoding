function setup() {
  // Create a canvas that's 400 pixels wide and 200 pixels tall
  createCanvas(400, 200);
  // Set the background color to sky blue color
  background(color(210,230,250));

   
  fill(0, 102, 204);  // Set the fill color to blue for the car body
  rect(50, 100, 200, 50, 10); // Draw the main body of the car
  rect(80, 70, 140, 40, 10); // Draw the top part (roof) of the car

  fill(173, 216, 230); // Set the fill color to light blue for the windows
  rect(90, 75, 50, 30, 5); // Draw the left window
  rect(150, 75, 50, 30, 5); // Draw the right window

  fill(0);  // Set the fill color to black for the wheels
  ellipse(80, 160, 40, 40); // Draw the left wheel
  ellipse(220, 160, 40, 40); // Draw the right wheel

  fill(200);  // Set the fill color to grey for the inner wheel (rim)
  ellipse(80, 160, 15, 15); // Draw the center of the left wheel
  ellipse(220, 160, 15, 15); // Draw the center of the right wheel
}
