// Predator
//
// A class that represents a simple predator
// controlled by the arrow keys. It can move around
// the screen and consume Prey objects to maintain its health.

class Predator extends MobileElement {
  constructor(x, y, speed, fillColor, radius) {
    super(x, y);
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 1;
    // Display properties
    this.fillColor = fillColor;
    this.radius = this.health; // Radius is defined in terms of health
    // Input properties
    this.upKey = UP_ARROW;
    this.downKey = DOWN_ARROW;
    this.leftKey = LEFT_ARROW;
    this.rightKey = RIGHT_ARROW;

    // Movement history inside a queue
    this.movementQueueX = new Queue(1);
    this.movementQueueY = new Queue(1);
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    }
    else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    }
    else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    }
    else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    }
    else {
      this.vy = 0;
    }
  }

  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Erase the previous display of this predator
    this.clearPreviousDisplayTrail();
    this.handleWrapping();
    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Add to a queue structure the history of movements past and future
    // So to be able to keep a track and clear the trails
    this.movementQueueX.enqueue(this.x);
    this.movementQueueY.enqueue(this.y);
    //console.log("Queuing trailX" + this.x);
    //console.log("Queuing trailY" + this.y);
    // Update health
    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 0, this.maxHealth);
    // Handle wrapping
    //this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the predator has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    const innerMargins = 50;
    const radiusOffset = 1.5;
    if (this.x - this.radius * radiusOffset < 0 + innerMargins || this.x + this.radius * radiusOffset > width - innerMargins * 2) {
      this.vx = -this.vx * 10;
    }
    if (this.y - this.radius * radiusOffset < 0 + innerMargins || this.y + this.radius * radiusOffset > height - innerMargins) {
      this.vy = -this.vy * 10;
    }
  }

  // handleEating
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the prey dies, it gets reset.
  handleEating(prey) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + prey.radius) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease prey health by the same amount
      prey.health -= this.healthGainPerEat;
      // Check if the prey died and reset it if so
      if (prey.health < 0) {
        prey.reset();
      }
    }
  }

  // display
  //
  // Draw the predator as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    fill(this.fillColor);
    this.radius = this.health;
    ellipse(this.x, this.y, this.radius * 2);
    pop();
  }

  /**
    Clears the previously drawn trail using the tileMap grid.

  */
  clearPreviousDisplayTrail() {
    //console.log("Clearing last trail");
    // dequeue the first element of the position history queue, which
    // represents the last trail left
    let lastPosX = this.movementQueueX.dequeue();
    let lastPosY = this.movementQueueY.dequeue();
    //console.log("Clearing last trailX " + lastPosX);
    //console.log("Clearing last trailY " + lastPosY);
    // Redraw over it with the same shape and fill color as bg
    push();
    noStroke();
    fill(120, 120, 120);
    ellipse(lastPosX, lastPosY, this.radius * 2.5);
    pop();
  }
}
