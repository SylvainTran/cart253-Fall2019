// Prey
//
// A class that represents a simple prey that moves
// on screen based on a noise() function. It can move around
// the screen and be consumed by Predator objects.

class Prey {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.fillColor = fillColor;
    this.radius = this.health;

    this.lastPosX = this.x;
    this.lastPosY = this.y;
    // Movement history inside a queue
    this.movementQueueX = new Queue(1);
    this.movementQueueY = new Queue(1);
  }

  // move
  //
  // Sets velocity based on the noise() function and the Prey's speed
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);

    // Erase the previous display of this prey
    this.clearPreviousDisplayTrail();
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    //console.log("Queuing trailX" + this.x);
    //console.log("Queuing trailY" + this.y);

    // Add to a queue structure the history of movements past and future
    // So to be able to keep a track and clear the trails
    this.movementQueueX.enqueue(this.x);
    this.movementQueueY.enqueue(this.y);

    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the prey has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    }
    else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    }
    else if (this.y > height) {
      this.y -= height;
    }
  }

  // display
  //
  // Draw the prey as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    fill(this.fillColor);
    this.radius = this.health;
    ellipse(this.x, this.y, this.radius * 2);
    pop();
  }

  // reset
  //
  // Set the position to a random location and reset health
  // and radius back to default
  reset() {
    // Random position
    this.x = random(0, width);
    this.y = random(0, height);
    // Default health
    this.health = this.maxHealth;
    // Default radius
    this.radius = this.health;
  }

  /**
    Clears the previously drawn trail using the tileMap grid.

  */
  clearPreviousDisplayTrail() {
    //console.log("Clearing last trail");
    // dequeue the first element of the position history queue, which
    // represents the last trail left
    this.lastPosX = this.movementQueueX.dequeue();
    this.lastPosY = this.movementQueueY.dequeue();
    //console.log("Clearing last trailX " + this.lastPosX);
    //console.log("Clearing last trailY " + this.lastPosY);
    // Redraw over it with the same shape and fill color as bg
    push();
    noStroke();
    fill(120, 120, 120);
    ellipse(this.lastPosX, this.lastPosY, this.radius * 2.5);
    pop();
  }
}
