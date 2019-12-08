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
let gameCanvas, webGLCanvas;
let zeyadaType, AntonRegularType;
let allison, allisonMall, allisonHighSchool, allisonFirstJob, allisonMasterJudge, allisonFloristMiddleAge, allisonVeryOldAged, duckguy;
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
let positiveChime;
let hurryUp;
let player3DPositionX; // simple X position in 3D space
let player3DPositionZ; // simple Z position in 3D space
let current3DPositionZ = player3DPositionZ;
let speed = 10;
let vx = 0;
let vz = 0;
// Whether the cube universe is visible, its dimensions and growth rate
let cubeUniverseVisible = false;
let cubeUniverseX = 500;
let cubeUniverseY = 500;
let cubeUniverseZ = 500;
let cubeUniverseGrowthRate = 50;

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
  allisonFirstJob = loadImage("assets/images/Allison-0004-first-job.png");
  allisonMasterJudge = loadImage("assets/images/Allison-0005-judge.png");
  allisonFloristMiddleAge = loadImage("assets/images/Allison-0006-HotelSpa.png");
  allisonVeryOldAged = loadImage("assets/images/Allison-0007-very-old-aged.png");
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
  positiveChime = loadSound("assets/sounds/positiveChime.wav");
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
  gameCanvas = createCanvas(1000, 1000, WEBGL);
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
    "FirstJob": new FirstJob(stateConfig, stateData5, UILayer, allisonFirstJob),
    "BetweenLifeSlicesE": new BetweenLifeSlicesE(stateConfig, stateData8, UILayer, oldAllison, cloudsPlatformerBg),
    "Judge": new Judge(stateConfig, stateData6, UILayer, allisonMasterJudge),
    "BetweenLifeSlicesF": new BetweenLifeSlicesF(stateConfig, stateData8, UILayer, oldAllison, cloudsPlatformerBg),
    "HotelSpa": new HotelSpa(stateConfig, stateData7, UILayer, allisonFloristMiddleAge),
    "BetweenLifeSlicesG": new BetweenLifeSlicesG(stateConfig, stateData8, UILayer, oldAllison, cloudsPlatformerBg),
    "Downtown": new Downtown(stateConfig, stateData8, UILayer, allisonVeryOldAged, cloudsPlatformerBg)
  };
  StateSystem = new StateSystem(states, UILayer, stateConfig, allison);
  StateSystem.createSubSystems();
  ChillLofiR.loop();
  player3DPositionX = width/2;
  player3DPositionZ = height/2;
}

/**
  draw()
  @no custom args.
  @Render each frame.
*/
function draw() {
  // Spectator mode
  camera(player3DPositionX, height/2, player3DPositionZ / tan(PI/6), mouseX, 0, 0, 0, 1, 0);
  // Re-center the origin to top left
  translate(-width/2,-height/2,10);
  // Update state graphics
  StateSystem.updateSystems();
  console.log("X: " + player3DPositionX);
  console.log("Z: " + player3DPositionZ);

  // Check if player is at the exit point
  if(player3DPositionX <= -1410 && player3DPositionZ <= 100) {
    console.log("Changing scene");
    cubeUniverseVisible = true;
  }

  if(cubeUniverseVisible) {
    translate(500, 1000, 500);
    push();
    texture(cloudsPlatformerBg);
    box(cubeUniverseX, cubeUniverseY, cubeUniverseZ);
    pop();
    translate(-500, -1000, -500);
  }

  if(cubeUniverseVisible && player3DPositionX >= -300 && player3DPositionX <= 500 && player3DPositionZ >= 150 && player3DPositionZ <= 500) {
    // We are inside the cube
    // Quick universe expansion effect
    cubeUniverseX += cubeUniverseGrowthRate;
    cubeUniverseY += cubeUniverseGrowthRate;
    cubeUniverseZ += cubeUniverseGrowthRate;
  }
  // Text cue
  push();
  fill(255);
  textSize(100);
  text("Exit.", -1350, 100);
  pop();

  // Red door
  push();
  translate(-1250, 1000, 50);
  fill(255, 0, 0);
  box(500, 500, 10);
  translate(1000, -1000, -50);
  pop();

  // Adjust the 3D UI
  translate(500, 500, player3DPositionZ - 100);
  let UIXPos = player3DPositionX - width / 2;
  let maxUIXPos = constrain(UIXPos, 0, width / 2);

  // 3D Movement
  handleInputs();
  // Bounce off walls
  roomBoundariesBounce();

  image(UILayer, maxUIXPos, -300, 1000,200);
  translate(-500, -500, player3DPositionZ + 100);
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
  handleInputs()
  @no custom args
  @handles velocity changes depending on the keycode down:
    currently set to WASD keys.
*/
function handleInputs() {
  if(keyIsDown(65)) { // Left
    vx = -speed;
  }
  else if(keyIsDown(68)) { // Right
    vx = speed;
  }
  else {
    vx = 0;

  }

  if(keyIsDown(87)) { // Forward
    vz = -speed;
  }
  else if(keyIsDown(83)) { // Backward
    vz = speed;
  }
  else {
    vz = 0;
  }
  player3DPositionX += vx;
  player3DPositionZ += vz;
  //let smoothFactor = 0.05;
  //let distanceLastZPos = sq(current3DPositionZ - player3DPositionZ);
  //rotateY(sqrt(distanceLastZPos * smoothFactor * PI/6));
}

/**
  roomBoundariesBounce()
  @no custom args
  @handles screen bouncing at the borders of the game scene.

*/
function roomBoundariesBounce() {
  const sceneUnitThreshold = 2000;
  const bounceFactor = 50;
  if(player3DPositionX <= -sceneUnitThreshold) { // Left
    player3DPositionX += bounceFactor;
  }

  if(player3DPositionX >= sceneUnitThreshold) { // Right
    player3DPositionX -= bounceFactor;
  }

  if(player3DPositionZ <= 0) { // Forward
    player3DPositionZ += bounceFactor;
  }

  if(player3DPositionZ >= sceneUnitThreshold) { // Backward
    player3DPositionZ -= bounceFactor;
  }
}
