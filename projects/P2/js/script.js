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
let tileMap;
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
  let tileMapSize = 100;
  tileMap = [tileMapSize];

  // Fill the tileMap array with an array in each of its
  // elements.
  for(let k = 0; k <= tileMap.length; k++) {
    tileMap[k] = [];
  }

  // Fill each x, y position with a new Empty Space.
  for(let f = 0; f <= tileMap.length; f++) {
    for(let g = 0; g <= tileMap.length; g++) {
      tileMap[f][g] = new Space(f, g, spaceTypeId.EMPTY);
    }
  }

  // Just a test to check if we really have something inside the tileMap
  for(let i = 0; i <= tileMap.length; i++) {
    for(let j = 0; j <= tileMap.length; j++) {
        console.log(tileMap[f][g].spacePositionX);
        console.log(tileMap[f][g].spacePositionY);
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
