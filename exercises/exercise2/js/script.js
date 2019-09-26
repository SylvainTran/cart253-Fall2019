/**
  Author: Sylvain Tran
  Date: 19-09-2019
  Cart 253-A-Fall 2019.
  
  Goal of the program:

  This is a modified version of <The Artful Dodger> by Dr. Pippin Bar.
  Focus of this exercise: ifs, translation physics +
  recall stuff about JSON manipulation, Flexbox and JQuery.
  
  This game was only tested on Firefox and Motorola G Play (mobile) so far.

  Queue of features to add:
  
  - Implement the pathfinding algorithms according to game mode (Ask Dr. Pippin).
  - More interesting data-oriented gameplay fitting game design. Also change the whole thing.
  - Animations... some kind of enemy sprite too.
  - More interesting levels...
  - etc.

*/

"use strict";
p5.disableFriendlyErrors = true; // disables FES for slight optimization.

// Global reference to the canvas because it is somehow manipulated in several places.
let sketchCanvas;

// Data of the sheeps.
let sheepData = {}; // "js/sheepData.json"

// How many dodges the player has made, how many lives are left, and how many sheeps were saved
let dodges = 0;
let LIVES = 10;
let saved = 0;

// Bad Shepherd Mode vs. Good Shepherd Mode.
let BAD_SHEPHERD_MODE = false;

// Checks if game was first launched.
let firstLaunchedGame = true;

// The position and size of our shepherd's avatar
let shepherdAvatar;
let shepherdX;
let shepherdY;
let shepherdSize = 128;

// The speed and velocity of our shepherd's avatar
let shepherdSpeed = 10;
let shepherdVX = 0;
let shepherdVY = 0;

// The position and size of the sheeps
let sheepX;
let sheepY;
let sheepSize = 128;
let sizeIncrease = 20;

// The spawned sheep
let sheepAvatar;
let testSheep1;

// How many sheep that are currently on the canvas and how many should we have at once
let sheepCount = 0;
const MAX_SHEEP_ALIVE = 1;

// The speed and velocity of our sheep
let sheepSpeed = 0.10;
let sheepVX = 3;

// Parallax background.
let bg;
let cityBg;

// First image.
let x1 = 0;
// Second image.
let x2;
// Scroll speed for the parallax effect.
let scrollSpeed = 4;

// Forum font.
let forum;

/**

  These classes were copy pasted from exercise 1 with Dr. Pippin's feedback in mind.
  Question: How to create private fields in Javascript? I looked it up, the # thing is
  still experimental.

*/
class GeometricalFigure{

  constructor(x, y, w, h){
    this.xPos = x;
    this.yPos = y;
    this.shapeWidth = w;
    this.shapeHeight = h;
  }
  // Accessors and mutators.
  getXPos(){
    return this.xPos;
  }

  getYPos(){
    return this.yPos;
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
}

class Sheep extends GeometricalFigure{ 
  constructor(x, y, w, h, sheepFirstName, sheepLastName, sheepEmail, sheepGender, sheepIPAddress, sheepDrug,
              sheepCompany, sheepJobTitle, sheepLanguage, sheepPhone, sheepUsername, sheepEthnicity, sheepShirtSize, 
              sheepICD10Diag, sheepAvatar, sheepCreditCard){
    super(x, y, w, h);
    console.log("Constructing the sheep. Baah!");

    // The sheep data used for mayhem.
    this.sheepFirstName = sheepFirstName;
    this.sheepLastName = sheepLastName;
    this.sheepEmail = sheepEmail;
    this.sheepGender = sheepGender;
    this.sheepIPAddress = sheepIPAddress;
    this.sheepDrug = sheepDrug;
    this.sheepCompany = sheepCompany;
    this.sheepJobTitle = sheepJobTitle;
    this.sheepLanguage = sheepLanguage;
    this.sheepPhone = sheepPhone;
    this.sheepUsername = sheepUsername;
    this.sheepEthnicity = sheepEthnicity;
    this.sheepShirtSize = sheepShirtSize;
    this.sheepICD10Diag = sheepICD10Diag;
    this.sheepAvatar = sheepAvatar; // May not be used for creative issues
    this.sheepCreditCard = sheepCreditCard;
  }

  /**
   Returns the name of this shape.

  */
  get type(){
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
     
  /**
    Displays a random name for the newly born sheep.

  */
  displayRandomName(currentSheepX, currentSheepY){
  
  if(BAD_SHEPHERD_MODE) {
    fill(0, 0, 255);
  }
  else {
    fill(150, 250, 55);
  }
  text(this.sheepFirstName + " " + this.sheepLastName, currentSheepX, currentSheepY);  
 }

  /**
    Displays a random name for the newly born sheep.

  */
 displayHistory(){   
   let lineSpacing = 15;
   let sheepDataX = width / 3.5;
   let sheepDataY = height / 10;
   
   if(BAD_SHEPHERD_MODE) {
    fill(0);
   }
   else {
    fill(255);
   }

   textSize(18);
   textFont('forum');
    text(this.sheepGender, sheepDataX, sheepDataY + lineSpacing * 2);
    text(this.sheepEthnicity, sheepDataX, sheepDataY + lineSpacing * 4);    
    text("Drug: " + this.sheepDrug, sheepDataX, sheepDataY + lineSpacing * 6);
    text(this.sheepCompany, sheepDataX, sheepDataY + lineSpacing * 8);
    text(this.sheepJobTitle, sheepDataX, sheepDataY + lineSpacing * 10);
    text(this.sheepEmail, sheepDataX, sheepDataY * 12);
    text(this.sheepIPAddress, sheepDataX, sheepDataY + lineSpacing * 14);
    text("Cell: " + this.sheepPhone, sheepDataX, sheepDataY + lineSpacing * 16);
    text("Shirt Size: " + this.sheepShirtSize, sheepDataX, sheepDataY + lineSpacing * 20);   
    text("VISA number: " + this.sheepCreditCard, sheepDataX, sheepDataY + lineSpacing * 22); 
  }
}

class ShepherdAvatar extends GeometricalFigure{
  constructor(x, y, w, h){
    super(x, y, w, h);
    console.log("Woe!");
  }

  /**
    Displays a sheep avatar.

  */
  displayShepherdAvatar(shepherd, sheepX, width, height){
    image(shepherd, sheepX, sheepY, width, height);
  }

  /**
    Moves sheep up and to the right.

  */
  translateSheep(valueX){
    this.xPos += valueX;
   }
}

/**
  Preload assets (images and font) plus the sheep data.

*/
function preload() {
  shepherdAvatar = loadImage('./images/shepherd.png');
  sheepAvatar = loadImage('./images/singleSheep.png');
  bg = loadImage('./images/desertbgFull.jpg');
  cityBg = loadImage('./images/cityBg.jpg');
  
  // Asynchronously fetches the sheep data from the JSON file.
  sheepData = loadJSON('./js/sheepData.json');

  // Textfont
  forum = loadFont('./forum.ttf');
}

/**
  Make the canvas, position the avatar and enemy.

*/
function setup() {
  // Creates our playing area and parents it within the flexbox in the middle of the screen.
  sketchCanvas = createCanvas(600, 600); 
  sketchCanvas.parent('sketchDiv');   

  // Changes the background image depending on the game mode.
  setBackgroundImage();

  // Put the avatar in the centre
  shepherdX = width / 2;
  shepherdY = height / 2;

  // Put the sheep to the left at a random y coordinate within the canvas
  sheepX = 0;
  sheepY = random(0, height);

  // Second x position is set to the width for the parallax effect.
  x2 = width;
}

/**
  Starts the bad shepherd version of the game.

*/
function startBadShepherdGame() {
  if (sketchCanvas !== undefined) {
    BAD_SHEPHERD_MODE = true;
    sketchCanvas.show();
    loop();
  }
  else {
    try {
      sketchCanvas = createCanvas(600, 600);
      sketchCanvas.parent('sketchDiv');
      BAD_SHEPHERD_MODE = true;
      sketchCanvas.show();
      loop();
    } catch (error) {
      console.log("Um...");
    }
  }
}

/**
  Starts the good shepherd version of the game.

*/
function startGoodShepherdGame() {
  if (sketchCanvas !== undefined) {
    BAD_SHEPHERD_MODE = false;
    sketchCanvas.show();
    loop();
  }
}

/**
  Sets the background image to the corresponding shepherd game mode.

*/
function setBackgroundImage() {
  if (BAD_SHEPHERD_MODE) {
    background(bg);
  }
  else {
    background(cityBg);
  }
}

/**

  Hides the canvas if the game was just launched.

*/
function initialPageLoading() {
  if (firstLaunchedGame) {
    noLoop();
    sketchCanvas.hide();
    firstLaunchedGame = false;
  }
}

/**
  
  Updates the game state at each frame to see if the player has
  won or lost the game yet.

*/
function updateGameState(){
  console.log("Updating game state function.");
  if(dodges === 10 && BAD_SHEPHERD_MODE) {
    alert("Nice job! You have abandoned everyone else for your own safety.");
    noLoop();
  }
  else if(dodges === 10 && !BAD_SHEPHERD_MODE) {
    alert("This is impossible! You are the Good Shepherd...");
    noLoop();
  }

  if(saved === 10) {
    alert("You are the good shepherd!");
    noLoop();
  }
  
  if(LIVES === 0) {
    alert("You ran out of life. Try again...");
    textSize(100);
    alert("Game Over");
    noLoop();
  }
  //showRetryScreen();
}

/**

  Move the background in parallax (continuous scrolling). From the associated p5.js reference.

*/
function backgroundParallax() {

  if(BAD_SHEPHERD_MODE) {
    image(bg, x1, 0, width, height);
    image(bg, x2, 0, width, height);
    x1 -= scrollSpeed;
    x2 -= scrollSpeed;
    if (x1 < -width) {
      x1 = width;
    }
    if (x2 < -width) {
      x2 = width;
    }
  }
  else {
    image(cityBg, x1, 0, width, height);
    image(cityBg, x2, 0, width, height);
    x1 -= scrollSpeed;
    x2 -= scrollSpeed;
    if (x1 < -width) {
      x1 = width;
    }
    if (x2 < -width) {
      x2 = width;
    }    
  }

}

/**
  
  Checks if there is a sheep alive on the canvas; if not, spawn one and
  increment the count. If there is somehow more than 1 sheep, reset to 0.

*/
function checkConcurrentSheeps(){
  if(sheepCount < MAX_SHEEP_ALIVE)
  {
    console.log("Sheep count is 0. Spawning a new sheep.");
    spawnSheeps();
    // Increment the number of sheeps alive
    sheepCount++;
  }
  else { // ...We have more than necessary
    sheepCount = 0;
    console.log("Warning: check the functions that increment the sheepCount..");
  }
}

/**

  Moves the avatar on each frame according to the game mode and the set contrain() if applicable.

*/
function MoveAvatar(leftWall, rightWall) {
  shepherdX += shepherdVX;
  shepherdY += shepherdVY;
  let xConstrain = constrain(shepherdX, leftWall, rightWall);

  // Constrains the avatar to the right half of the screen
  if (BAD_SHEPHERD_MODE) {
    image(shepherdAvatar, xConstrain, shepherdY, shepherdSize, shepherdSize);
  }
  else {
    // Constrains the good shepherd inside the screen -- so he doesn't actually run away
    let topWall = 0;
    let bottomWall = height;
    let yConstrain = constrain(shepherdY, topWall, bottomWall);

    // TODO test this
    image(shepherdAvatar, xConstrain, yConstrain, shepherdSize, shepherdSize);
  }
}

/**

  Resets velocity of the shepherd if there was no input.

*/
function resetVelocity() {
  shepherdVX = 0;
  shepherdVY = 0;
}

/**

  Randomly spawns the sheeps according to a unique row ID for each sheep in the sheepData.json.
  
*/
function spawnSheeps() {
  let randomId = Math.floor(random(1, 100));

  testSheep1 = new Sheep(sheepX, sheepY, sheepSize, sheepSize, sheepData[randomId].first_name, 
    sheepData[randomId].last_name, sheepData[randomId].email, sheepData[randomId].gender, sheepData[randomId].ip_address,
    sheepData[randomId].drug_name, sheepData[randomId].fake_company_name, sheepData[randomId].job_title, sheepData[randomId].language,
    sheepData[randomId].phone, sheepData[randomId].username, sheepData[randomId].ethnicity, sheepData[randomId].shirt_size, sheepData[randomId].icd10_diag,
    sheepData[randomId].avatar, sheepData[randomId].credit_card);    
}

/**

  The three following display functions are to display the statistics at the top of the canvas.

*/
function displayDodges() {
  fill(0, 0, 255);
  textFont('forum');
  textSize(32);
  text(dodges + " Sheep lost.", width - (width * 0.15), (height * 0.05));
}

function displayLives() {
  fill(255, 0, 0);
  textFont('forum');
  textSize(32);
  text(LIVES + " Lives Left.", width - (width * 0.45), (height * 0.05));
}

function displaySaved() {
  fill(0, 255, 64);
  textFont('forum');
  textSize(32);
  text(saved + " Saved.", width - (width * 0.70), (height * 0.05));
}

/**
 
  The sheep avoid the bad shepherd in that mode.
  NOT IMPLEMENTED YET.
 
*/
function avoidshepherd() {
  let shepherdVector = createVector(shepherdX, shepherdY);
  let sheepVector = createVector(sheepX, sheepY);
  console.log("Sheep's position: " + sheepVector);
  console.log("Bad Shepherd's position: " + shepherdVector);
  console.log("Distance between sheep and bad shepherd: " + sheepVector.dist(shepherdVector).toFixed(2));

  // Cause deviation from the bad shepherd
    if(sheepVector.dist(shepherdVector).toFixed(2) <= 100){
      // Some path algorithm to avoid running into the player's avatar
    }
}

/**
  
  The sheep are attracted to the good shepherd in that mode.
  NOT IMPLEMENTED YET.

*/
function obeyGoodShepherd() {
  let goodShepherdVector = createVector(shepherdX, shepherdY);
  let sheepVector = createVector(sheepX, sheepY);
  let detectionRange = 75;
  console.log("Sheep's position: " + sheepVector);
  console.log("Good Shepherd's position: " + shepherdVector);
  console.log("Distance between sheep and good shepherd: " + sheepVector.dist(shepherdVector).toFixed(2));

  // Cause deviation from the bad shepherd
  if(sheepVector.dist(goodShepherdVector).toFixed(2) <= detectionRange){
    // TODO Some path algorithm to avoid running into the player's avatar
  }
}

/**
  
  Checks if the sheep and avatar overlap - if they do the player loses.
  We do this by checking if the distance between the centre of the sheep
  and the centre of the avatar is less that their combined radii. 

*/
function checkSheepCollision() {
  if (dist(sheepX, sheepY, shepherdX, shepherdY) < sheepSize / 2 + shepherdSize / 2) {
    if(BAD_SHEPHERD_MODE) {
      text("Aack! Leave me alone!", sheepX, sheepY + 50);
      // Reset the sheep's position
      sheepX = 0;
      sheepY = random(0, height);
      // Reset the avatar's position
      shepherdX = width / 2;
      shepherdY = height / 2;
      // Reset the dodge counter
      dodges = 0;
      // Remove a life.
      LIVES--;
    }
    else {
      text("I'm saved!", sheepX, sheepY + 50);
      dodges = 0;
      saved += 1;
      sheepX = width; // pushes the sheep forth to life
    }
  }
}

/**
  
  Checks if the player avatar left the boundaries of the screen.
  If so, the last sheep respawns on the left of the canvas at a random height,
  a life is lost, and dodges is reset to 0.

*/
function checkIfAvatarLeftScreen() {
  if (shepherdX < 0 || shepherdX > width || shepherdY < 0 || shepherdY > height) {
    sheepX = 0;
    sheepY = random(0, height);
    shepherdX = width / 2;
    shepherdY = height / 2;
    dodges = 0;
    LIVES--;
  }
}

/**
  
  Displays a text above the shepherd's head according to the game mode,
   if they cross the half of the screen. 

*/
function displayShamefulText() {
  fill(255, 0, 0);
  textAlign("center", "center");
 
  // Displays shameful dialogue if the bad shepherd attempts to cross the first half of the screen
  if (shepherdX === width / 2 && BAD_SHEPHERD_MODE) {
    text("Oyaya! Bad doggie come again? I'm outta here!", shepherdX, shepherdY);
    text("(You can't go further.)", shepherdX, shepherdY + 35);
  }
  else if(shepherdX === width / 2 && !BAD_SHEPHERD_MODE) {
    fill(255);
    text('"My sheep listen to my voice; I know them, and they follow me."', shepherdX, shepherdY);
  }
}

/**
  
  Check if the sheep has not collided with the shepherd avatar and 
  has gotten to the right side of the screen (width). If so,
  in bad shepherd mode increase dodges by 1, in the two modes,
  increase sheep size and respawns to the left at a random height.
  Removes the number of sheep of the screen and increases their speed.

*/
function checkDodged() {
  if(sheepX > width) {
    if(BAD_SHEPHERD_MODE) {
      dodges++;
    }
    sheepSize += sizeIncrease;
    console.log("sheep size = " + sheepSize);
    sheepX = 0;
    sheepY = random(0, height);
    // Consider the sheep as dead
    sheepCount--;
    // increase the speed for the next sheeps
    sheepSpeed += 0.15;
  }
}

/**

  Check which keys are down and set the avatar's velocity based on its
  speed appropriately.

*/
function handleInputs() {
  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    shepherdVX = -shepherdSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    shepherdVX = shepherdSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    shepherdVY = -shepherdSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    shepherdVY = shepherdSpeed;
  }
}

/**
  
  Mobile controls. Should be the same as keyboard controls prior.


function mousePressed() {
  // Moves the shepherd avatar to mouse location x, y.
  // TODO: Test
  image(shepherdAvatar, mouseX += shepherdVX, mouseY += shepherdVY, shepherdSize, shepherdSize);
}
*/

/**
  
  Show a retry screen if the player wants to play again God forbids.

*/
function showRetryScreen() {
  //sketchCanvas.hide();
}

/**
  
  Resets the player statistics for a new game.

*/
function resetGame() {
  dodges = 0;
  saved = 0;
  LIVES = 10;
}

/**
  Handles moving the avatar and sheep and checking for dodges and
  game over situations.

*/
function draw() {
  // Updates game logic and statistics
  initialPageLoading();
  updateGameState();
  backgroundParallax();
  checkConcurrentSheeps();
  displayDodges();
  displayLives();
  displaySaved();

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  resetVelocity();
  handleInputs();

  // Moves the lastly spawned sheep
  sheepVX = sheepSpeed;
  testSheep1.translateSheep(sheepX += 10 * sheepVX);
  testSheep1.displaySheep(sheepAvatar, sheepX, sheepSize, sheepSize);
  testSheep1.displayRandomName(sheepX, sheepY);
  testSheep1.displayHistory();

  // Updates the player's status
  checkSheepCollision();
  checkIfAvatarLeftScreen();
  checkDodged();

  // Constrains the bad shepherd to half of the screen
  let leftWall = width / 2;
  let rightWall = width;

  // Moves the avatar according to its calculated velocity
  MoveAvatar(leftWall, rightWall);
  displayShamefulText();
}