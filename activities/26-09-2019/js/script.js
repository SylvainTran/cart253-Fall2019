"use strict";

let startX;
let startY;
let segmentRadius = 20;
function setup() {
  createCanvas(640,480);
  noStroke();
  fill(80,200,80);
  startX = width/5;
  startY = height/2;
}
function draw() {
  background(200,250,200);
  ellipse(startX,startY,segmentRadius*2);
  ellipse(startX + segmentRadius*1.5,startY,segmentRadius*2);
  ellipse(startX + segmentRadius*3,startY,segmentRadius*2);
  ellipse(startX + segmentRadius*4.5,startY,segmentRadius*2);
  ellipse(startX + segmentRadius*6,startY,segmentRadius*2);
  // aaaaaand so on...
}
