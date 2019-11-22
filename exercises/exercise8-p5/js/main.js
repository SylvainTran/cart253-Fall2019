"use strict";
/**
  Melansuko: The Decades Day Album
  Author: Sylvain Tran

  @Goals of program:

  @Extend basics of arrays and trigonometry.
  @Explore the meaning of relationships of visual outputs
    through a basic story.
  @Take some things learned from Phaser.js and P2 and incorporate
    some complex ideas using other libraries.
  @Simplify my code and use more robust designs.

*/
let states = {};
let gameCanvas;
let zeyadaType;
//
let allison;
const openContextMenuButtonX = 850;
const openContextMenuButtonHeight = 100;
let clickedOnMenuButton = false;
// The counter for how many recalls the main character has attempted
let numberOfClicksOverPortrait = 0;
// Current State
let currentState = "introduction";
// Whether to begin drawing the new state
let readyState = false;
// The UI Layer
let UILayer;
let contextMenuDisplayed = false;
let message = null;
let inputKeys = {
  "LEFT": 37,
  "RIGHT": 39
};
let leftKeyPressed = 0;
let rightKeyPressed = 0;

/**
  preload()
  @no custom args.
  @Preload images and sounds needed.
*/
function preload() {
  allison = loadImage("assets/images/Allison-0001_c1.png");
  zeyadaType = loadFont("assets/fonts/Zeyada-Regular.ttf");
}

/**
  setup()
  @no custom args.
  @Creates canvas and appends it to the game container.
  @Initializes the game states.
  @Creates a new StateSystem and pass it the states/scenes.
  Creates the StateSystem subsystems next, then display the
  portrait of Allison.
*/
function setup() {
  gameCanvas = createCanvas(1000, 1000);
  gameCanvas.parent('gameCanvas');
  UILayer = createGraphics(1000, 200);
  states =
  {
    "AzayashiMall": new AzayashiMall()
  };
  StateSystem = new StateSystem(states);
  StateSystem.createSubSystems();
  displayPortrait(allison);
}

/**
  draw()
  @no custom args.
  @Render each frame.
*/
function draw() {
  // Display the elements of the UI
  displayUI();
  if(currentState === "introduction") {
    decayMemory();
    updateClickCounter();
    if(numberOfClicksOverPortrait >= 6) {
      currentState = "AzayashiMall";
      push();
      background(0);
      fill(255);
      textSize(42);
      text("I was at the mall.", width/1.5, height/2);
      pop();
      resetNumberOfClicks(); // Reset the number of clicks for the next state
    }
  }
  else if(currentState === "AzayashiMall" && readyState) {
    background(255);
    push();
    fill(0, 0, 0);
    rect(width/2, height/2, 300, 300);
    pop();
    displayPortrait(allison);
    push();
    fill(255);
    textSize(42);
    text("Click the mall's door to continue.", width/2,height/2);
    pop();
  }

  // Render the UI layer
  image(UILayer,0,0,1000,200);
}

/**
  mousePressed()
  @no custom args (has a default event arg)
  @Listens to mouse presses on canvas.
*/
function mousePressed() {
  if(currentState === "introduction") {
    if(mouseOverPortrait()) {
      contextMenuDisplayed = false;
      ++numberOfClicksOverPortrait;
      console.log("Number of clicks: " + numberOfClicksOverPortrait);
      push();
      clear();
      console.log("Clicking over portrait.");
      imageMode(CENTER);
      image(allison, 300, 540, allison.width, allison.height);
      pop();
    }
    if(mouseOverUIButton()) {
      console.log("Clicking over menu button.");
      clickedOnMenuButton = !clickedOnMenuButton;
      if(clickedOnMenuButton) {
        // UI text prompt
        if(numberOfClicksOverPortrait <= 3) {
          message = "Keep clicking on the picture to recall\nthe memory.";
        }
        else if(numberOfClicksOverPortrait <= 6) {
          message = "That's good. You're doing great.";
        }
        createContextMenu(message);
      }
    }
    else {
      contextMenuDisplayed = false;
    }
    if(!contextMenuDisplayed) {
      clearContextMenu();
    }
  }
  else if(currentState === "AzayashiMall") {
    readyState = true;
    if(mouseOverUIButton()) {
      clickedOnMenuButton = !clickedOnMenuButton;
      if(clickedOnMenuButton) {
        // UI text prompt
        if(numberOfClicksOverPortrait <= 3) {
          message = "Find out what happened to your parents.";
        }
        else if(numberOfClicksOverPortrait <= 6) {
          message = "Keep trying.";
        }
        createContextMenu(message);
      }
      else {
        contextMenuDisplayed = false;
      }
      if(!contextMenuDisplayed) {
        clearContextMenu();
      }
    }
  }
}

/**
  decayMemory()
  @no custom args.
  @Uses filter effects to induce a decay effect on displayed
  text, image and "UI".
*/
function decayMemory() {
  textFont(zeyadaType);
  // Decay effect using blur, gray and dilate filters.
  push();
  filter(BLUR);
  filter(GRAY);
  filter(DILATE);
  pop();

  // State text
  push();
  textSize(60);
  fill(0);
  textSize(42);
  text("This is my Allison.\nShe was... four years\nold at the time.", width/1.44, 600);
  pop();
}

/**
  mouseOverUIButton()
  @no custom args.
  @Checks if the mouse is hovering over the
  turquoise UI button at the top right. Returns the
  state as a result.
*/
function mouseOverUIButton() {
  let state = false;
  if(mouseX >= openContextMenuButtonX && mouseX <= width && mouseY >= 0 && mouseY <= openContextMenuButtonHeight){
    state = true;
  }
  return state;
}

/**
  mouseOverPortrait()
  @no custom args.
  @Checks if the mouse is hovering over the
  current state's portrait (always fixed position).
  Returns the state as a result.
*/
function mouseOverPortrait() {
  let state = false;
  const portraitX = 0 + 300;
  const portraitY = 250;
  if(mouseX >= 0 && mouseX <= portraitX + 300 && mouseY >= portraitY && mouseY <= height){
    state = true;
  }
  return state;
}

/**
  displayPortrait()
  @arg: character
    The cached image to display.
  @Displays the character image provided as an argument
  at the portrait's default x, y positions.
*/
function displayPortrait(character) {
  let portraitDefaultX = 300;
  let portraitDefaultY = 540;
  push();
  imageMode(CENTER);
  image(character, portraitDefaultX, portraitDefaultY, character.width, character.height);
  pop();
}

/**
  displayUI()
  @args: none.

  @Displays the UI images provided at the specified x, y positions.
*/
function displayUI() {
  UILayer.push();
  // The UI at the top.
  UILayer.fill(0);
  UILayer.rect(0,0,width,100);
  UILayer.fill(64,224,208);
  UILayer.rect(width-150,0,150,100);
  UILayer.pop();

  // Psychologist's Instructions
  UILayer.push();
  UILayer.fill(0);
  UILayer.textSize(25);
  UILayer.text("Instructions", openContextMenuButtonX + 10, 50);
  UILayer.pop();
}

/**
  createContextMenu()
  @arg: message.
    The string to be passed as the first argument of text().
  @Displays Displays the context menu at the top.
*/
function createContextMenu(message) {
  contextMenuDisplayed = true;
  UILayer.push();
  UILayer.fill(0);
  UILayer.rect(openContextMenuButtonX - 300, openContextMenuButtonHeight, 600, 200);
  UILayer.textSize(25);
  UILayer.fill(255);
  UILayer.text(message, openContextMenuButtonX - 295, openContextMenuButtonHeight + 50);
  UILayer.pop();
}

/**
  updateClickCounter()
  @arg: none.
  @Displays the click counter for this state. TODO pass parameters for other scenes.
*/
function updateClickCounter() {
  UILayer.push();
  UILayer.textSize(42);
  UILayer.fill(255);
  UILayer.text("Number of recalls: " + numberOfClicksOverPortrait, 100, 50);
  UILayer.pop();
}

/**
  resetNumberOfClicks()
  @arg: none.
  @Resets the click counter for this state.
*/
function resetNumberOfClicks() {
  numberOfClicksOverPortrait = 0;
}

/**
  clearContextMenu()
  @arg: none.
  @Clears the context menu.
*/
function clearContextMenu() {
  UILayer.push();
  UILayer.background(255);
  UILayer.pop();
}

/**
  keyPressed()
  @arg: no custom args.
  @Handles key pressed.
*/
function keyPressed() {
  if(keyCode === inputKeys.LEFT) {
    leftKeyPressed++;    
    push();
    fill(255, 0, 0);
    rect(0, 540, allison.width, allison.height);
    pop();
    console.log(leftKeyPressed);
  }
  else if(keyCode === inputKeys.RIGHT) {
    rightKeyPressed++;
    push();
    fill(0, 255, 0);
    rect(0, 540, allison.width, allison.height);
    pop();
    console.log(rightKeyPressed);
  }
}

