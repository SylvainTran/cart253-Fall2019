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
// Data for the sheep
let sheepData = {}; // "js/sheepData.json"

let LIVES = 10;

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
let sheepSpeed = 2.5;
let sheepVX = 5;

// How many dodges the player has made
let dodges = 0;

// Parallax background.
let bg;
// First image.
let x1 = 0;
// Second image.
let x2;
// Scroll speed for the parallax effect.
let scrollSpeed = 4;

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
  text(this.sheepFirstName + " " + this.sheepLastName, currentSheepX, currentSheepY);  
 }

  /**
    Displays a random name for the newly born sheep.

  */
 displayHistory(parentNode){   
   let lineSpacing = 15;
    text(this.sheepEmail, parentNode.x, parentNode.y);
    text(this.sheepGender, parentNode.x, parentNode.y + lineSpacing );
    text(this.sheepIPAddress, parentNode.x, parentNode.y + lineSpacing);
    text(this.sheepDrug, parentNode.x, parentNode.y + lineSpacing);
    text(this.sheepCompany, parentNode.x, parentNode.y + lineSpacing);
    text(this.sheepJobTitle, parentNode.x, parentNode.y + lineSpacing);
    text(this.sheepLanguage, parentNode.x, parentNode.y + lineSpacing);
    text(this.sheepPhone, parentNode.x, parentNode.y + lineSpacing);
    text(this.sheepEthnicity, parentNode.x, parentNode.y + lineSpacing);
    text(this.sheepShirtSize, parentNode.x, parentNode.y + lineSpacing);  
    text(this.sheepICD10Diag, parentNode.x, parentNode.y + lineSpacing);  
    text(this.sheepCreditCard, parentNode.x, parentNode.y + lineSpacing); 
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
  
  // Asynchronously fetches the sheep data from the JSON file.
  sheepData = loadJSON('./js/sheepData.json');
}

/**
  Make the canvas, position the avatar and enemy.

*/
function setup() {
  // Create our playing area (inner window's size)
  let sketchCanvas = createCanvas(windowWidth, windowHeight);
  sketchCanvas.parent('sketchDiv');      

  // A desert background.
  background(bg);

  // Put the avatar in the centre
  badShepherdX = width / 2;
  badShepherdY = height / 2;

  // Put the sheep to the left at a random y coordinate within the canvas
  sheepX = 0;
  sheepY = random(0, height);

  // Second x position is set to the width for the parallax effect.
  x2 = width;
  noStroke();
}

/**
  Handles moving the avatar and sheep and checking for dodges and
  game over situations.

*/
function draw() {

  updateGameState();
  backgroundParallax();
  checkConcurrentSheeps();
  displayDodges();
  displayLives();
  
  //text(sheepJobTitle, windowWidth, windowHeight);
  console.log(sheepCount);
  // Constrains the bad shepherd to half of the screen
  let leftWall = width / 2;
  let rightWall = width;
 
  let xc = constrain(badShepherdX, leftWall, rightWall);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  resetVelocity();
  handleInputs();

  // Move the avatar according to its calculated velocity
  badShepherdX += badShepherdVX;
  badShepherdY += badShepherdVY;

  // Moves the lastly spawned sheep
  sheepVX = sheepSpeed;
  testSheep1.translateSheep(sheepX += 10 * sheepVX);
  testSheep1.displaySheep(sheepAvatar, sheepX, sheepSize, sheepSize);
  testSheep1.displayRandomName(sheepX, sheepY);
  avoidBadShepherd();

  checkSheepCollision();
  checkIfAvatarLeftScreen();
  checkDodged();

  // Draws the player as the bad shepherd
  image(shepherdAvatar, xc, badShepherdY, badShepherdSize, badShepherdSize);
  displayShamefulText();

  //TODO check if sheep size is above game over threshold to avoid crashing...
  // or add lives mechanic
}

function resetVelocity() {
  badShepherdVX = 0;
  badShepherdVY = 0;
}

function spawnSheeps() {
/*   for(let i = 0; i < 99; i++){
    if(sheepData[i].id === randomId)
    {
      //alert("Found the sheep called " + sheepData[i].first_name);
      break;
    }
  } */
  // Generates a random number between 1-100 to get a random row from the JSON file.
  let randomId = Math.floor(random(1, 100));
  let currentSheepX = sheepX;
  let currentSheepY = sheepY;

  testSheep1 = new Sheep(currentSheepX, currentSheepY, sheepSize, sheepSize, sheepData[randomId].first_name, 
    sheepData[randomId].last_name, sheepData[randomId].email, sheepData[randomId].gender, sheepData[randomId].ip_address,
    sheepData[randomId].drug_name, sheepData[randomId].fake_company_name, sheepData[randomId].job_title, sheepData[randomId].language,
    sheepData[randomId].phone, sheepData[randomId].username, sheepData[randomId].ethnicity, sheepData[randomId].shirt_size, sheepData[randomId].icd10_diag,
    sheepData[randomId].avatar, sheepData[randomId].credit_card);    
}

function displayDodges() {
  fill(0);
  textFont('Arial');
  textSize(32);
  text(dodges + " Sheep lost.", windowWidth - (windowWidth * 0.10), (windowHeight * 0.05));
}

function displayLives() {
  fill(0);
  textFont('Arial');
  textSize(32);
  text(LIVES + " Lives Left.", windowWidth - (windowWidth * 0.25), (windowHeight * 0.05));
}

// Moves in parallax left to right.
function backgroundParallax() {
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

function avoidBadShepherd(){
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
  
  Checks if the sheep and avatar overlap - if they do the player loses
  We do this by checking if the distance between the centre of the sheep
  and the centre of the avatar is less that their combined radii. 
 */
function checkSheepCollision() {
  if (dist(sheepX, sheepY, badShepherdX, badShepherdY) < sheepSize / 2 + badShepherdSize / 2) {
    // Tell the player they lost
    console.log("No no no, you preferred safety to herding your sheep.");
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
}

function checkIfAvatarLeftScreen() {
  if (badShepherdX < 0 || badShepherdX > width || badShepherdY < 0 || badShepherdY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
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
  if (badShepherdX === width / 2) {
    text("Oyaya! Bad doggie come again? I'm outta here!", badShepherdX, badShepherdY);
  }
}

function checkDodged() {
  if (sheepX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    //Increase sheep size
    sheepSize += sizeIncrease;
    console.log("sheep size = " + sheepSize);
    // Reset the sheep's position to the left at a random height
    sheepX = 0;
    sheepY = random(0, height);
    // Consider the sheep as dead
    sheepCount--;
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
  console.log("entering update game state function");
  if(dodges === 10){
    noLoop();
    alert("You've losed at being a bad shepherd, but technically you've also won the dodging game xD.");
  }
  else{
    //redraw();
  }
  if(LIVES === 0){
    alert("You've won at being a bad shepherd, but technically you've also lost the dodging game xD.");
    //textSize(100);
    //text("Game Over", width / 1.5, height / 1.5);
    noLoop();
  }

}
