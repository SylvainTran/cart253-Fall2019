"use strict";
/******************************************************************************
Author: Sylvain Tran
Date: September 26th, 2019

Goal of program:
  Modified version of exercise 3. This time I didn't go all weird I think...
  // Overview of the game:

  // 1. Check if the game is over

  // 2. Increase difficulty (random images)

  // 3. Reward system (mock)

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/
// The inner canvas' margins. Credits to Che Tan who pointed this out.
let innerMargins = 150;

// Click spam protection
let numbersOfClicks = 0;
let maxClicks = 100; // max 100 clicks allowed at level one

// Position and image of the sausage dog we're searching for
let targetX;
let targetY;
let targetImage;
let targetImageSizeX;
let targetImageSizeY;
let targetImageSpeed = 2;
let vx = 1;
let vy = 1;

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
// How much the decoy image sizes increment each time a game is won
let sizeIncrement = 50;

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
  createCanvas(windowWidth, windowHeight);
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
  // Set background to a new random color
  background(random(0, 255), random(0, 255), random(0, 255));

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
    let r = random();

    if (r < 0.1) {
      image(decoyImage1, x, y, decoySize);
    } else if (r < 0.2) {
      image(decoyImage2, x, y, decoySize);
    } else if (r < 0.3) {
      image(decoyImage3, x, y, decoySize);
    } else if (r < 0.4) {
      image(decoyImage4, x, y, decoySize);
    } else if (r < 0.5) {
      image(decoyImage5, x, y, decoySize);
    } else if (r < 0.6) {
      image(decoyImage6, x, y, decoySize);
    } else if (r < 0.7) {
      image(decoyImage7, x, y, decoySize);
    } else if (r < 0.8) {
      image(decoyImage8, x, y, decoySize);
    } else if (r < 0.9) {
      image(decoyImage9, x, y, decoySize);
    } else if (r < 1.0) {
      image(decoyImage10, x, y, decoySize);
    }
  }

  // Once we've displayed all decoys, we choose a random location for the target
  targetX = random(innerCanvasLeft, innerCanvasRight);
  targetY = random(innerCanvasTop, innerCanvasBottom);

  // And draw it (because it's the last thing drawn, it will always be on top)
  image(targetImage, targetX, targetY);
}

/**
  Displays the game over screen if the player has won,
  otherwise nothing (all the gameplay stuff is in mousePressed())

*/
function draw() {
  // Draw the canvas
  drawGUI();
  handleInputs();

  if (gameOver) {
    // Prepare our typography
    textFont("Helvetica");
    textSize(128);
    noStroke();
    fill(random(255));

    // Tell them they won!
    text("YOU WINNED!",width/2,height/2);
    background(0);
    displayCircleAroundTarget();

    // victory animation
    vx += targetImageSpeed;
    vy += targetImageSpeed;

    if (targetX < 0 || targetX > width) {
      vx = -vx;
    }
    if (targetY < 0 || targetY > height) {
      vy = -vy;
    }

    targetX += vx;
    targetY += vy;

    image(targetImage, targetX, targetY, targetImageSizeX, targetImageSizeY);
    displayWinText();
  }
}

  function drawGUI() {
    let guiXPos = width / 1.2;
    let guiYPos = 0;

    // Draw a background rectangle at the top right of the canvas
    push();
    noStroke();
    fill(45, 255, 100);
    rect(guiXPos, guiYPos, width / 6, height / 4);
    image(targetImage, guiXPos += width / 12, guiYPos += height / 10, width / 12, targetImageSizeY);
    fill(255);
    textSize(32);

    // Center the text below the picture of the target, centered
    text("Find me!", guiXPos -= width / 24, guiYPos += height / 8);
    pop();

    // Display streak wins yet (a template litteral woo!)
    push();
    fill(120, 0, 120);
    textSize(40);
    text(`Streak Wins: ${streakWins}`, guiXPos - 400, guiYPos - 200);
    pop();

    // Display number of clicks so far and how many left before losing
    push();
    fill(120, 0, 120);
    textSize(40);
    text(`Times Clicked: ${numbersOfClicks}`, guiXPos - 800, guiYPos - 200);
    pop();

    // Display number of clicks so far and how many left before losing: Not sure how to keep
    // the random bg color while displaying the text below correctly.
    push();
    fill(120, 0, 120);
    textSize(40);
    text(`Max clicks left: ${maxClicks - numbersOfClicks}`, guiXPos - 1200, guiYPos - 200);
    pop();
  }

  function handleClicks() {
    if (mouseIsPressed) {
      numbersOfClicks++;
    }
    console.log("Number of clicks: " + numbersOfClicks);
  }

  /**
    Displays win text if the player clicked the target image.

  */
  function displayWinText() {
    textFont("Helvetica");
    textSize(128);
    noStroke();
    fill(255);
    text("YOU WINNED!", width / 4, height / 2);
    displayCircleAroundTarget();
  }

  /**
    Checks if the game is over because the player clicked too many times, or if they actually found
    the target.

  */
  function checkIfGameOver() {
    if (numbersOfClicks >= maxClicks) {
      lost = true;
    }
    if (gameOver) {
      //gameOver = false;
      streakWins++;
      displayWinText();
      //animateTargetUponWin();
    }
    if (lost) {
      streakWins = 0;
      background(255);
      textSize(100);
      fill(255, 0, 0);
      text("Get good", width / 3, height / 2);
      text("Press Enter to restart...", width / 3, height / 1.5);
      lost = false;
    }
  }

  function displayCircleAroundTarget() {
    push();
    noFill();
    stroke(random(255));
    strokeWeight(10);
    ellipse(targetX, targetY, targetImage.width, targetImage.height);
    pop();
  }

  function increaseDifficulty() {
    numbersOfClicks = 0; // Reset the number of clicks to avoid losing
    resetGame();
    // Random new background color
    //background(random(0, 255), random(0, 255), random(0, 255));
    setupDecoys(targetImageSizeX += sizeIncrement); // Level difficulty scaling up
  }
  /**
    Moves the target randomly upon having won.

  */
  function animateTargetUponWin() {
    console.log("how many times am i called?");
    // Inner canvas settings
    let innerCanvasWidth = width - innerMargins;
    let innerCanvasHeight = height - innerMargins;
    let innerCanvasHeightTop = innerMargins;

    // Velocity parameters
    let automaticVx = 1;
    let automaticVy = 1;

    // Number of times we animate the target image after victory
    let animationCounter = 5000;
    let timesAnimated = 0;
    for (; timesAnimated < 5000; timesAnimated++) {
      console.log("how many times am i called? 2");

      displayWinText();
    }
  }

  /**
    Resets the statistics (number of clicks).

  */
  function resetGame() {
    numbersOfClicks = 0;
    gameOver = false;
    clear();
    setupDecoys(targetImageSizeX);
    drawGUI();
  }

  /**
    Checks if the player clicked on the target and if so tells them they won

  */
  function mousePressed() {
    if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
      // Check if the cursor is also in the y range of the target
      // i.e. check if it's within the top and bottom of the image
      if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
        gameOver = true;
      }
    }
  }

  /**
    Handle inputs for resetting the game and increasing difficulty buttons.

  */
  function handleInputs() {
    if (keyIsDown(ENTER)) {
      console.log("Enter pressed... resetting game.");
      resetGame();
    } else if (keyIsDown(SHIFT)) {
      console.log("Increasing difficulty.");
      increaseDifficulty();
    }
  }
