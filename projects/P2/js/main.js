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
// Array of scenes
let sceneTable = [];

// Our first human
let adam;

// Pics
let avatarMale;

// The three prey
let antelope;
let zebra;
let bee;

// The tile map
let actorsLayer;
let gridLayer;
let environmentLayer;
let tileMap = [];
let tileMapExplorer;
let tileFillColor = [];
const TILE_MAP_SIZE = 1000;
const TILE_SIZE = TILE_MAP_SIZE / 10;

// Preys array
let preys = [];
const numberOfPreys = 10;

let dosisTTF;

function preload() {
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
  tileFillColor.push(color(255, 255, 255)); // White
  gridLayer = createGraphics(TILE_MAP_SIZE, TILE_MAP_SIZE);
  gridLayer.clear();
  environmentLayer = createGraphics(TILE_MAP_SIZE, TILE_MAP_SIZE);
  environmentLayer.clear();

  adam = new Human(width / 2, height / 2, TILE_SIZE, color(200, 200, 0), 40, avatarMale);
  antelope = new Prey(width / 2, height / 2, 10, color(255, 100, 10), 50, avatarFemale);
  zebra = new Prey(width / 2, height / 2, 8, color(255, 255, 255), 60, avatarFemale);
  bee = new Prey(width / 2, height / 2, 20, color(255, 255, 0), 10, avatarFemale);

  const tileMapSize = TILE_MAP_SIZE;
  const tileMapWidth = tileMapSize;
  const tileMapHeight = TILE_MAP_SIZE;
  createEmptyTileMap(tileMapSize);
  tileMapExplorer = new TileMapExplorer(tileMap);
  for(let i = 0; i < numberOfPreys; i++) {
    let newPrey = new Prey(width / 2, height / 2, 20, color(255, 255, 0), 10, avatarFemale);
    preys[i] = newPrey;
  }
}

function mousePressed() {
    createSettlement(windowWidth, windowHeight);
    // Event listeners for onMouseOver tile map stuff
    for(let i = 0; i <= TILE_MAP_SIZE / TILE_SIZE; i++) {
      for(let j = i; j <= TILE_MAP_SIZE / TILE_SIZE; j++) {
        tileMap[i][j].clicked(gridLayer, tileFillColor, TILE_SIZE);
      }
    }
}

function keyPressed() {
    // Call the Humans and preys' tile-based movement (custom keyPressed)
    adam.keyPressed(TILE_SIZE);
}

/**
  Handles input, movement, eating, and displaying for the system's objects.

*/
function draw() {
  // Main canvas bg
  background(0);

  // Check neighbouring tiles
  let checkAntelope = antelope.checkNeighbourTiles(tileMapExplorer);
  let checkZebra = zebra.checkNeighbourTiles(tileMapExplorer);
  let checkBee = bee.checkNeighbourTiles(tileMapExplorer);

  // Move all the "animals" if the next tiles are ok to move to.
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the adam eating any of the prey
  adam.handleEating(antelope);
  adam.handleEating(zebra);
  adam.handleEating(bee);

  // Displays the tile map
  image(gridLayer, 0, 0);

  // Display all the actors
  adam.display();
  //antelope.display();
  //zebra.display();
  //bee.display();
  for(let j = 0; j < numberOfPreys; j++){
    let checkMove = preys[j].checkNeighbourTiles(tileMapExplorer);
    preys[j].move();
    preys[j].display();
    adam.handleEating(preys[j]);
  }

  push();
  fill(255);
  textSize(60);
  textFont(dosisTTF);
  text("BASAR/FLESH\n\n\"Let us start.\"\n\"Perhaps later.\"", width / 2, height / 3);
  text("Please turn on your sound.\n", width / 10, height / 1.2);
  pop();

  push();
  fill(255, 0, 0);
  textSize(30);
  textFont(dosisTTF);
  text("(Be advised that this game may be shocking.)", width / 10, height / 1.1);
  pop();
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
