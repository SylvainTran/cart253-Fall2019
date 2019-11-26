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
let stateConfig, stateData0, stateData1, stateData2, stateData3, stateData4;
let gameCanvas;
let zeyadaType, AntonRegularType;
let allison, allisonMall;
let UILayer;
let inputKeys = {
  "LEFT": 37,
  "RIGHT": 39,
  "ENTER": 13
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
  allisonMall = loadImage("assets/images/Allison-0002-AMall-FX.png");
  zeyadaType = loadFont("assets/fonts/Zeyada-Regular.ttf");
  AntonRegularType = loadFont("assets/fonts/Anton-Regular.ttf");
  stateConfig = loadJSON("data/states/stateConfig.json");
  stateData0 = loadJSON("data/states/stateData/stateData0.json");
  stateData1 = loadJSON("data/states/stateData/stateData1.json");
  stateData2 = loadJSON("data/states/stateData/stateData2.json");
  stateData3 = loadJSON("data/states/stateData/stateData3.json");
  stateData4 = loadJSON("data/states/stateData/stateData4.json");
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
    "Tutorial": new Tutorial(stateConfig, stateData1, UILayer, allison),
    "Introduction": new Introduction(stateConfig, stateData2, UILayer, allison),
    "AzayashiMall": new AzayashiMall(stateConfig, stateData3, UILayer, allisonMall),
    "HighSchool": new HighSchool(stateConfig, stateData4, UILayer, allison)
  };
  StateSystem = new StateSystem(states, UILayer, stateConfig, allison);
  StateSystem.createSubSystems();
  StateSystem.StateParticles.displayPortrait();
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
  @no custom args (has a default callback arg)
  @Listens to mouse presses on canvas. Activates the current state's updateClicks() function,
    which has its own callback function to request an update of the click counter in the UISystem.
  This current state should always be up to date due to the StateSystem's own update function.
*/
function mousePressed() {
  if(StateSystem.UISystem.mouseOverPortrait()) {
    StateSystem.states[StateSystem.currentStateTag].updateClicks(StateSystem.UISystem.updateClickCounter());
  }
  if(StateSystem.UISystem.mouseOverUIButton()) {
    StateSystem.UISystem.updateStateInstructions();
  }
  else {
    StateSystem.UISystem.clearContextMenu();
  }
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
