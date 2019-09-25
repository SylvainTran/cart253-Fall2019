/**
  Author: Sylvain Tran
  Date: 19-09-2019

  Goal of Program:
  Modified version of <The Artful Dodger> by Dr. Pippin Bar
  Cart 253-A-Fall 2019.

  Warning:
  This game was only tested on Chrome and Motorola G Play (mobile).

*/

"use strict";
p5.disableFriendlyErrors = true; // disables FES for slight optimization
let sketchCanvas;
// Data for the sheep
let sheepData = {}; // "js/sheepData.json"
// How many dodges the player has made, how many lives are left, and how many sheeps were saved
let dodges = 0;
let LIVES = 10;
let saved = 0;

// Bad Shepherd Mode vs. Good Shepherd Mode
let BAD_SHEPHERD_MODE = false;

// Checks if game was first launched
let firstLaunchedGame = true;

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
//let sheeps = [99];
let sheepX;
let sheepY;
let sheepSize = 128;
let sizeIncrease = 20;
let sheepAvatar;
let testSheep1;
let sheepCount = 0;
const MAX_SHEEP_ALIVE = 1;

// The speed and velocity of our sheep circle
let sheepSpeed = 0.5;
let sheepVX = 5;

// Parallax background.
let bg;
let cityBg;

// First image.
let x1 = 0;
// Second image.
let x2;
// Scroll speed for the parallax effect.
let scrollSpeed = 4;

// forum font
let forum;

class GeometricalFigure{

  constructor(x, y, w, h){
    this.xPos = x;
    this.yPos = y;
    this.shapeWidth = w;
    this.shapeHeight = h;
  }

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
   let sheepDataY = height / 5;
   
   if(BAD_SHEPHERD_MODE) {
    fill(0);
   }
   else {
    fill(255);
   }

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
    //text("ICD10 Diagnosis: " + this.sheepICD10Diag, sheepDataX, sheepDataY + lineSpacing * 22);  
    text("VISA number: " + this.sheepCreditCard, sheepDataX, sheepDataY + lineSpacing * 22); 
  }
}

class BadShepherdAvatar extends GeometricalFigure{
  constructor(x, y, w, h){
    super(x, y, w, h);
    console.log("Woe!");
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
  cityBg = loadImage('./images/cityBg.jpg');
  
  // Asynchronously fetches the sheep data from the JSON file.
  sheepData = loadJSON('./js/sheepData.json');

  // Textfont
  forum = loadFont('./forum.ttf');
}

/**
  Starts the bad shepherd version of the game.

*/
function startBadShepherdGame() {
  BAD_SHEPHERD_MODE = true;
  sketchCanvas.show();
  loop();
}

/**
  Starts the good shepherd version of the game.

*/
function startGoodShepherdGame() {
  BAD_SHEPHERD_MODE = false;
  sketchCanvas.show();
  loop();
}

/**
  Make the canvas, position the avatar and enemy.

*/
function setup() {
  // Create our playing area (inner window's size)
  sketchCanvas = createCanvas(windowWidth, windowHeight);
  sketchCanvas.parent('sketchDiv');   
  //sketchCanvas.position(windowWidth, windowHeight);  

  // Changes the background image depending on the game mode.
  if(BAD_SHEPHERD_MODE) {
    background(bg);
  }
  else {
    background(cityBg);
  }

  // Put the avatar in the centre
  badShepherdX = width / 2;
  badShepherdY = height / 2;

  // Put the sheep to the left at a random y coordinate within the canvas
  sheepX = 0;
  sheepY = random(0, height);

  // Second x position is set to the width for the parallax effect.
  x2 = width;
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

function MoveAvatar(leftWall, rightWall) {
  badShepherdX += badShepherdVX;
  badShepherdY += badShepherdVY;

  // Constrains the avatar to the right half of the screen
  if (BAD_SHEPHERD_MODE) {
    let xc = constrain(badShepherdX, leftWall, rightWall);
    // Draws the player as the bad shepherd
    image(shepherdAvatar, xc, badShepherdY, badShepherdSize, badShepherdSize);
  }
  else {
    // TODO contrain on all four sides outside canvas
    // Draws the player as the good shepherd
    image(shepherdAvatar, badShepherdX, badShepherdY, badShepherdSize, badShepherdSize);
  }
}

function resetVelocity() {
  badShepherdVX = 0;
  badShepherdVY = 0;
}

function spawnSheeps() {
  let randomId = Math.floor(random(1, 100));

  testSheep1 = new Sheep(sheepX, sheepY, sheepSize, sheepSize, sheepData[randomId].first_name, 
    sheepData[randomId].last_name, sheepData[randomId].email, sheepData[randomId].gender, sheepData[randomId].ip_address,
    sheepData[randomId].drug_name, sheepData[randomId].fake_company_name, sheepData[randomId].job_title, sheepData[randomId].language,
    sheepData[randomId].phone, sheepData[randomId].username, sheepData[randomId].ethnicity, sheepData[randomId].shirt_size, sheepData[randomId].icd10_diag,
    sheepData[randomId].avatar, sheepData[randomId].credit_card);    
}

function displayDodges() {
  fill(0, 0, 255);
  textFont('forum');
  textSize(32);
  text(dodges + " Sheep lost.", windowWidth - (windowWidth * 0.08), (windowHeight * 0.05));
}

function displayLives() {
  fill(255, 0, 0);
  textFont('forum');
  textSize(32);
  text(LIVES + " Lives Left.", windowWidth - (windowWidth * 0.25), (windowHeight * 0.05));
}

function displaySaved() {
  fill(0, 255, 64);
  textFont('forum');
  textSize(32);
  text(saved + " Saved.", windowWidth - (windowWidth * 0.40), (windowHeight * 0.05));
}

// Moves in parallax left to right.
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
  The sheep avoid the bad shepherd in that mode.

 */
function avoidBadShepherd() {
  let badShepherdVector = createVector(badShepherdX, badShepherdY);
  let sheepVector = createVector(sheepX, sheepY);
  console.log("Sheep's position: " + sheepVector);
  console.log("Bad Shepherd's position: " + badShepherdVector);
  console.log("Distance between sheep and bad shepherd: " + sheepVector.dist(badShepherdVector).toFixed(2));

  // Cause deviation from the bad shepherd
    if(sheepVector.dist(badShepherdVector).toFixed(2) <= 100){
      // Some path algorithm to avoid running into the player's avatar
    }
}


/**
  The sheep are attracted to the good shepherd in that mode.
    
 */
function obeyGoodShepherd() {
  let goodShepherdVector = createVector(badShepherdX, badShepherdY);
  let sheepVector = createVector(sheepX, sheepY);
  console.log("Sheep's position: " + sheepVector);
  console.log("Good Shepherd's position: " + badShepherdVector);
  console.log("Distance between sheep and good shepherd: " + sheepVector.dist(badShepherdVector).toFixed(2));

  // Cause deviation from the bad shepherd
    if(sheepVector.dist(goodShepherdVector).toFixed(2) <= 100){
      // Some path algorithm to avoid running into the player's avatar
    }
}

/**
  
  Checks if the sheep and avatar overlap - if they do the player loses
  We do this by checking if the distance between the centre of the sheep
  and the centre of the avatar is less that their combined radii. 
 */
function checkSheepCollision() {
  if (dist(sheepX, sheepY, badShepherdX, badShepherdY) < sheepSize / 2 + badShepherdSize / 2) {
    if(BAD_SHEPHERD_MODE) {
      text("Aack! Leave me alone!", sheepX, sheepY + 50);
      // Reset the sheep's position
      sheepX = 0;
      sheepY = random(0, height);
      // Reset the avatar's position
      badShepherdX = width / 2;
      badShepherdY = height / 2;
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

function checkIfAvatarLeftScreen() {
  if (badShepherdX < 0 || badShepherdX > width || badShepherdY < 0 || badShepherdY > height) {
    sheepX = 0;
    sheepY = random(0, height);
    badShepherdX = width / 2;
    badShepherdY = height / 2;
    dodges = 0;
    LIVES--;
  }
}

function displayShamefulText() {
  fill(255, 0, 0);
  textAlign("center", "center");
  // Displays shameful dialogue if the bad shepherd attempts to cross the first half of the screen
  if (badShepherdX === width / 2 && BAD_SHEPHERD_MODE) {
    text("Oyaya! Bad doggie come again? I'm outta here!", badShepherdX, badShepherdY);
    text("(You can't go further.)", badShepherdX, badShepherdY + 35);
  }
  else if(badShepherdX === width / 2 && !BAD_SHEPHERD_MODE) {
    fill(255);
    text('"My sheep listen to my voice; I know them, and they follow me."', badShepherdX, badShepherdY);
  }
}

function checkDodged() {
  if(sheepX > width) {
    if(BAD_SHEPHERD_MODE) {
      // This means the player dodged so update its dodge statistic
      dodges++;
    }
    // Increase sheep size
    sheepSize += sizeIncrease;
    console.log("sheep size = " + sheepSize);
    // Reset the sheep's position to the left at a random height
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
}

function checkConcurrentSheeps(){
  if(sheepCount < MAX_SHEEP_ALIVE)
  {
    console.log("Sheep count is 0. Spawning a new sheep.");
    spawnSheeps();
    // Increment the number of sheeps alive
    sheepCount++;
  }
}

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

function showRetryScreen() {
  //sketchCanvas.hide();
}
function resetGame() {
  dodges = 0;
  saved = 0;
  LIVES = 10;
}
