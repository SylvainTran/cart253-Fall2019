"use strict";
/******************************************************************************
Author: Sylvain Tran
Date: September 26th, 2019

Goal of program:
  Modified version of exercise 3.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/
// Canvas parameters
let innerMargins = 150;

// Spam protection
let numbersOfClicks = 0;

// Position and image of the sausage dog we're searching for
let targetX;
let targetY;
let targetImage;
let targetImageSizeX;
let targetImageSizeY;

let tx = 0;
let ty = 0;

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

// Time to rescue the dog from the killer. Decreases by level.
let timer = 5;

// preload()
//
// Loads the target and decoy images before the program starts
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

function resizeCanvas() {
  resize(windowWidth, windowHeight);
}
// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);
  setupDecoys();
  let innerCanvasWidth = width - innerMargins;
  let innerCanvasHeight = height - innerMargins;
}

function setupDecoys() {
  
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
      image(decoyImage1,x,y);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y);
    }
  }
  
  // Once we've displayed all decoys, we choose a random location for the target
  targetX = random(innerCanvasLeft, innerCanvasRight);
  targetY = random(innerCanvasTop, innerCanvasBottom);

  // And draw it (because it's the last thing drawn, it will always be on top)
  image(targetImage,targetX,targetY);

  // Perlin noise setups
  tx = random(0, 1000);
  ty = random(0, 1000);
}
// draw()
//
// Displays the game over screen if the player has won,
// otherwise nothing (all the gameplay stuff is in mousePressed())
function draw() {
  //gameLost();
  drawGUI();
  spamProtection();

  // Todo, add a timer, Plus Doggy Serial Eater theme
  if (frameCount % 60 == 0 && timer > 0) {
    timer --;
  }
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
    console.log("Number of clicks: " + numbersOfClicks);
  }
  if(numbersOfClicks >= 5) {
    //lost = true;
    //gameLost();
  }
}

/* function gameLost() {
  if(!lost){
    return;
  }
  else {
    // Prepare our typography
    textFont("Helvetica");
    textSize(128);
    //textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));

    // Tell them they won!
    text("YOU LOST!",width/2,height/2);
    // Reset the number of clicks
    numbersOfClicks = 0;

    // Reset the timer
    timer = 5;  

    // Reset game state
    lost = false;
  }
} */

function checkIfGameOver() {
  if (timer == 0) {
    lost = true;
    //gameLost();
  }
  if (gameOver) {
    loop();
    // Prepare our typography
    textFont("Helvetica");
    textSize(128);
    //textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));

    // Tell them they won!
    text("YOU WINNED!",width/2,height/2);
    // Reset the number of clicks
    numbersOfClicks = 0;

    // Reset the timer
    timer = 5;

    // Draw a circle around the sausage dog to show where it is (even though
    // they already know because they found it!)
    noFill();
    stroke(random(255));
    strokeWeight(10);
    ellipse(targetX,targetY,targetImage.width,targetImage.height);

    let innerCanvasWidth = width - innerMargins;
    let innerCanvasHeight = height - innerMargins;
    let vx = 1;
    let vy = 1;

    let numberOfTranslations = 2000;

    for(let i = 0; i < numberOfTranslations; i++) {
      // Move the sausage dog around
      // Perlin noise movement for the DOG
      vx *= noise(targetX);
      vy *= noise(targetY);

      targetX *= vx;
      targetY *= vy;
      
      background("#ffff00");
      image(targetImage, targetX, targetY, targetImageSizeX, targetImageSizeY);
        
      // Make the dog bounce if he hits one of the walls
      
      if(targetX >= innerCanvasWidth) {
        targetX -= innerCanvasWidth;
      }
      else if(targetX <= innerCanvasWidth) {
        targetX += innerCanvasWidth;
      }
      else if(targetY >= innerCanvasHeight) {
        targetY -= innerCanvasHeight;
      }
      else if(targetY <= innerCanvasHeight) {
        targetY += innerCanvasHeight;
      }

      tx += 0.01;
      ty += 0.01;
      }
    }
}

function resetGame() {

  
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
