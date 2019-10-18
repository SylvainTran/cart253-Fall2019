"use strict";
/**
Author: Sylvain Tran
Date: 09-10-2019

Goal of program:
RPG Pong. Modified version of Pong by Dr. Pippin Bar.
Two players playable.

Overview of the game:
  - Controls with W S and up-down arrows.
  - RPG style classes for different playstyles. All abilities cost mana (-10)
  which is gained for each exchange that is won (+10).

  Brute: Default pong warrior. No special abilities, just higher bounce strength and average speed.
  Sniper: Able to stall the fireBall once it hits the paddle, and release it
  with a power shot. Slightly slower and weaker than brute.
  Wizard: Able to cast Trick shot (spawn two fire balls with enough mana). Weaker than
  the brute and sniper, and slower too. (For experienced players?)

*/

/**
  All the game states.

*/
let gameState = {
  playerChosePaddle: false,
  playing: false,
  chosenLeftPaddle: null,
  chosenRightPaddle: null
}

// Game colors (using hexadecimal)
let bgColor = 0;
let fgColor = 255;

// Soundtrack
let epicSong;

// Background picture
let bgPicture;
// Pic of the brute paddle (only one drawn for now, more later)
let brutePaddlePic;

// Waves at the bottom
let wave1;
let wave2;
let scrollSpeed = 4;
let x1 = 0;
let x2;

// Player Score
let score = {
  left: 0,
  right: 0,
  lastWon: "NEWGAME"
}

// Mana
let mana = {
  leftSide: 0,
  rightSide: 0
}

// Scorebox
let scoreBox = {
  scoreBoxSize: 300,
  scoreBoxHeight: 300,
  axisCenter: 320,
  xFromAxis: 100,
  xLeftBox: 220,
  yScoreBox: 240,
  xRightBox: 420,
  newTextColor: 255
}
// A fireBall object with the properties of
// position, size, velocity, and speed
// To replace with fireBall + fire cracking sound effect
let fireBall = {
  x: 0,
  y: 0,
  size: 20,
  vx: 0,
  vy: 0,
  speed: 7
}
/**
  The speed at which the ball will be pushed back
  once it hits the paddle. Depends on the paddle type.

*/
let bounceStrength = {
  STRONG: 10,
  MEDIUM: 5,
  LOW: 2
}
// PADDLES (by type)
// The brute paddle is the all-rounder beginner class (higher stats but no special abilities)
let brutePaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 4,
  speed: 4,
  upKey: 87,
  downKey: 83,
  type: "BRUTE", // The paddle's type (brute, sniper or wizard)
  bounceStrength: bounceStrength.MEDIUM,
  ability: "NONE"
}

let sniperPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 6, // temp
  speed: 6,
  upKey: 87,
  downKey: 83,
  type: "SNIPER", // The paddle's type (brute, sniper or wizard)
  bounceStrength: bounceStrength.MEDIUM,
  ability: "SNIPE"
}

let wizardPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 3,
  speed: 3,
  upKey: 87,
  downKey: 83,
  type: "WIZARD", // The paddle's type (brute, sniper or wizard)
  bounceStrength: bounceStrength.LOW,
  ability: "TRICKSHOT"
}

// Gold obtained by the player so far
// let gold;
// let cashShop;

// The boxes to choose our paddle type: brute, sniper or wizard
let brutePaddleSelector = {
  bX: 0,
  bY: 0,
  boxSize: 150,
  overBox: false,
  locked: false
}

let sniperPaddleSelector = {
  bX: 0,
  bY: 0,
  boxSize: 150,
  overBox: false,
  locked: false
}

let wizardPaddleSelector = {
  bX: 0,
  bY: 0,
  boxSize: 150,
  overBox: false,
  locked: false
}

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed

let leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 87,
  downKey: 83,
  type: "" // The paddle's type (brute, sniper or wizard)
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 5,
  upKey: 38,
  downKey: 40,
  type: ""
}

// A variable to hold the beep sound we will play on bouncing
let beepSFX;

// preload()
//
// Loads the beep audio for the sound of bouncing
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  epicSong = loadSound("assets/sounds/Joshua Empyre - Epic Orchestra Loop.wav");
  bgPicture = loadImage("assets/images/Pong Plus_Bg.png");
  wave1 = loadImage("assets/images/wave1.png");
  wave2 = loadImage("assets/images/wave2.png");
  brutePaddlePic = loadImage("assets/images/Brute Paddle.png"); // only this paddle for now
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and fireBall positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640, 480);
  rectMode(CENTER);
  noStroke();
  fill(fgColor);
  setupPaddleSelectorBoxes();
  setupPaddles();
  resetFireball();

  epicSong.loop();
  drawPaddleSelectorBoxes();
}

/**
  Key was typed.
  Only implemented for the left side for now

*/
function keyPressed() {
  if(gameState.playerChosePaddle) {
    switch(gameState.chosenLeftPaddle.type) {
      case "BRUTE":
        if(keyCode === ENTER) {
            // smash
            alert("Smash");
        }
        break;
      case "SNIPER":
        if(keyCode === ENTER) {
          snipe();
        }
        break;
      case "WIZARD":
        if(keyCode === ENTER) {
            alert("Trickshot");
          // trick shot
        }
        break;
      default:
        break;
    }
  }
}

/**
  Set the paddle types selector boxes

*/
function setupPaddleSelectorBoxes() {
  brutePaddleSelector.bX = width / 5;
  brutePaddleSelector.bY = height / 2;

  sniperPaddleSelector.bX = width / 2;
  sniperPaddleSelector.bY = height / 2;

  wizardPaddleSelector.bX = width / 1.25;
  wizardPaddleSelector.bY = height / 2;
}
// setupPaddles()
//
// Sets the starting positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle position
  leftPaddle.x = 0 + leftPaddle.w;
  leftPaddle.y = height / 2;

  // Initialise the right paddle position
  rightPaddle.x = width - rightPaddle.w;
  rightPaddle.y = height / 2;
}

/**
  Draw the background elements: main bg,
  the center description RPG Pong, and
  the parallaxed sea dragon at the bottom.

*/
function drawBackground() {
  image(bgPicture, 0, 0);
  //displayCenterMessage("RPG Pong.", `${gameState.chosenLeftPaddle.type} vs. ${gameState.chosenRightPaddle.type} showdown.`);
  parallaxWaves();
}

/**
  Draw the canvas elements.

*/
function draw() {

  //console.log(gameState.playing);
  //console.log(gameState.playerChosePaddle);

  if(!gameState.playerChosePaddle && !gameState.playing){
    // Display the paddle selector boxes
    drawPaddleSelectorBoxes();
    // Monitor paddle choice.
    chooseBrutePaddle();
    chooseSniperPaddle();
    chooseWizardPaddle();
  }

  if (gameState.playerChosePaddle && gameState.playing) {
    // If the game is in play, we handle input and move the elements around
    drawBackground();
    handleInput(gameState.chosenLeftPaddle);
    handleInput(rightPaddle);
    updatePaddle(gameState.chosenLeftPaddle);
    updatePaddle(rightPaddle);
    updateFireball();

    checkFireballWallCollision();
    checkfireBallPaddleCollision(gameState.chosenLeftPaddle);
    checkfireBallPaddleCollision(rightPaddle);

    // Check if the fireBall went out of bounds and respond if so
    // (Note how we can use a function that returns a truth value
    // inside a conditional!)
    if (fireBallIsOutOfBounds()) {
      const LEFT_SIDE = 0 + fireBall.size / 2;
      const RIGHT_SIDE = width - fireBall.size / 2;

      if (fireBall.x <= LEFT_SIDE) {
        score.left++;
        score.lastWon = "RIGHT";
        mana.rightSide += 10; // Add 10 mana for each victory... used to cast abilities
        displayScore("LEFT");
        resetFireball(); // Launch towards the side that won.
      } else if (fireBall.x >= RIGHT_SIDE) {
        score.right++;
        score.lastWon = "LEFT";
        mana.leftSide += 10;
        displayScore("RIGHT");
        resetFireball();
      }
    }
    // We display the paddle once we know it has been chosen.
    displayPaddle(gameState.chosenLeftPaddle);
    displayPaddle(rightPaddle);
    displayFireball();
  } else {
    // Otherwise we display the message to start the game
    displayStartMessage();
  }
}

// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the
// left and right paddles respectively.
function handleInput(paddle) {
  if (keyIsDown(paddle.upKey)) {
    paddle.vy = -paddle.speed;
  }
  else if (keyIsDown(paddle.downKey)) {
    paddle.vy = paddle.speed;
  } else {
    paddle.vy = 0;
  }
}

// updatePositions()
//
// Sets the positions of the paddles and fireBall based on their velocities
function updatePaddle(paddle) {
  // Constrains the paddle within the canvas at paddle height
  paddle.y += paddle.vy;
  let constrainedY = constrain(paddle.y, 0, height - paddle.h);
  paddle.y = constrainedY;
}

// updateFireball()
//
// Sets the position of the fireBall based on its velocity
function updateFireball() {
  // Update the fireBall's position based on velocity
  if(gameState.chosenLeftPaddle === "SNIPER") {
    // Do nothing -- the player will snipe with Enter
  }
  else {
    fireBall.x += fireBall.vx;
    fireBall.y += fireBall.vy;
  }
}

// fireBallIsOutOfBounds()
//
// Checks if the fireBall has gone off the left or right
// Returns true if so, false otherwise
function fireBallIsOutOfBounds() {
  // Check for fireBall going off the sides
  if (fireBall.x < 0 + fireBall.size / 2 || fireBall.x > width - fireBall.size / 2) {
    return true;
  } else {
    return false;
  }
}

// checkFireballWallCollision()
//
// Check if the fireBall has hit the top or bottom of the canvas
// Bounce off if it has by reversing velocity
// Play a sound
function checkFireballWallCollision() {
  // Check for collisions with top or bottom...
  if (fireBall.y < 0 || fireBall.y > height) {
    // It hit so reverse velocity
    fireBall.vy = -fireBall.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

// checkfireBallPaddleCollision(paddle)
//
// Checks for collisions between the fireBall and the specified paddle
function checkfireBallPaddleCollision(paddle) {
  // VARIABLES FOR CHECKING COLLISIONS

  let fireBallTop = fireBall.y - fireBall.size / 2;
  let fireBallBottom = fireBall.y + fireBall.size / 2;
  let fireBallLeft = fireBall.x - fireBall.size / 2;
  let fireBallRight = fireBall.x + fireBall.size / 2;

  let paddleTop = paddle.y - paddle.h / 2;
  let paddleBottom = paddle.y + paddle.h;
  let paddleLeft = paddle.x - leftPaddle.w / 2;
  let paddleRight = paddle.x + paddle.w / 2;

  if (fireBallBottom >= paddleTop && fireBallTop <= paddleBottom) {
    if (fireBallLeft <= paddleRight && fireBallRight >= paddleLeft) {
      if(gameState.chosenLeftPaddle.type === "SNIPER") {
        fireBall.vx = 0; // Stalls the fireball'x position
        fireBall.x = gameState.chosenLeftPaddle.x + 50; // offsets to the right a bit
      }
      else {
        fireBall.vx = -fireBall.vx;
      }
      beepSFX.currentTime = 0;
      beepSFX.play();
    }
  }
}

// displayPaddle(paddle)
//
// Draws the specified paddle
function displayPaddle(paddle) {
  // Draw the paddles
  //rect(paddle.x, paddle.y, paddle.w, paddle.h);
  image(brutePaddlePic, paddle.x, paddle.y, paddle.w, paddle.h);
}

// displayFireball()
//
// Draws the fireBall on screen as a square
function displayFireball() {
  // Draw the fireBall
  rect(fireBall.x, fireBall.y, fireBall.size, fireBall.size);
}

// resetFireball()
//
// Sets the starting position and velocity of the fireBall
function resetFireball() {
  // Initialise the fireBall's position and velocity
  fireBall.x = width / 2;
  fireBall.y = height / 2;

  // Random VY
  let randomVY;

  if(score.lastWon === "NEWGAME") {
    fireBall.vx = fireBall.speed;
    fireBall.vy = fireBall.speed;
  }
  else if(score.lastWon === "LEFT") {
    fireBall.vx = -fireBall.speed;
    // Map the VY to a random negative range
    randomVY = Math.floor(map(random(1, fireBall.speed), 1, fireBall.speed, -1, -fireBall.speed));
    fireBall.vy = randomVY;
  }
  else if(score.lastWon === "RIGHT") {
    fireBall.vx = fireBall.speed;
    randomVY = ( Math.floor(random(1, fireBall.speed)) );
    fireBall.vy = randomVY;
  }
}

// displayStartMessage()
//
// Shows a message about how to start the game
function displayStartMessage() {
  push();
  fill(0, 0, scoreBox.newTextColor);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("CHOOSE YOUR PADDLE\nTHEN PRESS ENTER TO START", width / 2, 150);
  pop();
}

/**
  Display the messages in the center;

*/
function displayCenterMessage(message, message2) {
  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(message, width / 2, 75);
  text(message2, width / 2, 300);
  // To replace with ${leftPaddleClass} + ${rightPaddleClass}
  pop();
}

// mousePressed()
//
// Here to require a click to start playing the game
// Which will help us be allowed to play audio in the browser
function mousePressed() {
  if(gameState.playerChosePaddle) {
      restartGame();
      gameState.playing = true;
  }

  if (brutePaddleSelector.overBox) {
    console.log("Choosing the brute paddle");
    gameState.playerChosePaddle = true;
    console.log(gameState.chosenLeftPaddle);
    gameState.chosenLeftPaddle = brutePaddle;
    console.log(gameState.chosenLeftPaddle);
    console.log(gameState.chosenLeftPaddle.type);
    brutePaddleSelector.locked = true;
    gameState.playing = true;
  } else {
    brutePaddleSelector.locked = false;
  }
  // Player chooses the sniper paddle
  if (sniperPaddleSelector.overBox) {
    console.log("Choosing the sniper paddle");
    gameState.playerChosePaddle = true;
    gameState.chosenLeftPaddle = sniperPaddle;
    sniperPaddleSelector.locked = true;
    gameState.playing = true;
  } else {
    sniperPaddleSelector.locked = false;
  }
  // Player chooses the wizard paddle
  if (wizardPaddleSelector.overBox) {
    console.log("Choosing the wizard paddle");
    gameState.playerChosePaddle = true;
    gameState.chosenLeftPaddle = wizardPaddle;
    wizardPaddleSelector.locked = true;
    gameState.playing = true;
  } else {
    wizardPaddleSelector.locked = false;
  }
}

/**
  Displays the score.
  Builds a castle in the middle of the screen from the bottom.
  Each win nets more resource for the side's winner.
  When the castle touches y = 0, the dragon sides with the winner
  and destroys the loser's party.

*/
function displayScore(SIDE) {
  rectMode(CENTER);

  // LEFT SIDE
  if (SIDE === "LEFT") {
    push();
    background(0, 0, 255);
    fill(255);
    rect(scoreBox.xLeftBox, scoreBox.yScoreBox, scoreBox.scoreBoxSize, scoreBox.scoreBoxHeight);
    pop();

    push();
    fill(255);
    textSize(24);
    textAlign(CENTER);
    text(`Mana Gauge:\n${score.left}`, scoreBox.xLeftBox, scoreBox.yScoreBox - 200);
    pop();

    // Draw one more square in the left player's gauge
    drawManaGauge("LEFT", 25, scoreBox.xLeftBox, scoreBox.yScoreBox);
    displayStartMessage();
    setTimeout(noLoop(), 3000);
  }
  // RIGHT SIDE
  else {
    push();
    background(255, 0, 0);
    fill(255);
    rect(scoreBox.xRightBox, scoreBox.yScoreBox, scoreBox.scoreBoxSize, scoreBox.scoreBoxHeight);
    pop();
    // Draw one more square in the right player's gauge
    push();
    fill(0);
    textSize(24);
    textAlign(CENTER);
    text(`Mana Gauge:\n${score.right}`, scoreBox.xRightBox, scoreBox.yScoreBox - 200);
    pop();

    displayStartMessage(scoreBox.newTextColor);
    drawManaGauge("RIGHT", 25, scoreBox.xRightBox, scoreBox.yScoreBox);
    setTimeout(noLoop(), 3000);
  }
}

/**
  Restart game.

*/
function restartGame() {
  resetFireball();
  gameState.playing = true;
  loop();
}

/**
  To display the score as a function of gain in mana.

*/
function drawManaGauge(side, manaGain) {
  //clear();
  //rectMode(CENTER);
  let leftSideManaPosX = 50;
  let rightSideManaPosX = width - 50;

  if(side === "LEFT") {
    mana.leftSide += manaGain;
    push();
    fill(0, 0, 255);
    rect(scoreBox.xLeftBox, height / 2, mana.leftSide, mana.leftSide);
    pop();
  } else if(side === "RIGHT") {
    mana.rightSide += manaGain;
    push();
    fill(255, 0, 0);
    rect(scoreBox.xRightBox, height / 2, mana.rightSide, mana.rightSide);
    pop();
  }
}

/**
  Moves the wave pictures at the bottom in parallax.
  TODO change wave to sea dragon

*/
function parallaxWaves() {
  image(wave1, x1, height - wave1.height, wave1.width, wave1.height);
  image(wave2, x2, 0, height - wave2.height, wave2.width, wave2.height);

  x1 -= scrollSpeed;
  x2 -= scrollSpeed;

  if (x1 < -width) {
    x1 = width;
  }
  if (x2 < -width) {
    x2 = width;
  }
}

/**
  Checks if the mouse if over the brute paddle box selector
  at the beginning. Allows the player to choose their paddle type
  on mouse press. Only for player 1 for now...
  From p5.js reference on mouse functions.

*/
function chooseBrutePaddle() {
  if (
    mouseX > brutePaddleSelector.bX - brutePaddleSelector.boxSize &&
    mouseX < brutePaddleSelector.bX + brutePaddleSelector.boxSize &&
    mouseY > brutePaddleSelector.bY - brutePaddleSelector.boxSize &&
    mouseY < brutePaddleSelector.bY + brutePaddleSelector.boxSize
  ) {
    brutePaddleSelector.overBox = true;
    if (!brutePaddleSelector.locked) {
    }
  } else {
    brutePaddleSelector.overBox = false;
  }
}

/**
  Checks if the mouse if over the sniper paddle box selector
  at the beginning. Allows the player to choose their paddle type
  on mouse press. Only for player 1 for now...
  From p5.js reference on mouse functions.

*/
function chooseSniperPaddle() {
  if (
    mouseX > sniperPaddleSelector.bX - sniperPaddleSelector.boxSize &&
    mouseX < sniperPaddleSelector.bX + sniperPaddleSelector.boxSize &&
    mouseY > sniperPaddleSelector.bY - sniperPaddleSelector.boxSize &&
    mouseY < sniperPaddleSelector.bY + sniperPaddleSelector.boxSize
  ) {
    sniperPaddleSelector.overBox = true;
    if (!sniperPaddleSelector.locked) {
    }
  } else {
    sniperPaddleSelector.overBox = false;
  }
}

/**
  Checks if the mouse if over the wizard paddle box selector
  at the beginning. Allows the player to choose their paddle type
  on mouse press. Only for player 1 for now...
  From p5.js reference on mouse functions.

*/
function chooseWizardPaddle() {
  if (
    mouseX > wizardPaddleSelector.bX - wizardPaddleSelector.boxSize &&
    mouseX < wizardPaddleSelector.bX + wizardPaddleSelector.boxSize &&
    mouseY > wizardPaddleSelector.bY - wizardPaddleSelector.boxSize &&
    mouseY < wizardPaddleSelector.bY + wizardPaddleSelector.boxSize
  ) {
    wizardPaddleSelector.overBox = true;
    if (!wizardPaddleSelector.locked) {
    }
  } else {
    wizardPaddleSelector.overBox = false;
  }
}

/**
  Draw the paddle selector boxes.

*/
function drawPaddleSelectorBoxes() {
  push();
  fill(0, 255, 0);
  rect(brutePaddleSelector.bX, brutePaddleSelector.bY, brutePaddleSelector.boxSize, brutePaddleSelector.boxSize);
  rect(sniperPaddleSelector.bX, sniperPaddleSelector.bY, sniperPaddleSelector.boxSize, sniperPaddleSelector.boxSize);
  rect(wizardPaddleSelector.bX, wizardPaddleSelector.bY, wizardPaddleSelector.boxSize, wizardPaddleSelector.boxSize);
  pop();

  push();
  fill(0);
  textSize(30);
  text("Brute", brutePaddleSelector.bX - 50, brutePaddleSelector.bY + 50);
  text("Sniper", sniperPaddleSelector.bX - 50, sniperPaddleSelector.bY + 50);
  text("Wizard", wizardPaddleSelector.bX - 50, wizardPaddleSelector.bY + 50);
  pop();
}
//TODOS:
// Fix score not displaying in the first exchanges...

/**
  Charge shot if the chosen paddle is sniper.

*/
function snipe(snipingFrom) {
  // TODO play sniping sound
  // Left side sniper
  if(snipingFrom === "LEFT") {
    if(mana.leftSide >= 10) { // if the sniper has enough mana, snipe
      fireBall.vx = gameState.chosenLeftPaddle.bounceStrength * gameState.chosenLeftPaddle.vy;
      fireBall.x += fireBall.vx;
      mana.leftSide -= 10; // remove some mana
    }
    else {
      console.log("Not enough mana.");
    }
  }
  else if(snipingFrom === "RIGHT") {
    if(mana.rightSide >= 10) {
      fireBall.vx = gameState.chosenLeftPaddle.bounceStrength * gameState.chosenLeftPaddle.vy;
      fireBall.x += fireBall.vx;
      mana.rightSide -= 10; // remove some mana
    }
  }
}

/**
  Trick shot if the chosen paddle is sniper.

*/
function trickShot() {


}
