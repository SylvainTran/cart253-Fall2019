"use strict";
/******************************************************************************
Author: Sylvain Tran
Date: September 26th, 2019

Goal of program:
  Modified version of exercise 3. This time I didn't go all weird I think...

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/
// The inner canvas' margins. Credits to Che Tan who pointed this out.
let innerMargins = 150;

// Click spam protection
let numbersOfClicks = 0;
let maxClicks = 5; // max five clicks allowed at level one

// Position and image of the sausage dog we're searching for
let targetX;
let targetY;
let targetImage;
let targetImageSizeX;
let targetImageSizeY;

// The ten decoy images
let decoyImage1;
let decoyImage2;
let decoyImage3;
let decoyImage4;
let decoyImage5;
let decoyImage6;
let decoyImage7;
let decoyImage8;
let decoyImage9;
let decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
let numDecoys = 100;

// Keep track of whether they've won
let gameOver = false;

// Or lost
let lost = false;

// Amount of times the player has won without losing (without having had clicked too many times)
let streakWins = 0;

/**
  Loads the target and decoy images before the program starts

*/
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

/**
  Resizes to canvas' width and height upon window resize.

*/
function resizeCanvas() {
  resize(windowWidth, windowHeight);
}

/**
  Creates the canvas, sets basic modes, draws correct number
  of decoys in random positions, then the target

*/
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);
  setupDecoys(targetImageSizeX);
  let innerCanvasWidth = width - innerMargins;
  let innerCanvasHeight = height - innerMargins;
}

/**
  Setup decoys inside the inner canvas.

*/
function setupDecoys(decoySize = targetImageSizeX) {

  // Setups the inner box
  let innerCanvasLeft = innerMargins;
  let innerCanvasRight = width - innerMargins - width / 6;
  let innerCanvasTop = innerMargins;
  let innerCanvasBottom = height - innerMargins;

  // Use a for loop to draw as many decoys as we need
  for (let i = 0; i < numDecoys; i++) {
    // Choose a random location on the canvas for this decoy
    let x = random(innerCanvasLeft, innerCanvasRight);
    let y = random(innerCanvasTop, innerCanvasBottom);
    // Generate a random number we can use for probability
    let r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough.
    // But basically each "if" and "else if" has a 10% chance of being true
    if (r < 0.1) {
      image(decoyImage1,x,y, decoySize);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y, decoySize);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y, decoySize);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y, decoySize);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y, decoySize);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y, decoySize);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y, decoySize);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y, decoySize);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y, decoySize);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y, decoySize);
    }
  }

  // Once we've displayed all decoys, we choose a random location for the target
  targetX = random(innerCanvasLeft, innerCanvasRight);
  targetY = random(innerCanvasTop, innerCanvasBottom);

  // And draw it (because it's the last thing drawn, it will always be on top)
  image(targetImage,targetX,targetY);
}

/**
  Displays the game over screen if the player has won,
  otherwise nothing (all the gameplay stuff is in mousePressed())

*/
function draw() {
  //gameLost();
  // Draw the canvas
  drawGUI();
  // Overview of the game:

  // 1. Check if the game is over
  checkIfGameOver();

  // 2. Game tutorial (expose mechanics)

  // 3. Increase difficulty (random images)

  // 4. Reward system (mock)

  spamProtection();
}

function drawGUI() {
  noStroke();
  fill(45, 255, 100);
  let guiXPos = width / 1.2;
  let guiYPos = 0;

  // Draw a background rectangle at the top right of the canvas
  rect(guiXPos, guiYPos, width / 6, height / 4);
  image(targetImage, guiXPos += width / 12, guiYPos += height / 10, width / 12, targetImageSizeY);
  fill(255);
  textSize(32);
  // Center the text below the picture of the target, centered
  text("Find me.", guiXPos -= width / 24, guiYPos += height / 8);
}

function spamProtection() {
  if(mouseIsPressed) {
    numbersOfClicks++;
  }
    console.log("Number of clicks: " + numbersOfClicks);
  if(numbersOfClicks >= maxClicks) {
    //lost = true;
  }
}

/**
  Displays win text if the player clicked the sausage dog.

*/
function displayWinText() {
  textFont("Helvetica");
  textSize(128);
  noStroke();
  fill(random(255));
  text("YOU WINNED!",width/2,height/2);
}

/**
  Checks if the game is over because the player clicked too many times, or if they actually found
  the target.

*/
function checkIfGameOver() {
  if (numbersOfClicks >= 100) {
    lost = true;
  }
  if (gameOver) {
    streakWins++;
    displayWinText();
    displayCircleAroundTarget();
    animateTargetUponWin();
    increaseDifficulty();
  }
  if (lost) {
    streakWins = 0;
    background(255);
    textSize(100);
    fill(255, 0, 0);
    text("Get good", width / 3, height / 2);
    noLoop();
  }
}

function displayCircleAroundTarget() {
  noFill();
  stroke(random(255));
  strokeWeight(10);
  ellipse(targetX,targetY,targetImage.width,targetImage.height);
}

function increaseDifficulty() {
  if(maxClicks == 0) {
    textSize(100);
    text("You have now finished this game, go play something else now", width / 3, height / 3);
  }
  else {
    maxClicks--;
    maxClicks = constrain(maxClicks, 0, 5);
  }

  /*
  switch(streakWins) {
      case 1:
        text("Beginner's luck", width / 3, height / 3);
      case 5:
        text("Target decimated", width / 3, height / 3);
      case 10:
        text("Target obliterated", width / 3, height / 3);
      case 20:
        text("Stop playing please", width / 3, height /3);
      default:
        text("You're awesome!", width / 3, height / 3);
  }
  */

  // Random new background color
  //background(random(0, 255), random(0, 255), random(0, 255));
  //setupDecoys(targetImageSizeX += 50);

}
/**
  Moves the target randomly upon having won.

*/
function animateTargetUponWin() {
  // Inner canvas settings
  let innerCanvasWidth = width - innerMargins;
  let innerCanvasHeight = height - innerMargins;
  let innerCanvasHeightTop = innerMargins;

  // Velocity parameters
  let automaticVx = 1;
  let automaticVy = 1;

  // Loop that animates the dog around randomly
  for(let i = 0; i < gameOver; i++) {
    automaticVx = random(0, 50);
    automaticVy = random(0, 50);

    targetX += automaticVx;
    targetY += automaticVy;

    // Make the dog appear at the other end of the canvas
    if(targetX < 0 || targetX >= innerCanvasWidth) {
      targetX = -automaticVx;
    }
    else if(targetY < 0 || targetY >= innerCanvasWidth) {
      targetY = -automaticVy;
    }

    // The actual display
    background(0); // redraw the background in black
    textSize(100);
    fill(255, 0, 0);
    text("It's raining dogs!", width / 4, height / 2);

    image(targetImage, targetX, targetY, targetImageSizeX, targetImageSizeY);
  }
}
/**
  Resets the statistics (number of clicks).

*/
function resetGame() {
  numbersOfClicks = 0;
  setupDecoys(targetImageSizeX);

}
// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // The mouse was clicked!
  // Check if the cursor is in the x range of the target
  // (We're subtracting the image's width/2 because we're using imageMode(CENTER) -
  // the key is we want to determine the left and right edges of the image.)
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the cursor is also in the y range of the target
    // i.e. check if it's within the top and bottom of the image
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      checkIfGameOver();
      gameOver = true;
      console.log("Target pressed");
    }
  }
}
