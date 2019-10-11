"use strict";

/**
Author: Sylvain Tran
Date: September 3rd, 2019

Goal of program: Modified version of chaser by Dr. Pippin Bar
The concept explored in this game is the original relation between man and woman
within the theological framework of the acclaimed Theology of the Body by Saint John Paul II.

Twists: You can eat the forbidden fruit. Or...

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.
*/

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
let playAsAdam = false;
let playAsEve = false;

// Track whether the game is over
let gameOver = false;

// Screen management related
let scenes;
let changeSceneThresholdX = 50;
let changeSceneThresholdY = 50;

// Heart pic for prefallen state
let heartPic;

// Forbidden fruit
let forbiddenFruit;

// Grass for the grass generator function
let grass;
const MAX_GRASS = 25;
// Grow an array of grass
let grassPatches = [MAX_GRASS];

// Random positions for the grass
let randomPosX;
let randomPosY;
let randWidth;
let randHeight;

// Player's chosen gender, position, radii, velocity and max speed
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

// otherGender's position, radii, velocity and max speed
let otherGenderX;
let otherGenderY;
let otherGenderRadius = 25;
let otherGenderVX;
let otherGenderVY;
let otherGenderMaxSpeed = 4;

// otherGender's health and max health
let otherGenderHealth;
let otherGenderMaxHealth = 100;

// otherGender fill color
let otherGenderFill = 255;

// Perlin noise time values
let tx = 1;
let ty = 1;

// Amount of health obtained per frame of "eating" (overlapping) the otherGender
let eatHealth = 10;
// Number of otherGender eaten during the game (the "score")
let otherGenderEaten = 0;

// Custom fonts
let amaticSCFont;
let mountainsOfChristmasFont;

// Sounds
let contactSound;
let backgroundMusic;

// Sprites for Adam and Eve used for animation
let adamIdle;
let adamLeft;
let adamRight;

let eveIdle;
let eveLeft;
let eveRight;

/**
  Preloads the heart picture, and the custom fonts.

*/
function preload() {
  grass = loadImage("assets/images/grass.png");
  heartPic = loadImage('assets/images/heart.png');
  amaticSCFont = loadFont('assets/fonts/AmaticSC-Regular.ttf');
  mountainsOfChristmasFont = loadFont('assets/fonts/MountainsofChristmas-Regular.ttf');
  contactSound = loadSound("assets/sounds/contactSound.wav");
  backgroundMusic = loadSound("assets/sounds/invisible0W31m.mp3");
  adamIdle = loadImage("assets/images/adamIdle.png");
  adamLeft = loadImage("assets/images/adamLeft.png");
  adamRight = loadImage("assets/images/adamRight.png");
  eveIdle = loadImage("assets/images/eveIdle.png");
  eveLeft = loadImage("assets/images/eveLeft.png");
  eveRight = loadImage("assets/images/eveRight.png");
  forbiddenFruit = loadImage("assets/images/forbiddenFruit.png");
}

/**
  Sets up the basic elements of the game

*/
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

  // Create the game's canvas
  noStroke();
  setupOtherGender();
  setupPlayer();

  playIntroduction = true;
  prefallenState = true;
  tx = 0.0001
  ty = 0.0001;

  backgroundMusic.loop();
}

/**
  Play as Adam. Being used by default for now.

*/
function bootAdam() {
  playAsAdam = true;

}

/**
  Play as Eve. Not implemented yet.

*/
function bootEve() {
  playAsEve = true;

}

/**
  Initialises the other Gender's position, velocity, and health

*/
function setupOtherGender() {
  otherGenderX = width / 5;
  otherGenderY = height / 2;
  otherGenderVX = -otherGenderMaxSpeed;
  otherGenderVY = otherGenderMaxSpeed;
  otherGenderHealth = otherGenderMaxHealth;
}

/**
  Initialises player position and health

*/
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

/**
  Draw the canvas elements.

*/
function draw() {
  // Play the intro
  if (playIntroduction === true) {
    playIntroduction = false;
    nextScene();
  }

  // The last intro scene is intro3, so we play the game when it's played
  if (!gameOver && playedIntro3 === true) {
    goToScene(currentScene); // Regenerate the scene's details
    movePlayer();
    checkPlayerChangedScene(currentScene);

    if (prefallenState) {
      beAttractedToPlayer();
      manageCollisionEvents();
    } else {
      moveotherGender();
      updateHealth();
      checkEating();
    }

    drawOtherGender();
  } else if (gameOver) {
    showGameOver();
  }
  handleInput();
}

/**
  This built-in function ensures that the key pressed boolean is only returned once.

*/
function keyPressed() {
  if (keyCode === ENTER && currentScene === "intro1" || currentScene === "intro2" || currentScene === "intro3") { // Change scene with Enter if you're still in the intro scenes
    if (sceneQueue.isEmpty()) {
      return;
    } else {
      //console.log("Enter pressed... going to the next scene.");
      clear();
      nextScene();
    }
  }
}

/**
  Checks arrow keys and adjusts player velocity accordingly

*/
function handleInput() {
  let maxBoostedSpeed = playerMaxSpeed * 10;
  imageMode(CENTER);
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW) && keyIsDown(SHIFT)) {
    playerVX = constrain(playerMaxSpeed, -maxBoostedSpeed, -maxBoostedSpeed);
    image(adamLeft, playerX, playerY, playerRadius * 10);
  } else if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
    image(adamLeft, playerX, playerY, playerRadius * 5);
  } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(SHIFT)) {
    playerVX = constrain(playerMaxSpeed, maxBoostedSpeed, maxBoostedSpeed);
    image(adamRight, playerX, playerY, playerRadius * 10);
  } else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
    image(adamRight, playerX, playerY, playerRadius * 5);
  }
  // Check for vertical movement
  else if (keyIsDown(UP_ARROW) && keyIsDown(SHIFT)) {
    playerVY = constrain(playerMaxSpeed, -maxBoostedSpeed, -maxBoostedSpeed);
    image(adamIdle, playerX, playerY, playerRadius * 5);
  } else if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
    image(adamIdle, playerX, playerY, playerRadius * 5);
  } else if (keyIsDown(DOWN_ARROW) && keyIsDown(SHIFT)) {
    playerVY = constrain(playerMaxSpeed, maxBoostedSpeed, maxBoostedSpeed);
    image(adamIdle, playerX, playerY, playerRadius * 5);
  } else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
    image(adamIdle, playerX, playerY, playerRadius * 5);
  } else {
    image(adamIdle, playerX, playerY, playerRadius * 5);
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
      playedIntro1 = true;
      break;
    case "intro2":
      textContent = "\“It is not good for the man to be alone.\n I will make a helper suitable for him.\"\n\nGenesis 2:18";
      makeScene(scene, introBgColor, 42, 255, textContent, 30, height / 2, false, nbActors);
      textSize(42);
      text("Press Enter to continue.", 30, height / 1.2);
      playedIntro2 = true;
      break;
    case "intro3":
      textContent = "\"Then the Lord God made a woman from the rib\nhe had taken out of the man,\nand he brought her to the man...\"\n\nGenesis 2:22";
      makeScene(scene, introBgColor, 42, 255, textContent, 30, height / 2, false, nbActors);
      textSize(42);
      text("Press Enter to continue.", 30, height / 1.2);
      // Call the gameplay scene after 3 seconds to avoid skipping the intro3 scene
      setTimeout(
        function() {
          //console.log("Waiting 3 seconds");
          playedIntro3 = true
        }, 3000);
      break;
    case "eden1":
      textContent = "Garden of Eden 1.\n\n\"The man said,\nThis is now bone of my bones and flesh of my flesh;\nshe shall be called  \'woman\' for she was\ntaken out of man.\"\n\nGenesis 2:23";
      makeScene(scene, edenBgColor, 42, 0, textContent, 30, height / 7, false, nbActors);
      break;
    case "eden2":
      textContent = "Garden of Eden 2.";
      makeScene(scene, 195, 42, 255, textContent, 30, height / 7, false, nbActors);
      break;
    case "eden3":
      textContent = "Garden of Eden 3.\n\n\"Adam and his wife were both naked, and they felt no shame.\"\n\nGenesis 2:25";
      makeScene(scene, 145, 42, 255, textContent, 30, height / 7, false, nbActors);
      break;
    case "forbiddenFruitScene":
      textContent = "The Forbbiden Fruit.\n\n\"When the woman saw that the fruit of the tree was good \nfor food and pleasing to the eye, and also desirable\nfor gaining wisdom, she took some and ate it.\nShe also gave some to her husband,\nwho was with her, and he ate it.\"\n\nGenesis 3:6";
      makeScene(scene, 45, 42, 255, textContent, 30, height / 7, true, nbActors);
      break;
    case "playgrounds1":
      textContent = "\"You will not surely die (...).\nFor God knows that when you eat\nof it your eyes will be opened,\nand you will be like God,\nknowing good and evil.\"\n\nGenesis 3:5";
      textContent += "\n\n\"Then the eyes of both of them were opened,\nand they realized they were naked;\nso they sewed fig leaves together\nand made coverings for themselves.\"\n\nGenesis 3:7";
      makeScene(scene, 45, 42, 255, textContent, 30, height / 7, true, nbActors);
      break;
    default:
      break;
  }
}

/**
  Manages changing scenes depending on defining canvas boundaries according to
  cardinal directions.

*/
function sceneExit(direction) {
  let currX = playerX;

  switch (direction) {
    case "LEFT":
      if ((playerX - playerRadius) <= (0 + changeSceneThresholdX)) {
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
        nextScene();
      }
      break;
    case "DOWN":
      if ((playerY - playerRadius) >= (height - changeSceneThresholdY)) {
        nextScene();
      }
      break;
    default:
      break;
  }
}

/**
  Checks if the player changed scenes--if the player has touched
  an edge of the canvas. Starting from the forbiddenFruitScene, the next scene is
  changed depending on player's health. Conceptually, this change is supposed to mean
  something about the decay factor being a perpetual threat in human relationships
  after the fall (lust over love).

*/
function checkPlayerChangedScene(currentScene) {
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

/**
  Updates player position based on velocity,
  wraps around the edges. if in prefallen state (before eating the forbidden fruit)

*/
function movePlayer() {
  screenWarping("player");
  playerX += playerVX;
  playerY += playerVY;
}

/**
  Updates the health of the player in the fallen state (after the forbiddenFruitScene,
  when the forbidden fruit was eaten).

*/
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
  Mirror function of checkEating(). If in prefallenState, play a contact sound, and uh... add a heart picture above man and woman
  upon collision. Also sets the fallen state to true.

*/
function manageCollisionEvents() {
  if (!prefallenState) {
    return;
  }
  let d = dist(playerX, playerY, otherGenderX, otherGenderY);

  if (d < playerRadius + otherGenderRadius) {
    contactSound.play();
    clear();
    push();
    background(175, 0, 0, 100); // Turn the background into intimate scarlet
    imageMode(CENTER);
    image(heartPic, playerX + playerRadius * random(0, 5), playerY - playerRadius * random(0, 5), 100, 100);
    image(heartPic, playerX - playerRadius * random(0, 5), playerY - playerRadius * random(0, 5), 100, 100);
    image(heartPic, playerX + playerRadius * random(0, 5), playerY - playerRadius * random(0, 5), 100, 100);
    pop();

    addSceneCaptions();
    triggerFallenState();
  }
}

/**
  Triggers the fallen state if the player is in the forbiddenFruitScene.

*/
function triggerFallenState() {
  if (currentScene === "forbiddenFruitScene") {
    prefallenState = false;
  }
}

/**
  Adds caption as per the current scene.

*/
function addSceneCaptions() {
  push();
  fill(255);
  textSize(42);

  let theSnake;
  let caption;

  switch (currentScene) {
    case "eden1":
      theSnake = "(You hear a hiss...) \"I imagine you don't get to do much all day,\nstuck out like that.\"";
      caption = "(Get to the bottom by pressing shift to sprint.)";
      break;
    case "eden2":
      theSnake = "Ah, she came anyways?\n Well, what can you do right?\n I guess we can all still be friends.\n";
      break;
    case "eden3":
      theSnake = "\"Did God really say,\n\`You must not eat from any tree in the garden\'?\"";
      break;
    default:
      break;
  }
  textFont(mountainsOfChristmasFont);
  text(theSnake, 50, height / 1.5);
  text(caption, width / 7, height / 1.2);
  pop();
}

/**
  if not in prefallenstate, check if the player overlaps the otherGender and updates health of both.

*/
function checkEating() {
  if (prefallenState) {
    return; // because they are one flesh already
  }
  let d = dist(playerX, playerY, otherGenderX, otherGenderY);

  if (d < playerRadius + otherGenderRadius) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the otherGender health
    otherGenderHealth = otherGenderHealth - eatHealth;
    // Constrain to the possible range
    otherGenderHealth = constrain(otherGenderHealth, 0, otherGenderMaxHealth);

    // Check if the otherGender died (health 0)
    if (otherGenderHealth === 0) {
      // Move the "new" otherGender to a random position
      otherGenderX = random(0, width);
      otherGenderY = random(0, height);
      // Give it full health
      otherGenderHealth = otherGenderMaxHealth;
      // Track how many otherGender were eaten
      otherGenderEaten = otherGenderEaten + 1;
    }
  }
}

/**
  Move Eve or move Adam pre-fallen state. Natural attraction to each other,
  based on the other's position. Should be disabled during the forbiddenFruitScene.

*/
function beAttractedToPlayer() {
  if (currentScene === "forbiddenFruitScene") {
    return;
  }
  // calculate something around the player's x, y
  // get the current distance from the player
  let playerPosX = playerX;
  let playerPosY = playerY;

  const minDistance = 20;
  const maxDistance = minDistance / 2; // don't get closer than half of the min distance

  let currentDistance = dist(playerPosX, otherGenderX, playerPosY, otherGenderY);
  // while it is greater than half of the distance
  if (currentDistance >= minDistance) {
    // Advance to the one-seventh of a distance
    otherGenderVX = currentDistance / 7;
    otherGenderVY = currentDistance / 7;

    // Update otherGender position to go towards the player depending on the distance
    // relative to the player at each successive call of this function
    if (otherGenderX < playerX) {
      otherGenderX += otherGenderVX * 0.10;
    } else {
      otherGenderX -= otherGenderVX * 0.10;
    }
    if (otherGenderY < playerY) {
      otherGenderY += otherGenderVY * 0.10;
    } else {
      otherGenderY -= otherGenderVY * 0.10;
    }
  }
  screenWarping("nonplayer");
}


/**
  Moves the otherGender based on random velocity changes

*/
function moveotherGender() {
  otherGenderVX = map(noise(tx), 0, 1, -otherGenderMaxSpeed, otherGenderMaxSpeed);
  otherGenderVY = map(noise(ty), 0, 1, -otherGenderMaxSpeed, otherGenderMaxSpeed);;
  otherGenderX += otherGenderVX;
  otherGenderY += otherGenderVY;

  screenWarping("nonplayer");

  tx += 0.01;
  ty += 0.01;
}

/**
  Screen warping; according to if it is called for the player or the AI

*/
function screenWarping(actor) {
  if (actor === "nonplayer") { // For the opposite gender and other life forms
    if (otherGenderX <= 0) {
      otherGenderX = otherGenderX + width;
    } else if (otherGenderX >= width) {
      otherGenderX = otherGenderX - width;
    }
    if (otherGenderY <= 0) {
      otherGenderY = otherGenderY + height;
    } else if (otherGenderY >= height) {
      otherGenderY = otherGenderY - height;
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

/**
  Draws the opposite gender.

*/
function drawOtherGender() {
  if (prefallenState) {
    push();
    image(eveIdle, otherGenderX, otherGenderY, otherGenderRadius * 5);
    pop();
  } else {
    image(eveIdle, otherGenderX, otherGenderY, otherGenderRadius * 5, otherGenderHealth);
  }
}

/**
  Shows the game over screen.

*/
function showGameOver() {
  push();
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);

  let gameOverText = "GAME OVER\n";
  gameOverText = gameOverText + "Your lust gave way " + otherGenderEaten + " for Eve'\n";
  gameOverText = gameOverText + "before you died."

  text(gameOverText, width / 2, height / 2);
  pop();
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

  if(currentScene === "intro1" || currentScene === "intro2" || currentScene === "intro3" ) {
    fill(255);
    textSize(42);
    text("Press Enter to continue.", 30, height / 1.2);
  }
  // Grass growing -- Not fully implemented yet
  // grassGenerator();

  // The animation for the forbiddenFruitScene
  if (actorsPresent && currentScene === "forbiddenFruitScene") {
    // spawn actors (ellipses for now)
    let actors = [nbActors];
    // Take control of Eve and animate her...
    // Prevent her from being attracted to player
    // Place Eve at the top center of the Scene
    otherGenderX = width / 2;
    // Increment her Y by +1 each call if has not reached center yet
    if (otherGenderY <= height / 2) {
      otherGenderY++;
    } else {
      otherGenderY = height / 2;
    }
    // Draw the forbidden fruit.
    push();
    fill(255, 0, 0);
    imageMode(CENTER);
    image(forbiddenFruit, width / 2, height / 2, 85, 85);
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
  peek() {
    return this.items[this.items.length - 1];
  }
}

/**
  Resets random positions used for generating the herb in the scenes.

*/
let grassClock = setInterval(resetRandomPositions, 5000);

function resetRandomPositions() {
  randomPosX = random(0, height);
  randomPosY = random(0, width);
  randWidth = random(grass.width, grass.width + 3);
  randHeight = random(grass.height, grass.height + 3);

  for(let i = 0; i <= MAX_GRASS; i++) {
    grassPatches[i].grow();
  }
}

/**
 Spawn and move a new grass sprout every 3 seconds

*/
function grassGenerator() {

  let newGrassPatch;

  for(let i = 0; i <= MAX_GRASS; i++) {
    newGrassPatch = new Grass(randomPosX, randomPosY, grass.width);
    grassPatches[i] = newGrassPatch;
  }

  // Moves the grass randomly on the x-axis
  for(let j = 0; j <= MAX_GRASS; j++) {
    grassPatches[j].decalX(random(0, 1));
  }
}

/**
  The Grass object class.

*/
class Grass {
    constructor(x, y, w) {
      this.x = x;
      this.y = y;
      this.w = w;
    }

    /**
      Should move left and right every second... Not fully implemented yet.

    */
    decalX(randomDirection){
      if(randomDirection == 0) {
        setTimeout(image(grass, this.x += 50, this.y, this.w), 1000);
        setTimeout(image(grass, this.x -= 50, this.y, this.w), 1000);
      } else {
        setTimeout(image(grass, this.x -= 50, this.y, this.w), 1000);
        setTimeout(image(grass, this.x += 50, this.y, this.w), 1000);
      }
    }

    /**
      Displays the grass.

    */
    grow() {
      imageMode(CENTER);
      image(grass, this.x, this.y, this.w);
    }
}

/**
  Not implemented yet. For extension...
  Scene creator class.

*/
// class Scene {
//   constructor(bgColor, actors, animals, environment, props, maxObjects, cinematic) {
//     this.bgColor = bgColor;
//     this.actors = actors;
//     this.animals = animals;
//     this.environment = environment;
//     this.props = props;
//     this.maxObjects = maxObjects;
//     this.cinematic = cinematic;
//   }
//
//   makeScene() {
//
//   }
//
//   initScene() {
//
//   }
//
//   generateActors(playerGender, sceneType, forbiddenFruitState) {
//     // Spawn the gender that the player has not picked
//
//     // Checks if the scene type is a cinematic or game scene
//     // Predisposition according to whether the forbidden fruit has been consummed
//   }
// }
//
// /**
//   Actor class
//   Not implemented yet. For extension...
//
// */
// class Actor {
//   constructor(actorType, width, height, speed) {
//     this.actorType = actorType;
//     this.width = width;
//     this.height = height;
//     this.speed = speed;
//   }
//
//   makeActor() {
//     // if(this.actorType === "animal") {
//     //
//     // }
//   }
//
//   /**
//     Make a random shape for the animal
//   */
//   makeAnimalTemplate() {
//     rectMode(CENTER);
//     rect(random(0, 100), random(0, 100), random(50, 100), random(50, 100));
//   }
// }

// /**
//   Not implemented yet.
//   Makes babies according to the specified amount to output.
//   The location and specifics of each newborn is random based.
//
// */
// function makeBabies(nbActors) {
//   let actors = {};
//   let lifeStream = new Queue();
//
//   for (let i = 0; i <= nbActors; i++) {
//     let randomPosX = random(0, height);
//     let randomPosY = random(0, width);
//     let randWidth = random(playerRadius, playerRadius * 3);
//     let randHeight = random(playerRadius, playerRadius * 3);
//
//     //spawn each actor
//     fill(random(0, 255), random(0, 255), random(0, 255));
//     //ellipse(playerX, playerY, playerRadius * 2);
//     let newBorn = ellipse(randomPosX, randomPosY, randWidth, randHeight);
//     fill(255);
//     text("I am one", randomPosX, randomPosY, randWidth - randomPosX, randHeight - 30);
//     lifeStream.enqueue(newBorn);
//   }
//
//   while (lifeStream.isEmpty() === false) {
//     lifeStream.dequeue();
//   }
// }
