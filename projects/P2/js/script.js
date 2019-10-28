/**
  Continuity from P1: Garden Labyrinth idea
  Garden of Eden: The First Settlements

*/

// Our predator
let tiger;

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
const TILE_MAP_SIZE = 639;
const TILE_SIZE = TILE_MAP_SIZE / 10;

function preload() {
  avatarMale = loadImage("assets/images/avatarMale.png");
  avatarFemale = loadImage("assets/images/avatarFemale.png");
}

/**
  Sets up a canvas and creates objects for the predator and three prey.

*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  tileFillColor.push(color(255, 255, 255)); // White

  gridLayer = createGraphics(windowWidth, windowHeight);
  gridLayer.clear();

  environmentLayer = createGraphics(windowWidth, windowHeight);
  environmentLayer.clear();

  tiger = new Predator(width / 2, height / 2, 5, color(200, 200, 0), 40, avatarMale);
  antelope = new Prey(width / 2, height / 2, 10, color(255, 100, 10), 50, avatarFemale);
  zebra = new Prey(width / 2, height / 2, 8, color(255, 255, 255), 60, avatarFemale);
  bee = new Prey(width / 2, height / 2, 20, color(255, 255, 0), 10, avatarFemale);

  const tileMapSize = windowWidth;
  const tileMapWidth = tileMapSize;
  const tileMapHeight = windowHeight;

  createEmptyTileMap(tileMapSize);

  console.log(tileMapSize);
  console.log(tileMapHeight);
  console.log(tileMap.length);

  tileMapExplorer = new TileMapExplorer(tileMap);
  frameRate(30); // to see the tile-based movement
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
      //console.log("Coords X" + tileMap[k][m].spacePositionX);
      //console.log("Coords Y" + tileMap[k][m].spacePositionY);
      if(k === TILE_MAP_SIZE && m === TILE_MAP_SIZE){
        console.log("End reached: " + k + " " + m);
      }
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
    // Call the predators and preys' tile-based movement (custom keyPressed)
    tiger.keyPressed(TILE_SIZE);
}

/**
  Handles input, movement, eating, and displaying for the system's objects.

*/
function draw() {
  // Main canvas bg
  background(0);

  // Handle input for the tiger
  tiger.handleInput();

  // Check neighbouring tiles
  let checkAntelope = antelope.checkNeighbourTiles(tileMapExplorer);
  let checkZebra = zebra.checkNeighbourTiles(tileMapExplorer);
  let checkBee = bee.checkNeighbourTiles(tileMapExplorer);

  // Move all the "animals" if the next tiles are ok to move to.
  tiger.move();
  antelope.move(checkAntelope);
  zebra.move(checkZebra);
  bee.move(checkBee);

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Displays the tile map
  image(gridLayer, 0, 0);

  // Display all the "animals"
  tiger.display();
  antelope.display();
  zebra.display();
  bee.display();

  image(environmentLayer, 0, 0);
}
