/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

let positionX = 0;
let positionY = 0;
let width = 1;
let length = 1;

// preload()
//
// Description of preload

function preload() {

}

/*
Declare variables to represent the position and size of a circle
Start the circle in position 0,0 and with a size of 1 pixel
Make the circle an appealing color
Make the circle move toward the bottom-left corner, five pixels per frame
Make the circle simultaneous grow by two pixels per frame


*/
// setup()
//
// Description of setup

function setup() {
  //setting up the canvas with a default orange background
  createCanvas(500, 500);
  background(255, 157, 82);

  // change the color of the circle to greenish
  fill(48, 255, 124);
  ellipse(positionX, positionY, width, length);
}

function draw() {
  background(255, 157, 82);
  ellipse(0, positionY += 5, width += 2, length += 2);
  if(positionY == 500)
  {
    positionY = 0;
  }
  if(width && length >= 500)
  {
    width = 1;
    length = 1;
  }
}
