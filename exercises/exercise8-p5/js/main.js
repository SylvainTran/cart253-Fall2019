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
let stateConfig, stateData0, stateData1, stateData2;
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
  allison = loadImage("assets/images/duckguy.jpg");
  zeyadaType = loadFont("assets/fonts/Zeyada-Regular.ttf");
  stateConfig = loadJSON("data/states/stateConfig.json");
  stateData0 = loadJSON("data/states/stateData/stateData0.json");
  stateData1 = loadJSON("data/states/stateData/stateData1.json");
  stateData2 = loadJSON("data/states/stateData/stateData2.json");
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
    "Introduction": new Introduction(stateConfig, stateData2)
  };
  StateSystem = new StateSystem(states, UILayer, stateConfig);
  StateSystem.createSubSystems();
  displayPortrait(allison);
}

/**
  draw()
  @no custom args.
  @Render each frame.
*/
function draw() {
  StateSystem.updateSystems();
  image(UILayer,0,0,1000,200);
}

/**
  mousePressed()
  @no custom args (has a default event arg)
  @Listens to mouse presses on canvas.
*/
function mousePressed() {
  StateSystem.states[StateSystem.currentStateTag].updateState();
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
