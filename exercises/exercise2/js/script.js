/**
  Author: Sylvain Tran
  Date: 19-09-2019/Last commit to date: 26-09-2019, 9:29 PM.

  Goal of Program:
  Modified version of <The Artful Dodger> by Dr. Pippin Bar
  Cart 253-A-Fall 2019. I wanted to stay true to myself and experiment with
  this idea of using data-oriented text gameplay, 
  while being fully aware that the game design is totally questionable.
  How can a Christian video game be good?

  Warning:
  This game was only tested on Firefox and my puny Motorola G Play (mobile).

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

// The position and size of our bad shepherd's avatar
let shepherdAvatar;
let shepherdX;
let shepherdY;
let shepherdSize = 128;

// The speed and velocity of our bad shepherd's avatar
let shepherdSpeed = 10;
let shepherdVX = 0;
let shepherdVY = 0;

// The position and size of the sheeps
let sheepX;
let sheepY;
let sheepSize = 128;
let sizeIncrease = 20;
let sheepAvatar;
// the actual sheep object spawned 
let testSheep1;

// Number of sheeps on canvas, and max that can be alive
let sheepCount = 0;
const MAX_SHEEP_ALIVE = 1;

// The speed and velocity of our sheep circle
let sheepSpeed = 0.15;
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

// Forum font.
let forum;

/**

  These classes were copy pasted from exercise 1 with Dr. Pippin's feedback in mind.
  Question: How to best create private fields in Javascript? I looked it up, but the # thing is
  still experimental

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
    Displays a random history for the newly born sheep.

  */
 displayHistory(){
   let lineSpacing = 15;
   let sheepDataX = width / 2;
   let sheepDataY = height / 3;

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
    //text("ICD10 Diagnosis: " + this.sheepICD10Diag, sheepDataX, sheepDataY + lineSpacing * 22);
    text("VISA number: " + this.sheepCreditCard, sheepDataX, sheepDataY + lineSpacing * 22);
  }
}

class ShepherdAvatar extends GeometricalFigure{
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
  Happily resizes the canvas, if the window was resized.

*/
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/**
  Make the canvas, position the avatar and enemy.

*/
function setup() {

  // Creates our playing area
  sketchCanvas = createCanvas(windowWidth, windowHeight);
  sketchCanvas.parent('sketchDiv');

  // Changes the background image depending on the game mode.
  selectBackground();

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

  // Moves the avatar according to its calculated velocity
  MoveAvatar();
  displayShamefulText();
  //image(shepherdAvatar, mouseX += badShepherdVX, mouseY += badShepherdVY, badShepherdSize, badShepherdSize);
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
  Starts the bad shepherd version of the game.

*/
function startBadShepherdGame() {
  BAD_SHEPHERD_MODE = true;
  sketchCanvas.show();
  restartGame();
  loop();
}

/**
  Starts the good shepherd version of the game.

*/
function startGoodShepherdGame() {
  BAD_SHEPHERD_MODE = false;
  sketchCanvas.show();
  restartGame();
  loop();
}

/**
  Selects the background according to the game mode.

*/
function selectBackground() {
  if (BAD_SHEPHERD_MODE) {
    background(bg);
  }
  else {
    background(cityBg);
  }
}

/**

  Keyboard and Mobile controls. Constrains be to movement depending on the game mode.

*/
function MoveAvatar() {
  shepherdX += shepherdVX;
  shepherdY += shepherdVY;

  let leftWall = width / 2;
  let rightWall = width - shepherdSize;
  let topWall = 0;
  let bottomWall = height - shepherdSize;

  let halfScreenConstrain = constrain(shepherdX, leftWall, rightWall);
  let leftRightConstrain = constrain(shepherdX, 0, rightWall);
  let topDownConstrain = constrain(shepherdY, topWall, bottomWall);

  // Constrains the avatar to the right half of the screen
  if (BAD_SHEPHERD_MODE) {
    // Mouse and touch inputs
    if(mouseIsPressed) {
      shepherdX = mouseX;
      shepherdY = mouseY;
      let mouseConstrainX = constrain(mouseX, leftWall, rightWall);
      image(shepherdAvatar, mouseConstrainX, mouseY, shepherdSize, shepherdSize);
    }
    // Keyboard inputs
    else {
      image(shepherdAvatar, halfScreenConstrain, shepherdY, shepherdSize, shepherdSize);
    }
  }
  else { // Constrains the avatar to the canvas' borders
    // Mouse and touch inputs
    if(mouseIsPressed) {
      shepherdX = mouseX;
      shepherdY = mouseY;
      let mouseConstrainAllX = constrain(mouseX, 0, rightWall);
      let mouseConstrainAllY = constrain(mouseY, 0, bottomWall);
      image(shepherdAvatar, mouseConstrainAllX, mouseConstrainAllY, shepherdSize, shepherdSize);
    }
    // Keyboard inputs
    else {
      image(shepherdAvatar, leftRightConstrain, topDownConstrain, shepherdSize, shepherdSize);
    }
  }
}

/**

  Resets velocity.

*/
function resetVelocity() {
  shepherdVX = 0;
  shepherdVY = 0;
}

/**

  Spawn sheeps with data by random id.

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

  Display dodges, lives and saved.

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

  Moves background in parallax.

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
 
  The sheep avoid the bad shepherd in that mode.
  Not implemented yet.

 */
function avoidBadShepherd() {
  let badShepherdVector = createVector(shepherdX, shepherdY);
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
  Not implemented yet.

*/
function obeyGoodShepherd() {
  let goodShepherdVector = createVector(shepherdX, shepherdY);
  let sheepVector = createVector(sheepX, sheepY);
  console.log("Sheep's position: " + sheepVector);
  console.log("Good Shepherd's position: " + badShepherdVector);
  console.log("Distance between sheep and good shepherd: " + sheepVector.dist(badShepherdVector).toFixed(2));

  // Cause deviation from the bad shepherd
    if(sheepVector.dist(goodShepherdVector).toFixed(2) <= 100){
      // TODO Some path algorithm to avoid running into the player's avatar
    }
}

/**

  Checks if the sheep and avatar overlap - if they do the player loses
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
      shepherdX = width / 2;
      shepherdY = height / 2;
      dodges = 0;
      saved += 1;
      sheepX = width; // pushes the sheep forth to life
    }
  }
}

/**

  Checks if avatar left screen. Removes lives and resets position and dodges if so.

*/
function checkIfAvatarLeftScreen() {
  if (shepherdX < 0 || shepherdX > width || shepherdY < 0 || shepherdY > height) {
    shepherdX = width / 2;
    shepherdY = height / 2;
    // Only lose lives and reset game if on bad shepherd mode. ...Because...
    if(BAD_SHEPHERD_MODE){
      sheepX = 0;
      sheepY = random(0, height);
      dodges = 0;
      LIVES--;
    }
  }
}

/**

  Displays shameful dialogue if the shepherd attempts to cross the first half of the screen  

*/
function displayShamefulText() {
  fill(255, 0, 0);
  textAlign("center", "center");

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

  Checks if the sheep passed to the edge of the screen. If so
  reset position at random Y and increase size and speed.

*/
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
  if (keyIsDown(LEFT_ARROW)) {
    shepherdVX = -shepherdSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    shepherdVX = shepherdSpeed;
  }
  if (keyIsDown(UP_ARROW)) {
    shepherdVY = -shepherdSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    shepherdVY = shepherdSpeed;
  }
}

/**

  Checks if there is more than one sheep alive on the canvas
  If not, spawn one.

*/
function checkConcurrentSheeps(){
  if(sheepCount < MAX_SHEEP_ALIVE)
  {
    console.log("Sheep count is 0. Spawning a new sheep.");
    spawnSheeps();
    // Increment the number of sheeps alive
    sheepCount++;
  }
}

/**

  Updates game state to know if player has won or lost yet.

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
}

/**

  Restarts the game's statistics and setup positions.

*/
function restartGame() {
  dodges = 0;
  saved = 0;
  LIVES = 10;
  shepherdX = width / 2;
  shepherdY = height / 2;
  sheepCount = 0;
  sheepSize = 128;
  sheepSpeed = 0.15;
  sheepX = 0;
  sheepY = random(0, height);
  loop();
}