// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predators
let tiger;
let lion;
let dragon;

// The three prey
let antelope;
let zebra;
let bee;

/**
  Keycodes for player one's up down left right inputs.

*/
let playerOneInputs = {
  UP: 87, // W
  DOWN: 83, // A
  LEFT: 65, // S
  RIGHT: 68, // D
  SPRINT: 81 // Q
}

/**
  Keycodes for player two's up down left right inputs.

*/
let playerTwoInputs = {
  UP: 73, // I
  DOWN: 75, // K
  LEFT: 74, // J
  RIGHT: 76, // L
  SPRINT: 85 // U
};

/**
  Keycodes for player three's up down left right inputs.

*/
let playerThreeInputs = {
  UP: 71, // G
  DOWN: 66, // B
  LEFT: 86, // V
  RIGHT: 78, // N
  SPRINT: 67 // C
};
// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);

  dragon = new Predator(100, 100, 20, color(255, 255, 0), 100, playerOneInputs, 0);
  lion = new Predator(100, 100, 20, color(0, 255, 0), 85, playerTwoInputs, 0);
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40, playerThreeInputs, 0);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

  // Handle input for the tiger
  tiger.handleInput();
  lion.handleInput();
  dragon.handleInput();

  // Move all the "animals"
  tiger.move();
  lion.move();
  dragon.move();

  antelope.move();
  zebra.move();
  bee.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  lion.handleEating(antelope);
  lion.handleEating(zebra);
  lion.handleEating(bee);

  dragon.handleEating(antelope);
  dragon.handleEating(zebra);
  dragon.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  lion.display();
  dragon.display();

  antelope.display();
  zebra.display();
  bee.display();
}
