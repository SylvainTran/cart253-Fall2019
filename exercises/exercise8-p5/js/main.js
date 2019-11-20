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
//
let allison;
//
/**
  preload()
  @no custom args.
  @Preload images and sounds needed.
*/
function preload() {
  allison = loadImage("assets/images/Allison-0001_c1.png");
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
  decayMemory();
}

/**
  mousePressed()
  @no custom args (has a default event arg)
  @Listens to mouse presses on canvas.
*/
function mousePressed() {
  clear();
  imageMode(CENTER);
  image(allison, 300, 540, allison.width, allison.height);
  if(mouseOverUIButton()) {
    console.log("Clicking over turquoise button.");
  }
}

/**
  decayMemory()
  @no custom args.
  @Uses filter effects to induce a decay effect on displayed
  text, image and "UI".
*/
function decayMemory() {
  push();
  // The UI at the top.
  fill(0);
  rect(0,0,width,100);
  fill(64,224,208);
  rect(width-150,0,150,100);
  // State text
  textSize(50);
  text("This is my Allison.\nShe was... four years\nold at the time.", width/2, 200);
  pop();
  // Decay effect using blur, gray and dilate filters.
  push();
  filter(BLUR);
  filter(GRAY);
  filter(DILATE);
  pop();
}

/**
  mouseOverUIButton()
  @no custom args.
  @Checks if the mouse is hovering over the
  turquoise UI button at the top right. Returns the
  state as a result.
*/
function mouseOverUIButton() {
  let state = false;
  if(mouseX >= width-150 && mouseX <= width && mouseY >= 0 && mouseY <= 100)
  {
    state = true;
  }
  return state;
}
