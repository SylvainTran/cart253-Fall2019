/*****************

Class 3: 19 September 2019
Sylvain Tran

******************/

let x = 0;
let y = 0;
let vx = 2;
let vy = -2;
let speed = 0.005;
let ax = 0.25;
let ay = 0.25;


function setup() {
  createCanvas(1280, 780);
  x = width / 2;
  y = height / 2;
}

function draw() {
  vx += ax;
  vy += ay;

  x += vx;
  y += vy;

  ellipse(x += vx * speed, y += vy, 50, 50);
}

function mousePressed(){
  ellipse(width / 2, height / 2, 250, 250);
  background(255);

}
