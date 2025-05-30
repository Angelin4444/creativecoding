size = 30; // sets the base size for the rectangles
widthMult = 4; // sets how wide the rectangles can get
heightMult = 4; // sets how tall the rectangles can get

function setup() {
  createCanvas(700, 700); // makes a square canvas
  angleMode(DEGREES); // so we can use degrees if rotating
  strokeWeight(3); // adds outline thickness for rectangles

  // starting random colors (so each artwork is different)
  startR = random(165);
  startG = random(165);
  startB = random(165);

  // background is a lighter version of the random color
  background(startR + 45, startG + 45, startB + 45);

  // this loop places rectangles across the canvas from right to left
  for (x = width; x > -size * widthMult; x -= size) {
    // this loop places rectangles from bottom to top
    for (y = height; y > -size * heightMult; y -= size) {

      // fills with random shades based on the starting color
      fill(
        random(startR, startR + 90),
        random(startG, startG + 90),
        random(startB, startB + 90)
      );

      push(); // saves current drawing settings
      translate(x + size / 2, y + size / 2); // moves origin to rectangle center

      // draws a rectangle with random width and height
      rect(
        0,
        0,
        size * floor(random(1, widthMult)),
        size * floor(random(1, heightMult))
      );

      pop(); // resets to previous settings
    }
  }
}

function keyTyped() {
  // if we press 's' the canvas is saved as an image
  if (key === "s") {
    save("myCanvas.jpg");
  }
}

// https://www.youtube.com/watch?v=ig0q6vfpD38&ab_channel=Steve%27sMakerspace
