"use strict";
/**
  Melansuko: The Decades Day Album
  Author: Sylvain Tran

  @Goals of program:

  @Extend basics of arrays and trigonometry.
  @Explore the meaning of relationships of visual outputs
    through a basic story.
  @Take some things learned from Phaser.js and P2 and incorporate
    some complex ideas using other libraries.
  @Simplify my code and use more robust designs.

*/
let states = {};
let gameCanvas;
/**
  preload()
  @no custom args.
  @Preload images and sounds needed.
*/
function preload() {

}

/**
  setup()
  @no custom args.
  @Creates canvas and appends it to the game container.
  @Initializes the game states.
  @Creates a new StateSystem and pass it the states/scenes.
*/
function setup() {
  gameCanvas = createCanvas(1000, 1000);
  gameCanvas.parent('gameCanvas');
  states =
  {
    "AzayashiMall": new AzayashiMall()
  };
  StateSystem = new StateSystem(states);
  StateSystem.createSubSystems();
}

/**
  draw()
  @no custom args.
  @Render each frame.
*/
function draw() {

}

/**
  mousePressed()
  @no custom args (has a default event arg)
  @Listens to mouse presses on canvas.
*/
function mousePressed() {
  text("This is a text.", width/2, height/2);
}
