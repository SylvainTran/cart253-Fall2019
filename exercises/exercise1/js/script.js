"use strict";
// Exercise 1 - Movement
// Sylvain Tran
//
// Customized code for Exercise 1.
// Draws a moving circle, square, dove and musical clef that moves.

// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;

// The dove image's attributes
let doveImg;
let doveXPosition = 0;
let doveYPosition = 0;
let doveWidth = 100;
let doveHeight = 100;

// The musical clef image's attributes
let clefImg;
let clefXPosition = 0;
let clefYPosition = 0;
let clefWidth = 100;
let clefHeight = 100;

// preload()
//
// Preload the dove and shooting star images.

function preload() {
  doveImg = loadImage('./assets/images/dove.png');
  clefImg = loadImage('./assets/images/clef.png');
}

/*
  Setups the coordinates for the circle and square shapes.

*/

function setupCoordinates(){
  // Start the circle off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;

  // Start the square off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  squareX = width + squareSize/2;
  squareY = height + squareSize/2;
}

/*
  Setups the mode and stroke settings for the shapes.

*/

function setupShapeSettings(){
  rectMode(CENTER);
  noStroke();
}

/*
  Setups the basic canvas state: coordinates and settings for the shapes plus the dove image.

*/

function setup() {
  createCanvas(640,640);
  setupCoordinates();
  setupShapeSettings();
  // Positions the image of the dove on the top left of the canvas
  image(doveImg, 0, 0, 100, 100);
}

/*
  Increments (for later translation) the shape's (X, Y) attributes.

*/

function translateCircle(valueX, valueY){
  // Move circle up and to the right
  circleX += valueX;
  circleY -= valueY;
}

function translateSquare(valueX, valueY){
  // Move square up and to the left
  squareX -= valueX;
  squareY -= valueY;
}

function translateDove(valueX, valueY){
  // Positions the dove image on the left side of the canvas
  image(doveImg, doveXPosition += valueX, valueY, doveWidth, doveHeight);
}

/*
  Displays the shape with a fill color and size.

*/

function displayCircle(r, g, b, alpha, width, height){
  fill(r, g, b, alpha);
  // Display the circle
  ellipse(circleX, circleY, width, height);
}

function displaySquare(r, g, b, alpha, width, height){
  // Make the square transparent blue
  fill(r, g, b, alpha, width, height);
  // Display the square
  rect(squareX, squareY, squareSize, squareSize);
}

/*
  Alternate display: Ensures that the image will only spawn under the cursor if the cursor is somewhere on the canvas.

*/

function displayImgAtMouse(img, width, height){
  if(mouseX > 0 && mouseY > 0){
    image(img, mouseX, mouseY, width, height);
  }
}

/*
  Clamps value of X position if it exceeds canvas size.

*/

function clampXPosition(){
  // Resets the position of the image to x=0 if x > the canvas's X position (looping effect)
  if(doveXPosition >= 640)
  {
    doveXPosition = 0;
  }
}

function draw() {
  // We don't fill the background so we get a drawing effect
  translateCircle(1, 1);
  // Make the circle transparent red
  displayCircle(255, 0, 0, 10, circleSize, circleSize);
  translateSquare(1, 1);
  displaySquare(0, 0, 255, 10, squareSize, squareSize);
  translateDove(5, 0);
  clampXPosition();
  displayImgAtMouse(clefImg, 100, 100);
}
