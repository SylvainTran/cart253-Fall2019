"use strict";
//
// let startX;
// let startY;
// let segmentRadius = 20;
// let numberOfSegments = 300;
//
// function setup() {
//   createCanvas(640,480);
//   noStroke();
//   fill(80,200,80);
//   startX = width/5;
//   startY = height/2;
// }
// function draw() {
//   background(200,250,200);
//   let segmentsDrawn = 0;
//   let x = startX;
//   while(segmentsDrawn < numberOfSegments ) {
//     ellipse(x, startY, segmentRadius*2);
//     x += segmentRadius * 2;
//     segmentsDrawn++;
//   }
// }

let x;
let y;
let startRadius = 100;
let startFill = 0;
function setup() {
  createCanvas(500,500);
  noStroke();
  x = width/2;
  y = height/2;
}
function draw() {
  background(255);
  let radius = startRadius;
  let currentFill = startFill;
  while (radius > 0) {
    fill(currentFill);
    ellipse(x,y,radius);
    radius--;
    currentFill = map(radius,0,startRadius,255,0);
  }
}
