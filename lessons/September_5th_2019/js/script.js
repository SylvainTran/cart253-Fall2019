/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// preload()
//
// Description of preload

function drawRandomCircles(){

}

function preload() {

}


// setup()
//
// Description of setup

function setup() {
  createCanvas(500, 500);
  background(0);

  //first rectangle
  rectMode(CENTER);
  noStroke();

  fill(55);
  rect(250, 250, 430, 430);

  fill(60);
  rect(250, 250, 375, 375);

  fill(75);
  rect(250, 250, 325, 325);

  fill(75);
  rect(250, 250, 305, 305);

  fill(85);
  rect(250, 250, 275, 275);

  fill(0, 0, 255, 55);
  ellipse(250, 250, 375, 375);

  stroke(255);
  strokeWeight(4);
  fill(0);
  line(0, 0, 500, 500);

  stroke(255);
  strokeWeight(4);
  fill(0);
  line(0, 500, 500, 0);
}

// draw()
//
// Description of draw()

function draw() {

}
