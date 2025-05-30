let data = {
  "Black": 20,
  "Pink": 5,
  "Blue": 7,
  "Gold": 1,
  "Red": 6,
  "Purple": 2,
  "Green": 7,
  "Yellow": 2,
  "White": 3,
  "Pastel Green": 1
};

let colorsList = []; // Array to store colors for each slice
let total;           // Variable to store sum of all values

function setup() {
  createCanvas(500, 500); // Create a canvas of 500x500 pixels
  angleMode(DEGREES);     // Use degrees instead of radians for angles
  total = Object.values(data).reduce((a, b) => a + b, 0); // Calculate total of all values

  // For each category in data, assign a random bright color
  for (let i = 0; i < Object.keys(data).length; i++) {
    colorsList.push(color(random(100, 255), random(100, 255), random(100, 255)));
  }
}

function draw() {
  background(255);           // Clear the canvas with white background
  translate(width / 2, height / 2); // Move origin to center of canvas

  let lastAngle = 0;         // Track where the last slice ended
  let i = 0;                 // Index for colorsList

  // Loop through each key (category) in data
  for (let key in data) {
    let val = data[key];             // Get the value for this category
    let angle = map(val, 0, total, 0, 360); // Convert value to an angle in degrees

    fill(colorsList[i]);             // Set fill color for this slice
    stroke(255);                    // White outline around slices
    strokeWeight(2);                // Thickness of the outline

    // Draw a slice of the donut chart from lastAngle to lastAngle + angle
    arc(0, 0, 300, 300, lastAngle, lastAngle + angle, PIE);

    // Calculate middle angle of slice to position the label
    let midAngle = lastAngle + angle / 2;
    let labelX = cos(midAngle) * 180; // X position for label (180 px from center)
    let labelY = sin(midAngle) * 180; // Y position for label

    noStroke();               // No outline for text
    fill(0);                  // Black text color
    textAlign(CENTER, CENTER); // Center text horizontally and vertically
    textSize(12);             // Set font size
    text(key, labelX, labelY); // Draw category name at calculated position

    lastAngle += angle;       // Update lastAngle for next slice
    i++;                      // Increase color index
  }

  // Draw a white circle in the center to create the donut hole
  fill(255);
  noStroke();
  ellipse(0, 0, 150, 150);

  // Draw label text in the center of the donut
  fill(50);                  // Dark grey color for label
  textSize(18);              // Bigger font size for center text
  textAlign(CENTER, CENTER); // Center text alignment
  text("Favorite Colors", 0, 0); // Display the label at center (0,0)
}


// https://docs.anychart.com/Basic_Charts/Doughnut_Chart
