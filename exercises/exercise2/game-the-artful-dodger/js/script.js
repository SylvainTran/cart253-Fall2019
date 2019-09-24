/******************************************************

Author: Sylvain Tran
Date: 19-09-2019

Goal of Program:
Modified version of <The Artful Dodger>.

******************************************************/
"use strict";
p5.disableFriendlyErrors = true; // disables FES for slight optimization

// The position and size of our bad shepherd's avatar
let shepherdAvatar;
let badShepherdX;
let badShepherdY;
let badShepherdSize = 128;

// The speed and velocity of our bad shepherd's avatar
let badShepherdSpeed = 10;
let badShepherdVX = 0;
let badShepherdVY = 0;

// The position and size of the sheeps
let sheeps = [99];
let sheepX;
let sheepY;
let sheepSize = 128;
let sheepAvatar;
let testSheep1;

// The speed and velocity of our sheep circle
let sheepSpeed = 5;
let sheepVX = 5;

// How many dodges the player has made
let dodges = 0;

// parallax background
let bg;
// first image
let x1 = 0;
// second image
let x2;
let scrollSpeed = 4;

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
    Setups starting position for the geometrical shape.

  */
  setupCoordinates(){
    // Start the circle off screen to the bottom left.
    // We divide the size by two because we're drawing from the center.
    this.xPos = -circleSize / 2;
    this.yPos = height + circleSize / 2;
  }
}

class Sheep extends GeometricalFigure{
  constructor(x, y, w, h){
    super(x, y, w, h);
    console.log("Constructing the sheep. Baah!");
  }

  /**
   Returns the name of this shape.

  */
  getType(){
    return "Sheep";
  }

  /**
    Displays a sheep avatar.

  */
  displaySheep(sheepAvatar, sheepX, width, height){
    image(sheepAvatar, sheepX, sheepY, width, height);
  }

  /**
    Moves sheep up and to the right.

  */
  translateSheep(valueX){
    this.xPos += valueX;
   }
}

class BadShepherdAvatar extends GeometricalFigure{
  constructor(x, y, w, h){
    super(x, y, w, h);
    console.log("One more bad shepherd. Woe!");
  }

  /**
   Returns the name of this shape.

  */
  getType(){
    return "Bad Shepherd Avatar";
  }

  /**
    Displays a sheep avatar.

  */
  displayBadShepherdAvatar(badShepherd, sheepX, width, height){
    image(badShepherd, sheepX, sheepY, width, height);
  }

  /**
    Moves sheep up and to the right.

  */
  translateSheep(valueX){
    this.xPos += valueX;
   }
}

function preload() {
  shepherdAvatar = loadImage('./images/badShepherd.png');
  sheepAvatar = loadImage('./images/singleSheep.png');
  bg = loadImage('./images/desertbgFull.jpg');
}

// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(1280, 720);
 
  // Put the avatar in the centre
  badShepherdX = width/2;
  badShepherdY = height/2;

  // Put the sheep to the left at a random y coordinate within the canvas
  sheepX = 0;
  sheepY = random(0, height);

  x2 = width;

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and sheep and checking for dodges and
// game over situations.
function draw() {
  // A desert background
  background(bg);
  // Moving in parallax left to right
  image(bg, x1, 0, width, height);
  image(bg, x2, 0, width, height);
  
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;
  
  if (x1 < -width){
    x1 = width;
  }
  if (x2 < -width){
    x2 = width;
  }
  

  testSheep1 = new Sheep(sheepX, sheepY, sheepSize, sheepSize);  
  testSheep1.displaySheep(sheepAvatar, sheepX, sheepSize, sheepSize);
  testSheep1.translateSheep(sheepX += 10);

  fill(0);
  textFont('Arial');
  textSize(28);
  text(dodges + " DODGED!", 0, 25);

  /* Fills the sheep pen (array)
  for(let i = 0; i < 99; i++)
  {
    //sheeps[i] = createImage(sheepAvatar, sheepX, random(0, height), 75, 75);
    //console.log("new sheep " + i);
  }
  */
  // Constrains the bad shepherd to half of the screen
  let leftWall = width / 2;
  let rightWall = width;
 
  let xc = constrain(badShepherdX, leftWall, rightWall);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  badShepherdVX = 0;
  badShepherdVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    badShepherdVX = -badShepherdSpeed;

  }
  else if (keyIsDown(RIGHT_ARROW)) {
    badShepherdVX = badShepherdSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    badShepherdVY = -badShepherdSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    badShepherdVY = badShepherdSpeed;
  }

  // Move the avatar according to its calculated velocity
  badShepherdX += badShepherdVX;
  badShepherdY += badShepherdVY;

  // The sheep always moves at sheepSpeed
  sheepVX = sheepSpeed;
  // Update the sheep's position based on its velocity

  /*for(sheep in sheeps)  {
    sheepX = sheepX + sheepVX;
  }
  */
  // Check if the sheep and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the sheep
  // and the centre of the avatar is less that their combined radii
  if (dist(sheepX, sheepY, badShepherdX, badShepherdY) < sheepSize/2 + badShepherdSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the sheep's position
    sheepX = 0;
    sheepY = random(0,height);
    // Reset the avatar's position
    badShepherdX = width/2;
    badShepherdY = height/2;
    // Reset the dodge counter
    dodges = 0;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (badShepherdX < 0 || badShepherdX > width || badShepherdY < 0 || badShepherdY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    sheepX = 0;
    sheepY = random(0,height);
    badShepherdX = width/2;
    badShepherdY = height/2;
    dodges = 0;
  }

  // Check if the sheep has moved all the way across the screen
  if (sheepX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
 
    //Increase sheep size
    sheepSize += 5; 
    console.log("sheep size = " + sheepSize);

    // Reset the sheep's position to the left at a random height
    sheepX = 0;
    sheepY = random(0,height);    

  }

  // Display the number of successful dodges in the console
  console.log(dodges);

  // The player is black
  fill(0);

  // Draws the player as the bad shepherd
  image(shepherdAvatar, xc, badShepherdY, badShepherdSize, badShepherdSize);

  fill(255, 0, 0);
  textAlign("center", "center");

  // Displays shameful dialogue if the bad shepherd attempts to cross the first half of the screen
  if(badShepherdX === width / 2)
  {
    text("Oyaya! Bad doggie come again? I'm outta here! Kekeke.", badShepherdX, badShepherdY);
  }
}