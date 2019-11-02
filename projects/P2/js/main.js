/**
  BASAR / FLESH

  Methodology: Goal is to be more explicitly conscious about my design choices.

  29-10-2019  - Programmatic simplicity, style and structure (Cart 253)
              - Redirection of project 2 towards a more
                abstract/conceptual approach. (Cart 211)
              - Emphasis on meta-reflection and visual storytelling. (FFAR 250)
              - Typographic study. (Cart 214)

              Listening to the Word: Hebraic word for "flesh": Basar (Theology, FFAR 250)

*/
// The main canvas for actors
let mainCanvas;
// Scene related variables
let sceneHandler;
let sceneConfig;
let sceneObjects;
let sceneData0, sceneData1, sceneData2, sceneData3;
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
// The tile map
let tileMap = [];
let tileMapExplorer;
let tileFillColor = [];
const TILE_MAP_SIZE = 1000;
const TILE_SIZE = TILE_MAP_SIZE / 10;
// The persons array
let persons = [];
const numberOfPersons = 10;
// The font
let dosisTTF;

function preload() {
  sceneConfig = loadJSON("data/scenes/sceneConfig.json");
  sceneData0 = loadJSON("data/scenes/sceneData/sceneData0.json");
  sceneData1 = loadJSON("data/scenes/sceneData/sceneData1.json");
  sceneData2 = loadJSON("data/scenes/sceneData/sceneData2.json");
  sceneData3 = loadJSON("data/scenes/sceneData/sceneData3.json");
  avatarMale = loadImage("assets/images/avatarMale.png");
  avatarFemale = loadImage("assets/images/avatarFemale.png");
  dosisTTF = loadFont("assets/fonts/dosis.ttf");
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
  sceneObjects = {
    "mainMenuScene": new MainMenuScene(sceneData0),
    "introduction": new IntroductionScene(sceneData1)
  }
  // Keeping the data separated from the manipulation on the data.
  // All data is encapsulated in the sceneConfig and sceneData files.
  sceneHandler = new SceneHandler(sceneObjects, sceneConfig);
  tileFillColor.push(color(255, 255, 255)); // White
  adam = new Human(width / 2, height / 2, TILE_SIZE, color(200, 200, 0), 40, avatarMale);
  const tileMapSize = TILE_MAP_SIZE;
  const tileMapWidth = tileMapSize;
  const tileMapHeight = tileMapSize;
  createEmptyTileMap(tileMapSize);
  tileMapExplorer = new TileMapExplorer(tileMap);
  for(let i = 0; i < numberOfPersons; i++) {
    let newPerson = new Prey(width / 2, height / 2, 20, color(255, 255, 0), 10, avatarFemale);
    persons[i] = newPerson;
  }
}

/**
  Accesses the sceneHandler object's currentSceneName to gate
  which mouse event (situation) to handle.

*/
function mousePressed() {
  switch(sceneHandler.currentSceneName) {
    case "mainMenuScene":
      let situation = sceneObjects.mainMenuScene.mousePressed();
      sceneHandler.assessSituation(situation);
      break;
    default:
      break;
  }
    createSettlement(windowWidth, windowHeight);
    // Event listeners for onMouseOver tile map stuff
    for(let i = 0; i <= TILE_MAP_SIZE / TILE_SIZE; i++) {
      for(let j = i; j <= TILE_MAP_SIZE / TILE_SIZE; j++) {
        //tileMap[i][j].clicked(gridLayer, tileFillColor, TILE_SIZE);
      }
    }
}

function keyPressed() {
    // Call the Humans and persons' tile-based movement (custom keyPressed)
    adam.keyPressed(TILE_SIZE);
}

/**
  Handles input, movement, eating, and displaying for the system's objects.

*/
function draw() {
  // Main canvas bg
  mainCanvas.background(0);
  textFont(dosisTTF);
  // Displays the tile map
  image(gridLayer, 0, 0);
  // Display all the actors
  adam.display();
  for(let j = 0; j < numberOfPersons; j++){
    // Check neighbouring tiles
    let checkMove = persons[j].checkNeighbourTiles(tileMapExplorer);
    persons[j].move();
    persons[j].display();
    adam.handleEating(persons[j]);
  }
  // If ready to render the current scene, render it.
  sceneHandler.process();

  // The UI layer display
  // image(uiLayer, 0, 0);
  // The environment layer createGraphics
  image(environmentLayer, 0, 0);
}

/**
  Creates a two-dimensional and empty tile map so to be able
  to organize the canvas elements and some screen
  behaviours.

*/
function createEmptyTileMap(tileMapSize) {
  // Fill the tileMap array with an array in each of its
  // elements.
  console.log("Creating an empty tile map. Size = " + tileMapSize);
  for(let k = 0; k < tileMapSize; k+= TILE_SIZE) {
    tileMap[k] = [];
    for(let m = 0; m < tileMapSize; m+= TILE_SIZE) {
      // We add empty spaces first--TODO don't add where there is going to be walls
      let newSpace = new Space(k, m);
      tileMap[k][m] = newSpace;
      tileMap[k][m].displayTile(gridLayer, color(0, 120, 255, 15), TILE_SIZE);
    }
  }
}

/**
  Fills the tiles in the tileMap with Wall static elements to create borders.
  TDDO to be implemented in an interactive way instead.

*/
function createWallElements(tileMapWidth, tileMapHeight) {
  let newWallElement;

  for(let k = 0; k < tileMapWidth; k++) {
    for(let m = 0; m < tileMapHeight; m++) {

    }
  }
}

/**
  Snaps mousePosX on the gridmap.

*/
function gridSnapX(mouseX, mouseY) {
  let gridSnappedValue;

  return gridSnappedValue;
}

/**
  Snaps mousePosY on the gridmap.

*/
function gridSnapY() {

}

/**
  Create a new settlement inside the canvas at mouse position X, Y.

*/
function createSettlement(tileMapWidth, tileMapHeight) {
  let newSettlement;
  //let gridConstrainedX = gridSnapX(mouseX, mouseY);
  //let gridConstrainedY = gridSnapY(mouseX, mouseY);
  newSettlement = new Settlement(mouseX, mouseY);
  //newSettlement = new Settlement(gridConstrainedX, gridConstrainedY);
  newSettlement.drawSettlement(environmentLayer, TILE_SIZE);
}
