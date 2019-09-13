// Exercise 0 - Spiritual Self-Portrait
// Pippin Barr
// 20 August 2018
//
// Uses p5's set of shape and colour functions to draw a head
// wearing a hat that Pippin claims is spiritually just like him.


// setup()
//
// Draws a beautiful face on the canvas and puts a hat on it!

function setup() {

  // Set up the canvas and give it a nice pink colour

  createCanvas(500,500);
  background(159, 224, 177);

  // Draw the head and body (or is it a chin?) in pink as well

  // No stroke because shapes look nicer without it I think
  noStroke();
  // Set the nice pink
  fill(191, 148, 92);
  // The ellipse mode will make it easier to align everything
  ellipseMode(CENTER);
  // Draw the head
  ellipse(250,250,150, 150);
  // Draw the body
  ellipse(250,400,100,150);

  // Draw the googly eyes

  // Draw the white backgrounds of the eyes
  fill(255);
  ellipse(200,225,30,50);
  ellipse(300,225,30,50);

  // Draw the black pupils
  fill(0);
  ellipse(200,225,20,20);
  ellipse(300,225,20,20);

  // Draw the nose

  // Nose colour
  fill(55,20,150);
  // Main nose part
  ellipse(250,250,50,30 );
  // The two nostril areas
  ellipse(235,275,50,50);
  ellipse(265,275,50,50);

  // Draw the mouth our of an ellipse and a dividing line

  // Lip colour
  fill(255,150,150);
  // Lips
  ellipse(250,320,100,25);
  // Lip divider colour and size
  stroke(255,120,120);
  strokeWeight(4);
  // Lip divider
  line(200,320,300,320);

  // Draw the arms
  fill(255, 150, 150);

  triangle(500, 500, 350, 250, 125, 200);
}

// draw()
//
// Does nothing.

function draw() {
  // Nothing here for now.
}
