"use strict";

/**
*
Author: Sylvain Tran
Date: September 3rd, 2019

Goal of program: Modified version of chaser by Dr. Pippin Bar
The concept explored in this game is the original relation between man and woman
with the perspective of the Theology of the Body.

Twists: You can eat the forbidden fruit. Or...

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

*/
let debugMode = true;
// Canvas scenes management
// Holds the scenes in a queue
let sceneQueue;
// The current scene that allows us to some logic
let currentScene = "intro1"; // By default start at intro1
let introScene;
let playIntroduction = false; // Pass the intro cinematic canvas screen to the actual game
let playedIntro1 = false;
let playedIntro2 = false;
let playedIntro3 = false;
let prefallenState = false; // Movement type of adam/eve set to be naturally attracted to each other, before you eat the forbidden fruit
// Track whether the game is over
let gameOver = false;

// Screen management related
let scenes;
let changeSceneThresholdX = 50;
let changeSceneThresholdY = 50;

// Heart pic for prefallen state
let heartPic;

// Player's chosen gender, position, size, velocity
let playerGender;
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
let preyFill = 255;

// Perlin noise time values
let tx = 1;
let ty = 1;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 10;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;

let amaticSCFont;
let mountainsOfChristmasFont;

function preload() {
  heartPic = loadImage('assets/images/heart.png');
  amaticSCFont = loadFont('assets/fonts/AmaticSC-Regular.ttf');
  mountainsOfChristmasFont = loadFont('assets/fonts/MountainsofChristmas-Regular.ttf');
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  // draw the intro cinematic screen to full width and height
  introScene = createCanvas(1000, 1000);
  introScene.parent('mainDisplay');
  sceneQueue = new Queue();
  sceneQueue.enqueue("intro1");
  sceneQueue.enqueue("intro2");
  sceneQueue.enqueue("intro3");
  sceneQueue.enqueue("eden1");
  sceneQueue.enqueue("eden2");
  sceneQueue.enqueue("eden3");
  sceneQueue.enqueue("forbiddenFruitScene");
  sceneQueue.enqueue("playgrounds1");

  console.log("Scenes in queue: " + sceneQueue.items.length);
  // Create the game's canvas
  noStroke();
  setupPrey();
  setupPlayer();

  playIntroduction = true;
  prefallenState = true;
  tx = 0.0001
  ty = 0.0001;

  //let createHuman = prompt("John 1:26-27: ");
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
    console.log("Calling nextScene: expecting that it should be intro1");
    nextScene();
  }

  // The last intro scene is intro3, so we play the game when it's played
  if (!gameOver && playedIntro3 === true) {
    goToScene(currentScene);
    movePlayer();
    checkPlayerChangedScene(currentScene); // Forgot to pass a parameter ! Wow.

    if (prefallenState) {
      beAttractedToPlayer();
      addHeartOnCollision();
    } else {
      movePrey();
      updateHealth();
      checkEating();
    }

    drawPrey();
    drawPlayer();
  } else if (gameOver) {
    showGameOver();
  }
}

/**
  This built-in function ensures that the key pressed boolean is only returned once.

*/
function keyPressed() {
  if (keyCode === ENTER && currentScene != "eden1") { // Change scene with Enter if you're still in the intro scenes
    if (sceneQueue.isEmpty()) {
      return;
    } else {
      console.log("Enter pressed... going to the next scene.");
      clear();
      nextScene();
    }
  }
  if (keyCode === ENTER && currentScene === "eden1") { // In Eden 1, you can make babies if you press space.
    console.log("Making babies");
    //makeBabies(1);
  }
}
// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  let maxBoostedSpeed = playerMaxSpeed * 10;

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

/**
  Move to the next scene.

*/
function nextScene() {
  clear();
  if (sceneQueue.isEmpty()) {
    return;
  } else {
    let nextScene = sceneQueue.dequeue();
    currentScene = nextScene;
    goToScene(currentScene);
  }
}

/**
  Get the current screen -- by creating a new scene with the
  defined objects in it. Scenes should get increasingly darker
  as Adam or Eve approaches the forbidden fruit to evoke spiritual
  depth or darkness.

*/
function goToScene(scene) {
  let textContent;
  let nbActors = 0;
  let introBgColor = 0;
  let edenBgColor = 255; //start pure light
  textFont(amaticSCFont);

  switch (scene) {
    case "intro1":
      textContent = "\"God created man in His own image; " +
        "in the\n" + "image of God He created him; male and female\n" +
        "He created them.\"\n\nGenesis 1:27";
      makeScene(scene, introBgColor, 42, 255, textContent, 30, height / 2, false, nbActors);
      text("Press Enter to continue.", 30, height / 1.2);
      playedIntro1 = true;
      console.log(currentScene);
      break;
    case "intro2":
      textContent = "\“It is not good for the man to be alone.\n I will make a helper suitable for him.\"\n\nGenesis 2:18";
      makeScene(scene, introBgColor, 42, 255, textContent, 30, height / 2, false, nbActors);
      text("Press Enter to continue.", 30, height / 1.2);
      playedIntro2 = true;
      console.log(currentScene);
      break;
    case "intro3":
      textContent = "\"Then the Lord God made a woman from the rib\nhe had taken out of the man,\nand he brought her to the man...\"\n\nGenesis 2:22";
      makeScene(scene, introBgColor, 42, 255, textContent, 30, height / 2, false, nbActors);
      text("Press Enter to continue.", 30, height / 1.2);
      // Call the gameplay scene after 3 seconds to avoid skipping the intro3 scene
      setTimeout(
        function() {
          console.log("Waiting 3 seconds");
          playedIntro3 = true
        }, 3000);
      console.log(currentScene);
      break;
    case "eden1":
      textContent = "Garden of Eden 1.\n\n\"The man said,\nThis is now bone of my bones and flesh of my flesh;\nshe shall be called  \'woman\' for she was\ntaken out of man.\"\n\nGenesis 2:23";
      makeScene(scene, edenBgColor, 42, 0, textContent, 30, height / 7, false, nbActors);
      console.log(currentScene);
      break;
    case "eden2":
      textContent = "Garden of Eden 2.";
      makeScene(scene, 195, 42, 255, textContent, 30, height / 7, false, nbActors);
      console.log(currentScene);
      break;
    case "eden3":
      textContent = "Garden of Eden 3.\n\n\"Adam and his wife were both naked, and they felt no shame.\"\n\nGenesis 2:25";
      makeScene(scene, 145, 42, 255, textContent, 30, height / 7, false, nbActors);
      console.log(currentScene);
      break;
    case "forbiddenFruitScene":
      textContent = "The Forbbiden Fruit.\n\n\"When the woman saw that the fruit of the tree was good \nfor food and pleasing to the eye, and also desirable\nfor gaining wisdom, she took some and ate it.\nShe also gave some to her husband,\nwho was with her, and he ate it.\n\nGenesis 3:6\"";
      makeScene(scene, 45, 42, 255, textContent, 30, height / 7, true, nbActors);
      console.log(currentScene);
      break;
    case "playgrounds1":
      textContent = "Your World 1.";
      makeScene(scene, 45, 42, 255, textContent, 30, height / 7, true, nbActors);
      console.log(currentScene);
      break;
    default:
      break;
  }
}

function sceneExit(direction) {
  //let directions = { "LEFT", "RIGHT", "TOP", "DOWN" };
  let currX = playerX;
  console.log("Change scene tresholdX " + (width - changeSceneThresholdX));
  console.log("Change scene tresholdY" + (height - changeSceneThresholdY));

  switch (direction) {
    case "LEFT":
      if ((playerX - playerRadius) <= (0 + changeSceneThresholdX)) {
        alert("Going left for real");
        nextScene();
      }
      break;
    case "RIGHT":
      if ((playerX + playerRadius) >= (width - changeSceneThresholdX)) {
        nextScene();
      }
      break;
    case "TOP":
      if ((playerY + playerRadius) <= (0 + changeSceneThresholdY)) {
        alert("Going top for real");
        nextScene();
      }
      break;
    case "DOWN":
      if ((playerY - playerRadius) >= (height - changeSceneThresholdY)) {
        alert("Going down for real");
        nextScene();
      }
      break;
    default:
      break;
  }
}

function checkPlayerChangedScene(currentScene) {
  console.log("Checking if player has changed scene");
  console.log("Player X: " + playerX);
  console.log("Player Y: " + playerY);
  console.log("Width: " + width);
  console.log("Height: " + height);
  console.log("currentScene: " + currentScene);

  // depending on the scene, certain screen boundaries are open for going to the next scene
  switch (currentScene) {
    case "eden1":
      sceneExit("DOWN");
      break;
    case "eden2":
      sceneExit("LEFT");
      break;
    case "eden3":
      sceneExit("TOP");
      break;
     case "forbiddenFruitScene":
       if (!prefallenState) { //fallen state starts after player collides with fruit
         nextScene();
       }
       break;
     case "playgrounds1": // At this point the scene only progresses when the player dies, to evoke spiritual rebirth. The effect of sin, need to die on the cross etc.
       if (playerHealth === 0) {
         nextScene();
       }
       break;
    default:
      break;
  }
}
// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges. if in prefallen state (before eating the forbidden fruit)
function movePlayer() {
  screenWarping("player");
  //screenBouncing();
  // Update position
  playerX += playerVX;
  playerY += playerVY;
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  if (prefallenState) { // If we are in the prefallen state, we don't lose our vitality
    return;
  }
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


/**
  Mirror function of checkEating(). If in prefallenState, uh... add a heart picture above man and woman
  upon collision. Rated R for red...

*/
function addHeartOnCollision() {
  if (!prefallenState) {
    return;
  }
  let d = dist(playerX, playerY, preyX, preyY);

  if (d < playerRadius + preyRadius) {
    clear();
    push();
    background(175, 0, 0, 100); // Turn the background into intimate scarlet
    imageMode(CENTER);
    image(heartPic, playerX + playerRadius * random(0, 5), playerY - playerRadius * random(0, 5), 100, 100);
    image(heartPic, playerX - playerRadius * random(0, 5), playerY - playerRadius * random(0, 5), 100, 100);
    image(heartPic, playerX + playerRadius * random(0, 5), playerY - playerRadius * random(0, 5), 100, 100);
    pop();

    push();
    fill(255);
    textSize(42);
    //let Mark_10_7 = "Mark 10:7\n\"For this reason a man will leave his father\n and mother and be united to his wife.\""
    //text(Mark_10_7, width / 7, height / 7);

    let theSnake;
    let sceneChangeClue;

    switch (currentScene) {
      case "eden1":
        theSnake = "(You hear a hiss...) \"I imagine you don't get to do much all day,\nstuck out like that.\"";
        sceneChangeClue = "(Get to the bottom by pressing shift to sprint.)";
        break;
      case "eden2":
        theSnake = "Ah, she came anyways?\n Well, what can you do right?\n I guess we can all still be friends.\n";
        break;
      case "eden3":
        theSnake = "Not ashamed? Seriously?\n Aren't you curious as to why Eve\nisn't even remotely as hairy as you are?";
        break;
      case "forbiddenFruitScene":
        theSnake = "\n I hear it melts in your mouth...\nI know you want to eat it too!\nTehee!";
        break;
      case "playgrounds1":
        break;
      case "playgrounds2":
        break;
      default:
        break;
    }

    push();
    textFont(mountainsOfChristmasFont);
    text(theSnake, width / 7, height / 1.5);
    text(sceneChangeClue, width / 7, height / 1.2);
    pop();

    // Trigger ate the forbidden fruit
    if(currentScene === "forbiddenFruitScene") {
      prefallenState = false;
    }
  }
}

/**
  if not in prefallenstate, check if the player overlaps the prey and updates health of both.

*/
function checkEating() {
  if (prefallenState) {
    return; // because they are one flesh already
  }
  let d = dist(playerX, playerY, preyX, preyY);

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

/**
  MoveEve or MoveAdam pre-fallen state. Natural attraction to each other,
  based on the other's position. Should be disabled during the forbiddenFruitScene.

*/
function beAttractedToPlayer() {
  if(currentScene === "forbiddenFruitScene") {
    return;
  }
  // calculate something around the player's x, y
  // get the current distance from the player
  let playerPosX = playerX;
  let playerPosY = playerY;

  const minDistance = 20;
  const maxDistance = minDistance / 2; // don't get closer than half of the min distance

  let currentDistance = dist(playerPosX, preyX, playerPosY, preyY);
  // while it is greater than half of the distance
  if (currentDistance >= minDistance) {
    // Advance to the one-seventh of a distance
    preyVX = currentDistance / 7;
    preyVY = currentDistance / 7;

    // Update prey position to go towards the player depending on the distance
    // relative to the player at each successive call of this function
    if (preyX < playerX) {
      preyX += preyVX * 0.10;
    } else {
      preyX -= preyVX * 0.10;
    }
    if (preyY < playerY) {
      preyY += preyVY * 0.10;
    } else {
      preyY -= preyVY * 0.10;
    }
  }
  // TODO prey backs-up if x,y < maxDistance
  screenWarping("nonplayer");
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  preyVX = map(noise(tx), 0, 1, -preyMaxSpeed, preyMaxSpeed);
  preyVY = map(noise(ty), 0, 1, -preyMaxSpeed, preyMaxSpeed);;
  preyX += preyVX;
  preyY += preyVY;

  screenWarping("nonplayer");

  tx += 0.01;
  ty += 0.01;
}

/**
  Bounces the player across the edges of the canvas,
 in prefallen state. To evoke uh... the bounciness... of the h-heart...

*/
function screenBouncing() {
  if (playerX - playerRadius <= 0 || playerX + playerRadius >= width) {
    playerVX = -playerVX;
  } else if (playerY - playerRadius <= 0 || playerY + playerRadius >= height) {
    playerVY = -playerVY
  }
}

// Screen warping; according to if it is called for the player or the AI
function screenWarping(actor) {
  if (actor === "nonplayer") { // For the opposite gender and other life forms
    if (preyX <= 0) {
      preyX = preyX + width;
    } else if (preyX >= width) {
      preyX = preyX - width;
    }
    if (preyY <= 0) {
      preyY = preyY + height;
    } else if (preyY >= height) {
      preyY = preyY - height;
    }
  } else { // Wrap when player goes off the canvas
    if (playerX + playerRadius <= 0 + changeSceneThresholdX) {
      // Off the left side, so add the width to reset to the right
      playerX += width;
    } else if (playerX - playerRadius >= width - changeSceneThresholdX) {
      // Off the right side, so subtract the width to reset to the left
      playerX -= width;
    }

    if (playerY + playerRadius <= 0 + changeSceneThresholdY) {
      // Off the top, so add the height to reset to the bottom
      playerY += height;
    } else if (playerY - playerRadius >= height - changeSceneThresholdY) {
      // Off the bottom, so subtract the height to reset to the top
      playerY -= height;
    }
  }
}
// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  if (prefallenState) {
    // Actor display
    push();
    preyFill = 0;
    fill(preyFill);
    ellipse(preyX, preyY, preyRadius * 2);
    pop();
  } else {
    fill(preyFill, preyHealth);
    ellipse(preyX, preyY, preyRadius * 2);
  }
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

/**
  Makes a scene. Simple background colors for now.

*/
function makeScene(currScene, backgroundColor, tSize, textColor, textContent, xPos, yPos, actorsPresent, nbActors) {
  currentScene = currScene;
  background(backgroundColor);

  // Text display
  push();
  textSize(tSize);
  fill(textColor);
  text(textContent, xPos, yPos);
  pop();

  if (actorsPresent && currentScene === "forbiddenFruitScene") {
    // spawn actors (ellipses for now)
    let actors = [nbActors];
    // Take control of Eve and animate her...
    // Prevent her from being attracted to player
    // Place Eve at the top center of the Scene
    preyX = width / 2;
    // Increment her Y by +1 each call if has not reached center yet
    if(preyY <= height / 2) {
      preyY++;
    }
    else {
      preyY = height / 2;
    }
    // Draw the forbidden fruit.
    push();
    fill(255, 0, 0);
    rectMode(CENTER);
    rect(width / 2, height / 2, 85, 85);
    pop();
  }
}

/**
  Queue data structure for managing screen transitions.
  ...And other things.

*/
class Queue {
  constructor(maxItems) {
    this.items = [];
    this.maxItems = maxItems;
  }

  /**
      Helper functions to check if the queue is empty or full.

  */
  isEmpty() {
    return this.items.length === 0;
  }

  isFull() {
    return this.items.length == this.maxItems;
  }

  enqueue(element) {
    if (this.isFull()) {
      alert("Full");
      return;
    } else {
      this.items.push(element);
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty: underflow.";
    } else {
      return this.items.shift();
    }
  }
  // front()
  front() {
    if (this.isEmpty()) {
      return "Queue is empty of elements.";
    } else {
      return this.items[0];
    }
  }

  // peek
  peek() {
    return this.items[this.items.length - 1];
  }
}

class Scene {
  constructor(bgColor, actors, animals, environment, props, maxObjects, cinematic) {
    this.bgColor = bgColor;
    this.actors = actors;
    this.animals = animals;
    this.environment = environment;
    this.props = props;
    this.maxObjects = maxObjects;
    this.cinematic = cinematic;
  }

  makeScene() {

  }

  initScene() {

  }
  // TODO look into data-oriented

  generateActors(playerGender, sceneType, forbiddenFruitState) {

    // Spawn the gender that the player has not picked
    // Checks if the scene type is a cinematic or game scene
    // Predisposition according to whether the forbidden fruit has been consummed
  }
}

/**
  Actor class

*/
class Actor {
  constructor(actorType, width, height, speed) {
    this.actorType = actorType;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  makeActor() {
    // if(this.actorType === "animal") {
    //
    // }
  }

  /**
    Make a random shape for the animal
  */
  makeAnimalTemplate() {
    rectMode(CENTER);
    rect(random(0, 100), random(0, 100), random(50, 100), random(50, 100));
  }
}

/**
  Make babies according to the specified amount to output.
  The location and specifics of each newborn is random based.

*/
function makeBabies(nbActors) {
  let actors = {};
  let lifeStream = new Queue();

  for (let i = 0; i <= nbActors; i++) {
    let randomPosX = random(0, height);
    let randomPosY = random(0, width);
    let randWidth = random(playerRadius, playerRadius * 3);
    let randHeight = random(playerRadius, playerRadius * 3);

    //spawn each actor
    fill(random(0, 255), random(0, 255), random(0, 255));
    //ellipse(playerX, playerY, playerRadius * 2);
    let newBorn = ellipse(randomPosX, randomPosY, randWidth, randHeight);
    fill(255);
    text("I am one", randomPosX, randomPosY, randWidth - randomPosX, randHeight - 30);
    lifeStream.enqueue(newBorn);
  }

  while (lifeStream.isEmpty() === false) {
    lifeStream.dequeue();
  }
}
