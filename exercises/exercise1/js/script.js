"use strict";

/**
  Title: Exercise 1 - Movement
  Author: Sylvain Tran - CART 253 - Section A - Student ID: 26651550
  Date: 2019-09-14.

  Goal of the program:
    Customized sketch code in p5.js for Exercise 1.
    Draws a moving circle, square, two moving doves and a musical clef under mouse location.
    I added classes to remember some past stuff about polymorphism and inheritance...
    Would be useful if I had cooler ideas about what to do with this.

*/

// The current size of the circle. Change here.
let circleSize = 100;

// The current size of the square. Change here.
let squareSize = 100;

// The dove image's attributes.
let doveImg;
let doveXPosition = 0;
let doveYPosition = 0;
let doveWidth = 100;
let doveHeight = 100;

// Iterator alpha value and visibility threshold (alpha transparency).
let alpha = 0;
let VISIBLE = 50;

// The musical clef image's attributes.
let clefImg;
let clefXPosition = 0;
let clefYPosition = 0;
let clefWidth = 100;
let clefHeight = 100;

// Optional challenge: Sine curve attributes.
let curveX = 0; // X value on the period.
let xSpacing = 10; // Distance between each horizontal location.
let waveWidth; // width of entire wave.
let theta = 0.0; // Start angle at 0.
let amplitude = 150; // Height of wave.
let period = 320; // How many pixels before the wave repeats.
let increment = 0; // Value for incrementing sine function's domain values.
let periodYValues = []; // An array to store the Y values of the sine function.

/**
  The base class to be inherited from, for the custom shapes
  used in this exercise.

*/
class GeometricalFigure{
  // Explicit constructor.
  constructor(x, y, w, h){
    this.xPos = x;
    this.yPos = y;
    this.shapeWidth = w;
    this.shapeHeight = h;
  }
  // Abstract function to be overriden; should return the type.
  getType(){
    console.log("Needs an override");
  }
  // Accessors and mutators.
  getXPos(){
    return console.log("X Pos of this shape: " + this.xPos);
  }

  getYPos(){
    return console.log("Y Pos of this shape: " + this.yPos);
  }

  setWidth(newWidth){
    if(newWidth > 0){
      this.shapeWidth = newWidth;
    }
  }

  setHeight(newHeight){
    if(newHeight > 0){
      this.shapeHeight = newHeight;
    }
  }

  /**
    Setups starting position for the circle shape.

  */
  setupCoordinates(){
    // Start the circle off screen to the bottom left.
    // We divide the size by two because we're drawing from the center.
    this.xPos = -circleSize / 2;
    this.yPos = height + circleSize / 2;
  }
}

class Ellipse extends GeometricalFigure{
  constructor(x, y, w, h){
    super(x, y, w, h);
    console.log("Constructing the ellipse. Welcome to mayhem!");
  }

  /**
   Returns the name of this shape.

  */
  getType(){
    return "Ellipse";
  }

  /**
    Displays an ellipse with a fill color and size.

  */
  displayEllipse(r, g, b, alpha, width, height){
    fill(r, g, b, alpha);
    ellipse(this.xPos, this.yPos, width, height);
  }

  /**
    Moves circle up and to the right.

  */
  translateEllipse(valueX, valueY){
    this.xPos += valueX;
    this.yPos -= valueY;
  }
}
class Square extends GeometricalFigure{
  constructor(x, y, w, h){
    super(x, y, w, h);
    console.log("Constructing the square. Ah, yes--I am indeed a higher life form.");
  }

  /**
   Returns the name of this shape.

  */
  getType(){
    return "Square";
  }

  /**
    Overriden function. Setups the coordinates for the square shape.

  */
  setupCoordinates(){
    // Starts the circle and square off screen to the bottom left
    // We divide their size by two because we're drawing from the center
    this.xPos = width + squareSize / 2;
    this.yPos = height + squareSize / 2;
  }

  displaySquare(r, g, b, alpha, width, height){
    // Make the square transparent blue
    fill(r, g, b, alpha, width, height);
    rect(this.xPos, this.yPos, width, height);
  }

  translateSquare(valueX, valueY){
    // Move square up and to the left
    this.xPos -= valueX;
    this.yPos -= valueY;
  }
}

/**
  Setups the mode and stroke settings for the shapes,
  the sine curve motion (width of screen),
  the value of incrementation,
  and the array storing the Y value of the images.

*/
function shapeSettings(){
  rectMode(CENTER);
  noStroke();
  waveWidth = width;
  increment = (TWO_PI / period) * xSpacing;
  periodYValues = new Array( floor(waveWidth / xSpacing) );
}

/**
  Preloads the dove and clef images.

*/
function preload() {
  doveImg = loadImage('./assets/images/dove.png');
  clefImg = loadImage('./assets/images/clef.png');
}

/**
  Setups the basic canvas state: coordinates and settings for the shapes plus the dove image.

*/
// Practice: Classes, polymorphism and inheritance.
let profsRedEllipse = new Ellipse(0, 0, circleSize, circleSize);
let profsBlueSquare = new Square(0, 0, 255, 10, squareSize, squareSize);

function setup(){
  createCanvas(640, 640);
  profsRedEllipse.setupCoordinates();
  profsBlueSquare.setupCoordinates();
  shapeSettings();
}

function translateImg(valueX, valueY, alpha){
  // Positions the dove image on the left side of the canvas.
  // Draws a transparent rectangle to erase the trail a little bit.
  image(doveImg, doveXPosition += valueX, valueY, doveWidth, doveHeight, alpha);
  fill(255, alpha);
  rect(doveXPosition, valueY, doveWidth, doveHeight * 2);
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
  // Resets the position of the image to x = 0 if x > the canvas's X position (creates a looping effect).
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
  Main (update) function. Draw function-called shapes on each frame.

*/
function draw() {
  // We don't fill the background so we get a drawing effect.
  // Displays the ellipse and square.
  profsRedEllipse.displayEllipse(255, 0, 0, 10, circleSize, circleSize);
  profsRedEllipse.translateEllipse(1, 1);

  //profsRedEllipse.getXPos();
  //profsRedEllipse.getYPos();

  profsBlueSquare.displaySquare(0, 0, 255, 10, squareSize, squareSize);
  profsBlueSquare.translateSquare(1, 1);

  //profsBlueSquare.getXPos();
  //profsBlueSquare.getYPos();

  // Creates a wing flapping effect by incrementing the alpha property.
  translateImg(5, 0, alpha += 25);

  // Resets the alpha when it is beyond visibility.
  if(alpha > VISIBLE) alpha = 0;

  // Resets the position of the dove image if it is offscreen.
  clampXPosition();

  // Displays clef image at mouse location.
  displayImgAtMouse(clefImg, 100, 100);

  // Makes dove image move according to a sine function.
  calcWave();
  renderWave();
}
