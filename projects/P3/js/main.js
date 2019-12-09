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
let speed = 50;
let vx = 0;
let vz = 0;
// Whether the cube universe is visible, its dimensions and growth rate
let cubeUniverseVisible = false;
let cubeUniverseX = 500;
let cubeUniverseY = 500;
let cubeUniverseZ = 500;
let cubeUniverseGrowthRate = 15;
let climaticScene = false; // If we are the ending.
let triggeredCubeUniverse = false;
let scoreBoardLineSpacing = -500;
let UIXPos;
let maxUIXPos;
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
  // Adjust the 3D UI
  UIXPos = player3DPositionX - width / 2;
  maxUIXPos = constrain(UIXPos, 0, width / 2);
}

/**
  draw()
  @no custom args.
  @Render each frame.
*/
function draw() {
  // First-person view
  camera(player3DPositionX - 150, height/3, player3DPositionZ / tan(PI/6), mouseX, mouseY, 0, 0, 1, 0);
  // Re-center the origin to top left
  translate(-width/2,-height/2,10);
  // Update state graphics
  StateSystem.updateSystems();
  handleLifeScoreBoard();
  handleClimaticScene();
  // 3D Movement
  handleInputs();
  // Bounce off walls
  roomBoundariesBounce();
  image(UILayer, maxUIXPos, -250, 1000, 200);
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
  else if(keyIsDown(87)) { // Forward
    vz = -speed;
  }
  else if(keyIsDown(83)) { // Backward
    vz = speed;
  }
  else {
    vx = 0;
    vz = 0;
  }
  player3DPositionX += vx;
  player3DPositionZ += vz;
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

function handleLifeScoreBoard() {
  // Update Life Scoreboard (positivity score for each slice of life)
  push();
  fill(255);
  textSize(100);
  text("Cognitive Restructuring  Life Scoreboard", -2050, -500);
  pop();

  if(StateSystem.lifeScoreBoard.length > 0) {
    for(let i = 0; i < StateSystem.lifeScoreBoard.length; i++) {
      push();
      fill(255);
      textSize(50);
      text(StateSystem.lifeScoreBoard[i] + " positive thoughts", -1550, -400 + i * 100);
      pop();
      scoreBoardLineSpacing += 100;
    }
  }
}

function handleClimaticScene() {
  if(climaticScene) {
    let totalLifeBoardScore = 0;
    let meetingGodThreshold = 2000; // The score threshold at which the player can meet God (if they were too negative)
    // Count the total score of all states
    for(let i = 0; i < StateSystem.lifeScoreBoard.length; i++) {
      totalLifeBoardScore += parseInt(StateSystem.lifeScoreBoard[i]);
    }
    console.log("Total life score: " + totalLifeBoardScore);
    if(totalLifeBoardScore <= meetingGodThreshold) {
      // God NPC
      text("It is time to return to your maker, who gave you his life.", -1000, -1300);
      push();
      translate(-1250, 1000, 100);
      fill(0, 255, 0);
      box(500, 700, 10);
      translate(1000, -1000, -100);
      pop();
    }
    else {
      // Go to the next room where you see all the good that you have done on earth
      // Spawn relatives and friends as cubes
    }
    // Text cue for the red door
    push();
    fill(0, 255, 0);
    textSize(100);
    text("Door of Life", -1450, 100);
    pop();

    // Door of Life
    push();
    translate(-1250, 1000, 50);
    fill(255, 0, 0);
    box(500, 700, 10);
    translate(1000, -1000, -50);
    pop();

    // Check if player collided the Red door
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
      triggeredCubeUniverse = true;
      // Quick universe expansion effect
      cubeUniverseX += cubeUniverseGrowthRate;
      cubeUniverseY += cubeUniverseGrowthRate;
      cubeUniverseZ += cubeUniverseGrowthRate;
    }

    if(triggeredCubeUniverse) {
      if(player3DPositionX >= 0 && player3DPositionX <= 1000 && player3DPositionZ <= 50) {
        // we're going into the screen
        push();
        // Matrix neon green-blue glitchy colors
        fill(0, random(35, 255), random(5, 255));
        for(let i = 0; i <= 10000; i+=1) {
          translate(random(0, width), random(0, height), random(0, 100));
          box(30 + random(0, player3DPositionZ), 30 + random(0, 150), 30 + random(0, 150));
          translate(-random(0, width), -random(0, height), -random(0, 100));
          push();
          fill(255);
          pop();
        }
        pop();
      }
    }
  }
}
