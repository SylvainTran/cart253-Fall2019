/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// preload()
//
// Description of preload

function preload() {

}


// setup()
//
// Description of setup

let faceX = 250;
let faceY = 250;
let faceSize = 300;
let eyeXOffset = 50;
let eyeYOffset = 50;
let mouthYOffset = 50;

function setup() {
  createCanvas(500,500);
}
function draw() {
  background(255, 170, 0);

  fill(random(0, 255), random(0, 255), random(0, 255));
  faceX = mouseX;
  faceY = mouseY;
  ellipse(faceX += 1, faceY += 1,faceSize += 1,faceSize += 1);
  ellipse(faceX - eyeXOffset,faceY - eyeYOffset,faceSize/4);
  ellipse(faceX + eyeXOffset,faceY - eyeYOffset,faceSize/4);
  ellipse(faceX,faceY + mouthYOffset,faceSize/3);
}
