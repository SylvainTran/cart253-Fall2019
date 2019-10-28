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
let tileMap = [];
let tileMapExplorer;
const TILE_MAP_SIZE = 639;
const TILE_SIZE = 100;

function preload() {
  avatarMale = loadImage("assets/images/avatarMale.png");
  avatarFemale = loadImage("assets/images/avatarFemale.png");
}
/**
  Sets up a canvas and creates objects for the predator and three prey.

*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  //createCanvas(640, 640);
  tiger = new Predator(width / 2, height / 2, 5, color(200, 200, 0), 40, avatarMale);
  antelope = new Prey(width / 2, height / 2, 10, color(255, 100, 10), 50, avatarFemale);
  zebra = new Prey(width / 2, height / 2, 8, color(255, 255, 255), 60, avatarFemale);
  bee = new Prey(width / 2, height / 2, 20, color(255, 255, 0), 10, avatarFemale);

  background(120, 120, 120);

  const tileMapSize = windowWidth;
  const tileMapWidth = tileMapSize;
  const tileMapHeight = windowHeight;

  createEmptyTileMap(tileMapSize);
  createWallElements(tileMapWidth, tileMapHeight);

  console.log(tileMapSize);
  console.log(tileMapHeight);
  console.log(tileMap.length);
  tileMapExplorer = new TileMapExplorer(tileMap);
  //tileMapExplorer.chartTileMap(tileMapSize);

  //noLoop();
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
  for(let k = 0; k < tileMapSize; k++) {
    tileMap[k] = [];
    for(let m = 0; m < tileMapSize; m++) {
      // We add empty spaces first--TODO don't add where there is going to be walls
      let newSpace = new Space(k, m);
      tileMap[k][m] = newSpace;
      //console.log("Coords X" + tileMap[k][m].spacePositionX);
      //console.log("Coords Y" + tileMap[k][m].spacePositionY);
      if(k === 639 && m === 639){
        console.log("End reached: " + k + " " + m);
      }
    }
  }
}

/**
  Fills the tiles in the tileMap with Wall static elements to create borders.

*/
function createWallElements(tileMapWidth, tileMapHeight) {
  let newWallElement;

  for(let k = 0; k < tileMapWidth; k++) {
    for(let m = 0; m < tileMapHeight; m++) {
      // if we are at the borders of the tileMap:
      // xxxxxxxxxxxxxxxxx    <- 0
      // x               x
      // x               x
      // xxxxxxxxxxxxxxxxx    <- tileMapSize

      // replace that cell with a Wall Element
      // if we are at k = 0, tileMapSize (top border)
      // if we are at k = 0, and m to tileMapSize (left border)
      // if we are at k to tileMapSize, m = tileMapSize (TODO cut the rest of the m) (lower border)
      // if we are at k = tileMapSize, m to tileMapSize (right border)

      if(m === 0) { // put a wall over the first row (top border)
        newWallElement = new Wall(k, m);
        tileMap[k][m] = newWallElement;
        tileMap[k][m].drawWall();
        console.log("Wall at X: " + tileMap[k][m].elementPositionX);
        console.log("Wall at Y: " + tileMap[k][m].elementPositionY);
      }
      else if(k === 0) { // Left border
        newWallElement = new Wall(k, m);
        tileMap[k][m] = newWallElement;
        tileMap[k][m].drawWall();
        //console.log("Wall at X: " + tileMap[k][m].wallPositionX);
        //console.log("Wall at Y: " + tileMap[k][m].wallPositionY);
      }
      else if(m === tileMapHeight - 1) { // Bottom border
        newWallElement = new Wall(k, m);
        tileMap[k][m] = newWallElement;
        tileMap[k][m].drawWall();
        //console.log("Wall at X: " + tileMap[k][m].wallPositionX);
        //console.log("Wall at Y: " + tileMap[k][m].wallPositionY);
      }
      else if(k === tileMapWidth - 1) { // Right border
        newWallElement = new Wall(k, m);
        tileMap[k][m] = newWallElement;
        tileMap[k][m].drawWall();
        //console.log("Wall at X: " + tileMap[k][m].wallPositionX);
        //console.log("Wall at Y: " + tileMap[k][m].wallPositionY);
      }
    }
  }
}

/**
  Create a new settlement inside the canvas at mouse position X, Y.

*/
function createSettlement(tileMapWidth, tileMapHeight) {
  let newSettlement;
  newSettlement = new Settlement(mouseX, mouseY);
  newSettlement.drawSettlement();
}

function mousePressed() {
    createSettlement(windowWidth, windowHeight);
}

function keyPressed() {
    // Call the predators and preys' tile-based movement (custom keyPressed)
    tiger.keyPressed(TILE_SIZE);
}
/**
  Handles input, movement, eating, and displaying for the system's objects.

*/
function draw() {
  background(120, 120, 120);
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

  // Display all the "animals"
  tiger.display();
  antelope.display();
  zebra.display();
  bee.display();
}
