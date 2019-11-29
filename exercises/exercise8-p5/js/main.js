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

  Music:
  https://opengameart.org/content/chill-lofi-inspired
  Voices:
  https://opengameart.org/content/voiceover-pack-40-lines
*/
let states = {};
let stateConfig, stateData0, stateData1, stateData2, stateData3, stateData4, stateData5, stateData6, stateData7, stateData8;
let gameCanvas;
let zeyadaType, AntonRegularType;
let allison, allisonMall, allisonHighSchool, duckguy;
let moveableAllison, oldAllison;
let cloudsPlatformerBg;
let UILayer;
let inputKeys = {
  "LEFT": 37,
  "RIGHT": 39,
  "ENTER": 13
};
let leftKeyPressed = 0;
let rightKeyPressed = 0;
let ChillLofiR; // Chill lofi song
let readyVoice;
let congratulations;
let go;
/**
  preload()
  @no custom args.
  @Preload images and sounds needed.
*/
function preload() {
  duckguy = loadImage("assets/images/duckguy.jpg");
  allison = loadImage("assets/images/Allison-0001-FourYears-FX.png");
  allisonMall = loadImage("assets/images/Allison-0002-AMall-FX.png");
  allisonHighSchool = loadImage("assets/images/Allison-0003-HighSchool-FX.png");
  oldAllison = loadImage("assets/images/old-allison.gif");
  cloudsPlatformerBg = loadImage("assets/images/cloudsPlatformerBg.png");
  zeyadaType = loadFont("assets/fonts/Zeyada-Regular.ttf");
  AntonRegularType = loadFont("assets/fonts/Anton-Regular.ttf");
  stateConfig = loadJSON("data/states/stateConfig.json");
  stateData0 = loadJSON("data/states/stateData/stateData0.json");
  stateData1 = loadJSON("data/states/stateData/stateData1.json");
  stateData2 = loadJSON("data/states/stateData/stateData2.json");
  stateData3 = loadJSON("data/states/stateData/stateData3.json");
  stateData4 = loadJSON("data/states/stateData/stateData4.json");
  stateData5 = loadJSON("data/states/stateData/stateData5.json");
  stateData6 = loadJSON("data/states/stateData/stateData6.json");
  stateData7 = loadJSON("data/states/stateData/stateData7.json");
  stateData8 = loadJSON("data/states/stateData/stateData8.json");
  ChillLofiR = loadSound("assets/sounds/ChillLofiR.mp3");
  readyVoice = loadSound("assets/sounds/ready.ogg");
  congratulations = loadSound("assets/sounds/congratulations.ogg");
  go = loadSound("assets/sounds/go.ogg");
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
    "BetweenLifeSlicesA": new BetweenLifeSlicesA(stateConfig, stateData8, UILayer, oldAllison, cloudsPlatformerBg),
    "Introduction": new Introduction(stateConfig, stateData2, UILayer, allison),
    "BetweenLifeSlicesB": new BetweenLifeSlicesB(stateConfig, stateData8, UILayer, oldAllison, cloudsPlatformerBg),
    "AzayashiMall": new AzayashiMall(stateConfig, stateData3, UILayer, allisonMall),
    "BetweenLifeSlicesC": new BetweenLifeSlicesC(stateConfig, stateData8, UILayer, oldAllison, cloudsPlatformerBg),
    "HighSchool": new HighSchool(stateConfig, stateData4, UILayer, allisonMall),
    "BetweenLifeSlicesD": new BetweenLifeSlicesD(stateConfig, stateData8, UILayer, oldAllison, cloudsPlatformerBg),
    "FirstJob": new FirstJob(stateConfig, stateData5, UILayer, allisonMall),
    "BetweenLifeSlicesE": new BetweenLifeSlicesE(stateConfig, stateData8, UILayer, oldAllison, cloudsPlatformerBg),
    "GangLife": new GangLife(stateConfig, stateData6, UILayer, allisonMall),
    "BetweenLifeSlicesF": new BetweenLifeSlicesF(stateConfig, stateData8, UILayer, oldAllison, cloudsPlatformerBg),
    "HotelSpa": new HotelSpa(stateConfig, stateData7, UILayer, allisonMall),
    "BetweenLifeSlices": new BetweenLifeSlices(stateConfig, stateData8, UILayer, oldAllison, cloudsPlatformerBg)
  };
  StateSystem = new StateSystem(states, UILayer, stateConfig, allison);
  StateSystem.createSubSystems();
  StateSystem.StateParticles.displayPortrait();
  ChillLofiR.loop();
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
