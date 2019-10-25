/**
  Author: Sylvain Tran

  Goal of program: Modified version of predator vs. preys by Dr. Pippin Bar.
  Creates three predators playable by human beings, with different control inputs and sprint buttons.
  And three prey (of different sizes and speeds).
  The explicit goal is to eat everything before the finality of the being is at hand,
  and get the highest score.

*/

// Our predators
let tiger;
let lion;
let dragon;

// Pics
let dragonPic;
let lionPic;
let tigerPic;
let preyPic;

// The three prey
let cactuar;
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

/**
  Preloads pictures for preys and predators.

*/
function preload() {
  dragonPic = loadImage("assets/images/dragonPic.png");
  lionPic = loadImage("assets/images/lion.png");
  tigerPic = loadImage("assets/images/tiger.png");
  preyPic = loadImage("assets/images/prey.png");
}

/**
  Sets up a canvas
  Creates objects for the three player predators and three preys.

*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  cactuar = new Prey(100, 100, 10, color(255, 100, 10), preyPic, 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), preyPic, 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), preyPic, 10);

  dragon = new Predator(100, 100, 20, color(255, 0, 0), 100, playerOneInputs, 0, 10, "Dragon", dragonPic);
  lion = new Predator(100, 100, 20, color(0, 255, 0), 85, playerTwoInputs, 0, 5, "Lion", lionPic);
  tiger = new Predator(100, 100, 5, color(0, 0, 255), 40, playerThreeInputs, 0, 8, "Tiger", tigerPic);
}


/**
  Handles input, movement, eating, and displaying for the system's objects.

*/
function draw() {
  // Clear the background to black
  background(0);

  // Handle inputs for the predators
  tiger.handleInput();
  lion.handleInput();
  dragon.handleInput();

  // Move all the "animals"
  tiger.move();
  lion.move();
  dragon.move();

  cactuar.move();
  zebra.move();
  bee.move();

  // Handle the predators eating any of the prey
  tiger.handleEating(cactuar);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  lion.handleEating(cactuar);
  lion.handleEating(zebra);
  lion.handleEating(bee);

  dragon.handleEating(cactuar);
  dragon.handleEating(zebra);
  dragon.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  lion.display();
  dragon.display();

  cactuar.display();
  zebra.display();
  bee.display();

  // Display the scores
  tiger.displayEatenPrey(50, 50);
  lion.displayEatenPrey(250, 50);
  dragon.displayEatenPrey(450, 50);
}
