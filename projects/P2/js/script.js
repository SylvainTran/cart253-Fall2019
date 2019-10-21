/**
  Garden of Eden: The First Settlements

*/

// Our predator
let tiger;

// The three prey
let antelope;
let zebra;
let bee;

// The tile map
let tileMap = [];
// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);

  createTileMap();
}

/**
  Creates a two-dimensional tile map so to be able
  to organize the canvas elements and some screen
  behaviours.

*/
function createTileMap() {
  const tileMapSize = 100;

  // Fill the tileMap array with an array in each of its
  // elements.
  for(let k = 0; k <= tileMapSize; k++) {
    tileMap[k] = [];
    for(let m = 0; m <= tileMapSize; m++) {
      // We add empty spaces first
      let newSpace = new Space(k, m, spaceTypeId.EMPTY);
      tileMap[k][m] = newSpace;
      //console.log("Coords X" + tileMap[k][m].spaceTypeId);
      //console.log("Coords X" + tileMap[k][m].spacePositionX);
      //console.log("Coords Y" + tileMap[k][m].spacePositionY);
    }
  }
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

  // Handle input for the tiger
  tiger.handleInput();

  // Move all the "animals"
  tiger.move();
  antelope.move();
  zebra.move();
  bee.move();

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
