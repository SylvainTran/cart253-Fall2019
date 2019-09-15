"use strict";
/**
  Exercise 1 - Movement
  Sylvain Tran - CART 253 - Section A - Student ID: 26651550

  Customized code for Exercise 1.
  Draws a moving circle, square, two doves and a musical clef under mouse location.
*/

// The current position and size of the circle
let circleX = 0;
let circleY = 0;
let circleSize = 100;

// The current position and size of the square
let squareX = 0;
let squareY = 0;
let squareSize = 100;

// The dove image's attributes
let doveImg;
let doveXPosition = 0;
let doveYPosition = 0;
let doveWidth = 100;
let doveHeight = 100;

// Visibility (alpha transparency)
let alpha = 0;
let VISIBLE = 50;

// The musical clef image's attributes
let clefImg;
let clefXPosition = 0;
let clefYPosition = 0;
let clefWidth = 100;
let clefHeight = 100;

// The fireworks image's attributes
let fireworksImg;
let fireworksXPosition = 0;
let fireworksYPosition = 0;
let fireworksWidth = 100;
let fireworksHeight = 100;

// Optional challenge: Sine curve attributes
let curveX = 0; // X value on the period
let xSpacing = 10; // Distance between each horizontal location
let waveWidth; // width of entire wave
let theta = 0.0; // Start angle at 0
let amplitude = 150; // Height of wave
let period = 320; // How many pixels before the wave repeats
let increment = 0; // Value for incrementing sine function's domain values
let periodYValues = []; // An array to store the Y values of the sine function

/**
  The base class to be inherited from, for custom shapes
  used in this exercise.

*/
class CustomShape{
  xPos = 0;
  yPos = 0;
  width = 100;
  height = 100;

  constructor(x, y, w, h){
    this.xPos = x;
    this.yPos = y;
    this.width = w;
    this.height = h;
  }

  //Accessors and mutators
  getWidth(){
    return this.width;
  }

  getHeight(){
    return this.height;
  }

  setWidth(newWidth){
    if(newWidth > 0){
      width = this.newWidth;
    }
  }

  setHeight(newHeight){
    if(newHeight > 0){
      height = this.newHeight;
    }
  }
}

class Ellipse extends CustomShape{
  constructor(x, y, w, h){
    super(x, y, w, h);
  }

}
class Square extends CustomShape{
  constructor(x, y, w, h){
    super(x, y, w, h);
  }

}

/**
  Preload the dove, clef and fireworks images.

*/
function preload() {
  doveImg = loadImage('./assets/images/dove.png');
  clefImg = loadImage('./assets/images/clef.png');
  fireworksImg = loadImage('./assets/images/fireworks.jpg');
}

/**
  Setups the coordinates for the circle and square shapes.

*/
function setupCoordinates(){
  // Start the circle and square off screen to the bottom left
  // We divide their size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;
  squareX = width + squareSize/2;
  squareY = height + squareSize/2;
}

/**
  Setups the mode and stroke settings for the shapes.

*/
function setupShapeSettings(){
  rectMode(CENTER);
  noStroke();
}

/**
  Setups the basic canvas state: coordinates and settings for the shapes plus the dove image.

*/
function setup(){
  createCanvas(640,640);
  setupCoordinates();
  setupShapeSettings();
  // Positions the image of the dove on the top left of the canvas
  image(doveImg, 0, 0, 100, 100);

  // Setting up the sine curve motion (width of screen)
  // Value of incrementation
  // Array storing the Y value of the images
  waveWidth = width;
  increment = (TWO_PI / period) * xSpacing;
  periodYValues = new Array(floor(waveWidth / xSpacing));
}

/**
  Increments the shape's (X, Y) attributes.

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

function translateDove(valueX, valueY, alpha){
  // Positions the dove image on the left side of the canvas
  // Draws a transparent rectangle to erase the trail a little bit
  image(doveImg, doveXPosition += valueX, valueY, doveWidth, doveHeight, alpha);
  fill(255, alpha);
  rect(doveXPosition, valueY, doveWidth, doveHeight * 2);
}

/**
  Functions prefixed "display" are to display each shape with a fill color and size.

*/
function displayCircle(r, g, b, alpha, width, height){
  fill(r, g, b, alpha);
  ellipse(circleX, circleY, width, height);
}

function displaySquare(r, g, b, alpha, width, height){
  // Make the square transparent blue
  fill(r, g, b, alpha, width, height);
  rect(squareX, squareY, squareSize, squareSize);
}

/**
  Alternate display: Approximately ensures that the image will only spawn under the cursor
  if the cursor is somewhere on the canvas.

*/
function displayImgAtMouse(img, width, height){
  if(mouseX > 0 && mouseY > 0){
    image(img, mouseX, mouseY, width, height);
  }
}

/**
  Clamps value of X position if it exceeds canvas size.

*/
function clampXPosition(){
  // Resets the position of the image to x=0 if x > the canvas's X position (looping effect)
  if(doveXPosition >= 640)
  {
    doveXPosition = 0;
  }
}

/**
  Modified from p5.js' reference on Sine Wave.
  For every x value, calculate a y value with a sine function

*/
function calcWave() {
  theta += 0.05;

  let angle = theta;
  for (let i = 0; i < periodYValues.length; i++) {
    periodYValues[i] = sin(angle) * amplitude;
    angle += increment;
  }
}

/**
  Modified from p5.js' reference on Sine Wave. Renders
  the image according to the calculated sine curve function.

*/
function renderWave() {
  for (let x = 0; x < periodYValues.length; x++) {
    image(doveImg, curveX += 0.05, height / 2 * periodYValues[x] * 0.5, doveHeight, doveWidth, alpha);
  }
  // Draws a transparent square to erase the previous image and create a motion effect.
  fill(255, alpha);
  rect(curveX, height / 2, doveWidth, doveHeight * 10, alpha);

  // Resets the dove's position when it exceeds the canvas' width.
  if(curveX >= width){
    curveX = 0;
  }
}

/**
  Draw function-called shapes on each frame.
*/
function draw() {
  // We don't fill the background so we get a drawing effect
  //display shapes
  translateCircle(1, 1);
  displayCircle(255, 0, 0, 10, circleSize, circleSize);
  translateSquare(1, 1);
  displaySquare(0, 0, 255, 10, squareSize, squareSize);

  //wing flapping effect using the alpha property
  translateDove(5, 0, alpha += 25);

  //reset the alpha when it is beyond visibility
  if(alpha > VISIBLE) alpha = 0;

  //reset the position of the dove image if it is offscreen
  clampXPosition();

  //display clef image at mouse location
  displayImgAtMouse(clefImg, 100, 100);

  // Dove moving according to a sine function
  calcWave();
  renderWave();
}
