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
//
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
  // TODO separate idea of decay from UI display
  // to another layer using createGraphics
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
    }
  }
  else if(currentState === "AzayashiMall" && readyState) {
    background(255);
    push();
    fill(0, 0, 0);
    rect(width/2, height/2, 300, 300);
    pop();
    displayPortrait(allison);
    displayUI();
  }
}

/**
  mousePressed()
  @no custom args (has a default event arg)
  @Listens to mouse presses on canvas.
*/
function mousePressed() {
  if(currentState === "introduction") {
    if(mouseOverPortrait()) {
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
        let message = null;
        if(numberOfClicksOverPortrait <= 3) {
          message = "Keep clicking\non the picture\nto recall\nthe memory.";
        }
        else if(numberOfClicksOverPortrait <= 6) {
          message = "That's good.\nYou're doing great.\nKeep it up.";
        }
        createContextMenu(message);
      }
      else {
        push();
        fill(255,255,255);
        rect(openContextMenuButtonX - 300, openContextMenuButtonHeight, 600, 300);
        pop();
      }
    }
  }
  else if(currentState === "AzayashiMall") {
    readyState = true;
    console.log("Click to move.");
    push();
    fill(0);
    textSize(42);
    text("Click to move.", width/2,height/2);
    pop();
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

  displayUI();
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
  push();
  // The UI at the top.
  fill(0);
  rect(0,0,width,100);
  fill(64,224,208);
  rect(width-150,0,150,100);
  pop();

  // Psychologist's Instructions
  push();
  fill(0);
  textSize(35);
  text("Instructions", openContextMenuButtonX + 10, 50);
  pop();
}

/**
  createContextMenu()
  @arg: message.
    The string to be passed as the first argument of text().
  @Displays Displays the context menu at the top.
*/
function createContextMenu(message) {
  push();
  fill(0);
  rect(openContextMenuButtonX - 300, openContextMenuButtonHeight, 600, 300);
  textSize(45);
  fill(255);
  text(message, openContextMenuButtonX - 250, openContextMenuButtonHeight + 50);
  pop();
}

/**
  updateClickCounter()
  @arg: none.
  @Displays the click counter for this state. TODO pass parameters for other scenes.
*/
function updateClickCounter() {
  push();
  textSize(42);
  fill(255);
  text("Number of recalls: " + numberOfClicksOverPortrait, 100, 50);
  pop();
}
