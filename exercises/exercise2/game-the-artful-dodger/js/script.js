/******************************************************

Author: Sylvain Tran
Date: 19-09-2019

Goal of Program:
Modified version of <The Artful Dodger>.

******************************************************/

// The position and size of our avatar circle
let shepherdAvatar;
let avatarX;
let avatarY;
let avatarSize = 128;

// The speed and velocity of our avatar circle
let avatarSpeed = 10;
let avatarVX = 0;
let avatarVY = 0;

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
let bg;

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
    console.log("Constructing the sheep. Welcome to mayhem!");
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
  avatarX = width/2;
  avatarY = height/2;

  // Put the sheep to the left at a random y coordinate within the canvas
  sheepX = 0;
  sheepY = random(0, height);

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and sheep and checking for dodges and
// game over situations.
function draw() {
  // A pink background
  background(bg);

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

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;

  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

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
  if (dist(sheepX,sheepY,avatarX,avatarY) < sheepSize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the sheep's position
    sheepX = 0;
    sheepY = random(0,height);
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    sheepX = 0;
    sheepY = random(0,height);
    avatarX = width/2;
    avatarY = height/2;
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
  image(shepherdAvatar, avatarX, avatarY, avatarSize, avatarSize);
  //ellipse(avatarX,avatarY,avatarSize,avatarSize);
}
