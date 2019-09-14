"use strict";
// Exercise 1 - Movement
// Pippin Barr
//
// Starter code for exercise 1.
// Draws a moving square and circle that intersect
// in the middle of the canvas.

// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;

// The dove image's attribute
let doveImg;
let doveXPosition = 0;
let doveYPosition = 0;
let doveWidth = 100;
let doveHeight = 100;

// preload()
//
// Preload a dove image.

function preload() {
  doveImg = loadImage('./assets/images/dove.png');
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

function displayCircle(){
  // Make the circle transparent red
  fill(255,0,0,10);
  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);
}

function displaySquare(){
  // Make the square transparent blue
  fill(0,0,255,10);
  // Display the square
  rect(squareX,squareY,squareSize,squareSize);
}

function translateDove(valueX, valueY){
  // Positions the dove image on the left side of the canvas
  image(doveImg, doveXPosition += valueX, valueY, doveWidth, doveHeight);
}

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
  displayCircle();
  translateSquare(1, 1);
  displaySquare();
  translateDove(5, 0);
  clampXPosition();
}
