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
  decayMemory();
  if(numberOfClicksOverPortrait >= 6) {
    push();
    background(0);
    fill(255);
    textSize(42);
    text("I was at the mall.", width/1.5, height/2);
    pop();
  }
}

/**
  mousePressed()
  @no custom args (has a default event arg)
  @Listens to mouse presses on canvas.
*/
function mousePressed() {
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
      push();
      fill(0);
      rect(openContextMenuButtonX - 300, openContextMenuButtonHeight, 600, 300);
      fill(255);
      textSize(45);
      text("Close your eyes for a second.", openContextMenuButtonX - 300, openContextMenuButtonHeight + 125);
      pop();
    }
    else {
      push();
      fill(255,255,255);
      rect(openContextMenuButtonX - 300, openContextMenuButtonHeight, 600, 300);
      pop();
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
  push();
  // The UI at the top.
  fill(0);
  rect(0,0,width,100);
  fill(64,224,208);
  rect(width-150,0,150,100);
  pop();
  // Psychologist's instructions
  push();
  fill(255);
  textSize(35);
  text("instructions", openContextMenuButtonX + 10, 50);
  // State text
  textSize(60);
  text("This is my Allison.\nShe was... four years\nold at the time.", width/2, 200);
  pop();
  // Decay effect using blur, gray and dilate filters.
  push();
  filter(BLUR);
  filter(GRAY);
  filter(DILATE);
  pop();
  // UI text prompt
  push();
  fill(255,0,0);
  textSize(42);
  if(numberOfClicksOverPortrait <= 3) {
    text("Keep clicking\non the picture\nto recall the memory.", width/1.5,height/2);
    text("Number of recalls. " + numberOfClicksOverPortrait, width/1.5,height/1.2);
  }
  else if(numberOfClicksOverPortrait <= 6) {
    text("That's good.\nYou're doing great.\nKeep it up.", width/1.5,height/2);
    text("Number of recalls. " + numberOfClicksOverPortrait, width/1.5,height/1.2);
  }
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
