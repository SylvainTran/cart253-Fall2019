"use strict";

// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

////////////////////
// 10 ERRORS IN HERE
////////////////////

// Our predator
let tiger;

// The three prey
//////////////// FIXED #2: Added 'e' to fix typo in antelop
let antelope;
let zebra;
let bee;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey

//////////////// FIXED #1: Added space between function and setup
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40);
  //////////////// FIXED #3: Removed extra empty second parameter in tiger malloc
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
//////////////// FIXED #4: Added missing 'd' in p5 function 'background([args])'
  background(0);

  // Handle input for the tiger

  // Move all the "animals"
  tiger.move();
  antelope.move();
  zebra.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Display all the "animals"
  tiger.display();
//////////////// FIXED #5: Added missing 'e' in variable. antelop -> antelope
  antelope.display();
//////////////// FIXED #6: Corrected typo in display() call. disploy -> display
  zebra.display();
  b.display();
}
