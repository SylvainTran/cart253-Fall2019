"use strict";
p5.disableFriendlyErrors = true;

/**
Author: Sylvain Tran
Date: September 26th, 2019

Goal of program:
  Modified version of exercise 3. This time I didn't go all weird I think... ...
  // Overview of the game:

  // 1. Check if the game is over ...

  // 2. Increase difficulty (decoy size and numbers increase both) upon pressing shift.

  // 3. Reward the player with interesting typography at certain win streaks. Punish him/her
      if they click frantically

Thanks to Dr. Pippin Bar for the code.
Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
*/

// The inner canvas' margins. Credits to Che Tan who pointed out the stuff, then I just improvised
let innerMargins = 150;

// Click spam protection
let numbersOfClicks = 0;
let maxClicks = 5; // max 5 clicks allowed at level one
// If the player lost the game... by spamming clicks...
let lostGame = false;

// Position and image of the sausage dog we're searching for
let targetX;
let targetY;
let targetImage;
let targetImageSpeed = 4;
// Velocity for x, y
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
// Amount of times the player has won without losing (without having had clicked too many times)
let streakWins = 0;
// How much the decoy image sizes increment each time a game is won and the user decides to press shift to increase difficulty
let sizeIncrement = 3;

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
  setupDecoys(targetImage.width, numDecoys);
}

/**
  Setup decoys inside the inner canvas.

*/
function setupDecoys(decoySize, numDecoys) {
  lostGame = false;
  // Set background to a new random color
  background(random(0, 255), random(0, 255), random(0, 255));
  drawGUI();
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
  drawGUI();

  // If the player clicked the target
  if (gameOver) {
    displayWinText();
    displayCircleAroundTarget();
    displayVictoryAnimation();
    rewardPlayer(); // break point rewards
  }
  // A mirror outcome... if the player clicked too many times and lost
  if (lostGame) {
    displayLoserText();
    displayCircleAroundTarget();
    displayLoserAnimation();
    resetVelocity();
  }
}

/**
  Draws the GUI on top.

*/
function drawGUI() {
  let guiXPos = width / 1.2;
  let guiYPos = 0;

  // Draw a background rectangle at the top right of the canvas
  push();
  noStroke();
  fill(45, 255, 100);
  rect(guiXPos, guiYPos, width / 6, height / 4);
  image(targetImage, guiXPos += width / 12, guiYPos += height / 10, width / 12, targetImage.height);
  fill(255);
  textSize(32);

  // Center the text below the picture of the target, centered
  text("Find me!", guiXPos -= width / 24, guiYPos += height / 8);
  pop();

  // Display streak wins yet (a template litteral woo!)
  push();
  fill(120, 0, 120);
  textSize(40);
  text(`Streak Wins: ${streakWins}`, guiXPos -= width / 28, guiYPos - 200);
  pop();

  // Display mouse clicks
  push();
  fill(200, 0, 120);
  textSize(40);
  text(`Clicks: ${numbersOfClicks}`, guiXPos - 600, guiYPos - 200);
  pop();

  // Display max mouse clicks
  push();
  fill(120, 0, 255);
  textSize(40);
  text(`Max clicks before losing: ${maxClicks}`, guiXPos - 1200, guiYPos - 200);
  pop();
}

/**
  Resets the velocity to 1.

*/
function resetVelocity() {
  vx = 1;
  vy = 1;
}

/**
  Displays victory animation if the target image was clicked.

*/
function displayVictoryAnimation() {
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
  image(targetImage, targetX, targetY, targetImage.width, targetImage.height);
}

/**
  Displays a loser animation if number of clicks exceeded maxClicks.
  (Target goes out of the canvas promptly)

*/
function displayLoserAnimation() {
  // loser animation
  vx += targetImageSpeed * 10;
  vy += targetImageSpeed * 10;

  targetX += vx;
  targetY += vy;
  image(targetImage, targetX, targetY, targetImage.width, targetImage.height);
}

/**
  Displays win text if the player clicked the target image.

*/
function displayWinText() {
  background(0);
  textFont("Helvetica");
  textSize(128);
  noStroke();
  fill(0, 255, 0);
  text("ARE YOU PROUD OF YOURSELF?\nPress Shift to play the next level.", 0, height / 2);
  displayCircleAroundTarget();
}

/**
  Displays failure text if the player's number of clicks exceeded maxClicks.

*/
function displayLoserText() {
  background(0);
  textFont("Helvetica");
  textSize(120);
  noStroke();
  fill(255, 0, 0);
  text("YOU FAILURE! OMAE-WA MOU\n" + "SHINDEIRU-ARTHRITIS", 150, height / 2);
  textSize(80);
  text("Doggie out.\nPress Enter to restart at the same level.", 150, height - 200);
  displayCircleAroundTarget();
}

/**
  Displays circle around target during the winning and losing animation.

*/
function displayCircleAroundTarget() {
  push();
  noFill();
  stroke(random(255));
  strokeWeight(10);
  ellipse(targetX, targetY, targetImage.width, targetImage.height);
  pop();
}

/**
  Basically calls resetGame but with a boolean to decide if increase difficulty or not.

*/
function increaseDifficulty() {
  resetGame(true);
}

/**
  Resets the statistics (number of clicks).

*/
function resetGame(moreDifficult) {
  numbersOfClicks = 0; // Reset the number of clicks to avoid losing
  gameOver = false;
  clear();
  if (moreDifficult) {
    maxClicks--; // 1 less max click allowed (kind of harsh)
    if (maxClicks === 0) { // for 0 boundary cases (I find it easier to read than constrain somehow)
      maxClicks = 1;
    }
    // increase decoy size and amounts
    let newDecoySize = targetImage.width += sizeIncrement;
    let newDecoyAmount = numDecoys += sizeIncrement;
    setupDecoys(newDecoySize, newDecoyAmount); // Makes the image larger
  } else { // we are just resetting the game without increasing the difficulty
    // we lose the streak wins so far
    streakWins = 0;
    setupDecoys(targetImage.width, numDecoys); // Makes the image the same
  }
  drawGUI();
}

/**
  Checks if the player clicked on the target and if so tells them they won.
  Built-in function that ensures the mousePressed boolean is only returned once.

*/
function mousePressed() {
  numbersOfClicks++;
  console.log(`Displaying number of mouse clicks: ${numbersOfClicks}`);

  if (mouseX > targetX - targetImage.width / 2 && mouseX < targetX + targetImage.width / 2) {
    if (mouseY > targetY - targetImage.height / 2 && mouseY < targetY + targetImage.height / 2) {
      gameOver = true;
      streakWins++;
    }
  } else if (numbersOfClicks >= maxClicks) {
    lostGame = true;
    streakWins = 0;
  }
}

/**
  This built-in function ensures that the key pressed boolean is only returned once.

*/
function keyPressed() {
  if (keyCode === SHIFT) { // the player... can press this repeatedly for... now...
    console.log("Increasing difficulty.");
    increaseDifficulty();
  }
  if (keyCode === ENTER) {
    console.log("Enter pressed... resetting game.");
    maxClicks = 5; // we reset back to 5 clicks allowed...
    resetGame(false);
  }
}

/**
  Rewards the player with interesting typography.

*/
function rewardPlayer() {
  switch (streakWins) {
    case 1:
      push();
      background(255);
      fill(120, 0, 120);
      textSize(100);
      text(`Begginer's luck... Streak Wins: ${streakWins}\nPress Shift to increase difficulty`, 150, height / 2);
      pop();
      break;
    case 5:
      push();
      background(255);
      fill(120, 0, 120);
      textSize(100);
      text(`Pretty good. *Handgun motion at you*\n. Streak Wins: ${streakWins}\nPress Shift to increase difficulty`, 150, height / 2);
      pop();
      break;
    case 10:
      push();
      background(255);
      fill(120, 0, 120);
      textSize(100);
      text(`Go play something else... Streak Wins: ${streakWins}\nPress Shift to increase difficulty`, 150, height / 2);
      pop();
    default:
      break;
  }
}
