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
  createCanvas(500, 500);
  x = width / 2;
  y = height / 2;
}

function draw() {
  vx += ax;
  vy += ay;

  x += vx;
  y += vy;

  ellipse(x += vx * speed, y += vy, 50, 50);

  if( x > width || x > height ){
    x = width / 2;
    fill(255);
    rect( (width / 2), height / 2, 50, 50);
  }

  if(mouseX > width / 2)
  {
    background(0);
  }
  else
  {
    background(255);
  }
}
