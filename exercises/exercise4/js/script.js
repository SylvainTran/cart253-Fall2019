"use strict";
/**
Author: Sylvain Tran
Date: 09-10-2019

Goal of program:
RPG Pong. Modified version of Pong by Dr. Pippin Bar.
Two players playable.

Overview of the game:
  - Controls with W S and up-down arrows.
  - RPG style classes for different playstyles
  E.g., Sniper: Able to hold the ball once it hits the paddle, and release it
  with a power shot. Brute: Able to smash the fireball.
  - Trying to turn this into another spiritual experience.
  Art:
  - 8-bit era floppy-disks DOS boot game.
  - NES games like Bubble Bobble and Loderunner.
*/
let scenes;

// Whether the game has started
let playing = false;

// Game colors (using hexadecimal)
let bgColor = 0;
let fgColor = 255;

// Soundtrack
let epicSong;

// Background picture
let bgPicture;

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
// A ball object with the properties of
// position, size, velocity, and speed
// To replace with fireBall + fire cracking sound effect
let ball = {
  x: 0,
  y: 0,
  size: 20,
  vx: 0,
  vy: 0,
  speed: 7
}

// PADDLES (by class)
let brutePaddle;

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
  downKey: 83
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
  downKey: 40
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
  brutePaddle = loadImage("assets/images/Brute Paddle.png");
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640, 480);
  rectMode(CENTER);
  noStroke();
  fill(fgColor);

  setupPaddles();
  resetBall();

  //scenes = new Queue();
  //scenes.enqueue("tutorial");
  //scenes.enqueue("saveThePrincess");
  //scenes.enqueue("victory");

  epicSong.loop();
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

// draw()
//
// Calls the appropriate functions to run the game
// See how tidy it looks?!
function draw() {
  // Fill the background
  // background(bgColor);
  image(bgPicture, 0, 0);
  displayCenterMessage();
  // Parallaxed water at the bottom
  parallaxWaves();


  if (playing) {
    // If the game is in play, we handle input and move the elements around
    handleInput(leftPaddle);
    handleInput(rightPaddle);
    updatePaddle(leftPaddle);
    updatePaddle(rightPaddle);
    updateBall();

    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);

    // Check if the ball went out of bounds and respond if so
    // (Note how we can use a function that returns a truth value
    // inside a conditional!)
    if (ballIsOutOfBounds()) {
      const LEFT_SIDE = 0 + ball.size / 2;
      const RIGHT_SIDE = width - ball.size / 2;

      if (ball.x <= LEFT_SIDE) {
        score.left++;
        score.lastWon = "RIGHT";
        displayScore("LEFT");
        resetBall(); // Launch towards the side that won.
      } else if (ball.x >= RIGHT_SIDE) {
        score.right++;
        score.lastWon = "LEFT";
        displayScore("RIGHT");
        resetBall();
      }
    }
  } else {
    // Otherwise we display the message to start the game
    displayStartMessage();
  }

  // We always display the paddles and ball so it looks like Pong!
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);
  displayBall();
}

// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the
// left and right paddles respectively.
function handleInput(paddle) {
  // Move the paddle based on its up and down keys
  // If the up key is being pressed
  if (keyIsDown(paddle.upKey)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the down key is being pressed
  else if (keyIsDown(paddle.downKey)) {
    // Move down
    paddle.vy = paddle.speed;
  } else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePositions()
//
// Sets the positions of the paddles and ball based on their velocities
function updatePaddle(paddle) {
  // Update the paddle position based on its velocity
  paddle.y += paddle.vy;
}

// updateBall()
//
// Sets the position of the ball based on its velocity
function updateBall() {
  // Update the ball's position based on velocity
  ball.x += ball.vx;
  ball.y += ball.vy;
}

// ballIsOutOfBounds()
//
// Checks if the ball has gone off the left or right
// Returns true if so, false otherwise
function ballIsOutOfBounds() {
  // Check for ball going off the sides
  if (ball.x < 0 + ball.size / 2 || ball.x > width - ball.size / 2) {
    return true;
  } else {
    return false;
  }
}

// checkBallWallCollision()
//
// Check if the ball has hit the top or bottom of the canvas
// Bounce off if it has by reversing velocity
// Play a sound
function checkBallWallCollision() {
  // Check for collisions with top or bottom...
  if (ball.y < 0 || ball.y > height) {
    // It hit so reverse velocity
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

// checkBallPaddleCollision(paddle)
//
// Checks for collisions between the ball and the specified paddle
function checkBallPaddleCollision(paddle) {
  // VARIABLES FOR CHECKING COLLISIONS

  // We will calculate the top, bottom, left, and right of the
  // paddle and the ball to make our conditionals easier to read...
  let ballTop = ball.y - ball.size / 2;
  let ballBottom = ball.y + ball.size / 2;
  let ballLeft = ball.x - ball.size / 2;
  let ballRight = ball.x + ball.size / 2;

  let paddleTop = paddle.y - paddle.h / 2;
  let paddleBottom = paddle.y + paddle.h / 2;
  let paddleLeft = paddle.x - leftPaddle.w / 2;
  let paddleRight = paddle.x + paddle.w / 2;

  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle
      // Reverse its vx so it starts travelling in the opposite direction
      ball.vx = -ball.vx;
      // Play our bouncing sound effect by rewinding and then playing
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
  image(brutePaddle, paddle.x, paddle.y, paddle.w, paddle.h);
}

// displayBall()
//
// Draws the ball on screen as a square
function displayBall() {
  // Draw the ball
  rect(ball.x, ball.y, ball.size, ball.size);
}

// resetBall()
//
// Sets the starting position and velocity of the ball
function resetBall() {
  // Initialise the ball's position and velocity
  ball.x = width / 2;
  ball.y = height / 2;

  // Random VY
  let randomVY;

  if(score.lastWon === "NEWGAME") {
    ball.vx = ball.speed;
    ball.vy = ball.speed;
  }
  else if(score.lastWon === "LEFT") {
    ball.vx = -ball.speed;
    randomVY = - ( Math.floor(random(1, ball.speed)) );
    ball.vy = randomVY;
  }
  else if(score.lastWon === "RIGHT") {
    ball.vx = ball.speed;
    randomVY = ( Math.floor(random(1, ball.speed)) );
    //console.log(randomVY);
    ball.vy = randomVY;
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
  text("CLICK TO START", width / 2, 150);
  pop();
}

/**
  Display the messages in the center;

*/
function displayCenterMessage() {
  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("RPG Pong.", width / 2, 75);
  text("Warrior vs. Wizard\nShowdown", width / 2, 300);
  // To replace with ${leftPaddleClass} + ${rightPaddleClass}
  pop();
}

// mousePressed()
//
// Here to require a click to start playing the game
// Which will help us be allowed to play audio in the browser
function mousePressed() {
  restartGame();
  playing = true;
}

function keyTyped() {
  if(key === ENTER) {
    score.lastWon = "NEWGAME";
    restartGame();
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

function restartGame() {
  resetBall();
  playing = true;
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
    fill(0, 0, 255);
    rect(scoreBox.xLeftBox, height / 2, mana.leftSide, mana.leftSide);
  } else if(side === "RIGHT") {
    mana.rightSide += manaGain;
    fill(255, 0, 0);
    rect(scoreBox.xRightBox, height / 2, mana.rightSide, mana.rightSide);
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
  Displays tutorial screen at the beginning.

*/
function displayTutorial() {

}
//TODOS:
// Fix score not displaying in the first exchanges...
