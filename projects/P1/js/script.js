"use strict";

/******************************************************

Author: Sylvain Tran
Date: September 3rd, 2019

Goal of program: Modified version of chaser by Dr. Pippin Bar
The concept explored in this game is the original relation between man and woman
with the perspective of the Theology of the Body.

Twists: You can eat the forbidden fruit.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/

// Canvas scenes management
let currentScreen;
let introScreen;
let playIntroduction = false; // Pass the intro cinematic canvas screen to the actual game
let playedIntroduction = false;
// Track whether the game is over
let gameOver = false;

// Screen management related
let screens;

// Player position, size, velocity
let playerX;
let playerY;
let playerRadius = 25;
let playerVX = 0;
let playerVY = 0;
let playerMaxSpeed = 2;
// Player health
let playerHealth;
let playerMaxHealth = 255;
// Player fill color
let playerFill = 50;

// Prey position, size, velocity
let preyX;
let preyY;
let preyRadius = 25;
let preyVX;
let preyVY;
let preyMaxSpeed = 4;
// Prey health
let preyHealth;
let preyMaxHealth = 100;
// Prey fill color
let preyFill = 200;


let tx = 1;
let ty = 1;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 10;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;

// setup()
//
// Sets up the basic elements of the game
function setup() {
  // draw the intro cinematic screen to full width and height
  introScreen = createCanvas(1000, 1000);
  introScreen.parent('mainDisplay');
  //playingIntroduction = true;
  // Create the game's canvas
  noStroke();
  setupPrey();
  setupPlayer();

  playIntroduction = true;
  tx = 0.0001
  ty = 0.0001;
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

/**
  Draw the canvas elements.

*/
function draw() {
    handleInput();
  // Play the intro
  if (playIntroduction === true) {
    playIntroduction = false;
    currentScreen = SCREEN.intro1;
    background(0);
    textSize(42);
    fill(255);
    text("...So God created man in His own image; "+
    "in the\n" + "image of God He created him; male and female\n" +
    "He created them. ", 30, height / 2);
    text("Press Enter to continue.", 30, height / 1.2);
  }

  // start the game after the intro
  if (playedIntroduction === true) {
    // Reset the canvas
    clear();
  }

  if (!gameOver && playedIntroduction === true) {
    // Actual gameplay elements
    background(100, 100, 200);

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
  } else if (gameOver){
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  let maxBoostedSpeed = playerMaxSpeed * 10;

  if (keyIsDown(ENTER)) {
    nextScreen();
  }
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW) && keyIsDown(SHIFT)) {
    playerVX = constrain(playerMaxSpeed, -maxBoostedSpeed, -maxBoostedSpeed);
  } else if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(SHIFT)) {
    playerVX = constrain(playerMaxSpeed, maxBoostedSpeed, maxBoostedSpeed);
  } else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  // Check for vertical movement
  else if (keyIsDown(UP_ARROW) && keyIsDown(SHIFT)) {
    playerVY = constrain(playerMaxSpeed, -maxBoostedSpeed, -maxBoostedSpeed);
  } else if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  } else if (keyIsDown(DOWN_ARROW) && keyIsDown(SHIFT)) {
    playerVY = constrain(playerMaxSpeed, maxBoostedSpeed, maxBoostedSpeed);
  } else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  } else {
    playerVX = 0;
    playerVY = 0;
  }

}

function nextScreen() {
  clear();
  //let screensQueue;
  //let nextScreen = screensQueue.pop();
  //currentScreen = nextScreen;
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  } else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  } else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  playerHealth = playerHealth - 0.5;
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);

    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0, width);
      preyY = random(0, height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Set velocity based on random values to get a new direction
  // and speed of movement
  //
  // Use map() to convert from the 0-1 range of the random() function
  // to the appropriate range of velocities for the prey


  preyVX = map(noise(tx), 0, 1, -preyMaxSpeed, preyMaxSpeed);
  preyVY = map(noise(ty), 0, 1, -preyMaxSpeed, preyMaxSpeed);;

  // Update prey position based on velocity
  preyX = preyX + preyVX;
  preyY = preyY + preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX = preyX + width;
  } else if (preyX > width) {
    preyX = preyX - width;
  }

  if (preyY < 0) {
    preyY = preyY + height;
  } else if (preyY > height) {
    preyY = preyY - height;
  }

  // Increment the noise values
  tx += 0.01;
  ty += 0.01;

}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  fill(preyFill, preyHealth);
  ellipse(preyX, preyY, preyRadius * 2);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha value based on health
function drawPlayer() {
  fill(playerFill, playerHealth);
  ellipse(playerX, playerY, playerRadius * 2);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Set up the font
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the text to display
  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "You ate " + preyEaten + " prey\n";
  gameOverText = gameOverText + "before you died."
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
}

class ScreenQueue {
  // Array is used to implement a Queue
    constructor(maxItems)
    {
        this.items = [];
        this.maxItems = maxItems;
    }
    // Functions to be implemented

    isEmpty() {
      this.items.length = 0;
    }

    isFull() {
      if(this.items.length == this.maxItems) {
        return true;
      }
    }
    // enqueue(item)
    enqueue(element) {
      if(isFull) {
        alert("Full");
        return;
      }
      else {
        this.items.push(element);
      }
    }

    // dequeue()
    // front()
    // isEmpty()
    // printQueue()
}
