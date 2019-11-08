/**
  BASAR / FLESH

  Methodology: Goal is to be more explicitly conscious about my design choices.
  Goals:
  Listening to the Word: Hebraic word for "flesh", Basar.
  Explore more basic gamplay mechanics in different scenes by using OOP.
  Near complete exclusion of data from state logic through the use of files.

*/
// The main canvas for actors
let mainCanvas;
// Scene related variables
let sceneHandler;
let sceneConfig;
let sceneObjects;
let sceneData0, sceneData1, sceneData2, sceneData3, sceneData4, sceneData5;
// Our first human
let adam;
// Pics
let avatarMale;
// The three prey
let person1;
let person2;
let person3;
// The canvas layers for each display category
let uiLayer;
let actorsLayer;
let gridLayer;
let environmentLayer;
// The tile map -- TODO setup in a json config file
let tileMap = [];
let tileMapFactory;
let tileMapExplorer;
let tileFillColor = [];
const TILE_MAP_SIZE = 1000;
const TILE_SIZE = TILE_MAP_SIZE / 10;
// The persons array
let persons = [];
const numberOfActors = 10;
let actorFactory;
// The font
let dosisTTF;
// Sound
let nextSceneSound;
let leftKeySound, rightKeySound, upKeySound, downKeySound;
let movementSounds;
// Narration
let introductionVoiceActing;
let movementTutorialVoiceActing;
let gameplayTutorialVoiceActing;
let zombieAttackVoiceActing;
let spiritualDesertVoiceActing;
/**
  Preloads the sceneConfig, sceneData, avatar assets, and fonts.

*/
function preload() {
  sceneConfig = loadJSON("data/scenes/sceneConfig.json");
  sceneData0 = loadJSON("data/scenes/sceneData/sceneData0.json");
  sceneData1 = loadJSON("data/scenes/sceneData/sceneData1.json");
  sceneData2 = loadJSON("data/scenes/sceneData/sceneData2.json");
  sceneData3 = loadJSON("data/scenes/sceneData/sceneData3.json");
  sceneData4 = loadJSON("data/scenes/sceneData/sceneData4.json");
  sceneData5 = loadJSON("data/scenes/sceneData/sceneData5.json");
  avatarMale = loadImage("assets/images/avatarMale.png");
  avatarFemale = loadImage("assets/images/avatarFemale.png");
  dosisTTF = loadFont("assets/fonts/dosis.ttf");
  nextSceneSound = loadSound("assets/sounds/nextSceneSound.wav");
  leftKeySound = loadSound("assets/sounds/leftKey.wav");
  rightKeySound = loadSound("assets/sounds/rightKey.wav");
  upKeySound = loadSound("assets/sounds/upKey.wav");
  downKeySound = loadSound("assets/sounds/downKey.wav");
  introductionVoiceActing = loadSound("assets/sounds/introductionScene.mp3");
  movementTutorialVoiceActing = loadSound("assets/sounds/movementTutorialScene.mp3");
  gameplayTutorialVoiceActing = loadSound("assets/sounds/mainGameplayTutorialScene.mp3");
  zombieAttackVoiceActing = loadSound("assets/sounds/zombieAttackScene_v2.mp3");
  spiritualDesertVoiceActing = loadSound("assets/sounds/spiritualDesertScene.mp3");
}
/**
  Sets up a canvas and creates objects for the Human and three prey.

*/
function setup() {
  mainCanvas = createCanvas(TILE_MAP_SIZE, TILE_MAP_SIZE);
  mainCanvas.parent('mainDisplay');
  uiLayer = createGraphics(TILE_MAP_SIZE, TILE_MAP_SIZE);
  uiLayer.clear();
  gridLayer = createGraphics(TILE_MAP_SIZE, TILE_MAP_SIZE);
  gridLayer.clear();
  environmentLayer = createGraphics(TILE_MAP_SIZE, TILE_MAP_SIZE);
  environmentLayer.clear();
  actorFactory = new ActorFactory(numberOfActors, avatarMale, avatarFemale);
  const tileMapSize = TILE_MAP_SIZE;
  tileMapExplorer = new TileMapExplorer(tileMap);
  movementSounds = {
    LEFT: leftKeySound,
    RIGHT: rightKeySound,
    UP: upKeySound,
    DOWN: downKeySound
  };
  sceneObjects = {
    "mainMenuScene": new MainMenuScene(sceneData0),
    "introduction": new IntroductionScene(sceneData1, introductionVoiceActing),
    "movementTutorial": new MovementTutorialScene(sceneData2, movementTutorialVoiceActing),
    "gameplayTutorial": new GameplayTutorialScene(sceneData3, actorFactory, tileMapExplorer, gameplayTutorialVoiceActing),
    "zombieAttackScene": new ZombieAttackScene(sceneData4, actorFactory, tileMapExplorer, zombieAttackVoiceActing),
    "spiritualDesert": new SpiritualDesert(sceneData5, actorFactory, tileMapExplorer, spiritualDesertVoiceActing)
  };
  // Keeping the data separated from the manipulation on the data.
  // All data is encapsulated in the sceneConfig and sceneData files.
  sceneHandler = new SceneHandler(sceneObjects, sceneConfig, nextSceneSound);
  tileFillColor.push(color(255, 255, 255)); // White
  adam = new Human(width / 2, height / 2, TILE_SIZE, color(200, 200, 0), 40, avatarMale);
  tileMapFactory = new TileMapFactory(tileMapSize, tileMapExplorer);
  tileMapFactory.createEmptyTileMap(gridLayer, tileMapSize);
  // Actor generation (temporary)
  for (let i = 0; i < numberOfActors; i++) {
    let newPerson = new Prey(random(0, width), random(0, height), 20, color(255, 255, 0), 10, avatarFemale);
    persons[i] = newPerson;
  }
}
/**
  Accesses the sceneHandler object's currentSceneName to gate
  which mouse event (situation) to handle.

*/
function mousePressed() {
  let sceneMouseEvent = null;
  switch (sceneHandler.currentSceneName) {
    case "mainMenuScene":
      sceneMouseEvent = sceneObjects.mainMenuScene.mousePressed();
      break;
    case "introduction":
      sceneMouseEvent = sceneObjects.introduction.mousePressed();
      break;
    case "movementTutorial":
      sceneMouseEvent = sceneObjects.movementTutorial.mousePressed();
      break;
    case "zombieAttackScene":
      sceneMouseEvent = sceneObjects.zombieAttackScene.mousePressed();
      break;
    case "spiritualDesert":
      sceneMouseEvent = sceneObjects.spiritualDesert.mousePressed();
      break;
    default:
      break;
  }
  // If we actually got an event or if it stayed null.
  if (sceneMouseEvent !== null) {
    sceneHandler.handleSceneMouseEvent(sceneMouseEvent);
  }
  // TODO event listeners for onMouseOver tile map stuff
  for (let i = 0; i <= TILE_MAP_SIZE / TILE_SIZE; i++) {
    for (let j = i; j <= TILE_MAP_SIZE / TILE_SIZE; j++) {
      //tileMap[i][j].clicked(gridLayer, tileFillColor, TILE_SIZE);
    }
  }
}
/**
  P5.js keyPressed, listens to key events.

*/
function keyPressed() {
  // Main menu keyPressed ? TODO refactor
  adam.keyPressed(TILE_SIZE, movementSounds);
  let sceneKeyPressEvent = null;
  // Call the Humans and persons' custom keyPressed
  switch (sceneHandler.currentSceneName) {
    case "movementTutorial":
      sceneKeyPressEvent = sceneObjects.movementTutorial.keyPressed(TILE_SIZE, movementSounds);
      break;
    case "gameplayTutorial":
      sceneKeyPressEvent = sceneObjects.gameplayTutorial.keyPressed(TILE_SIZE, movementSounds);
      break;
    case "zombieAttackScene":
      sceneKeyPressEvent = sceneObjects.zombieAttackScene.keyPressed(TILE_SIZE, movementSounds);
      break;
    case "spiritualDesert":
      sceneKeyPressEvent = sceneObjects.spiritualDesert.keyPressed(TILE_SIZE, movementSounds);
      break;
    default:
      break;
  }
  // If we actually got an event or if it stayed null
  if (sceneKeyPressEvent !== null) {
    sceneHandler.handleSceneKeyEvent(sceneKeyPressEvent);
  }
}
/**
  Handles input, movement, eating, and displaying for the system's objects.

*/
function draw() {
  mainCanvas.background(0);
  textFont(dosisTTF);
  // Displays the tile map
  image(gridLayer, 0, 0);
  // Display all the actors
  adam.display(sceneData0.sizeMultiplier);
  for (let j = 0; j < numberOfActors; j++) {
    // Check neighbouring tiles
    let checkMove = persons[j].checkNeighbourTiles(tileMapExplorer);
    persons[j].move();
    persons[j].display();
    adam.handleEating(persons[j]);
  }
  // If ready to render the current scene, render it.
  sceneHandler.process();
  // The environment layer createGraphics
  image(environmentLayer, 0, 0);
}
