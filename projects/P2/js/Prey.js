// Prey
//
// A class that represents a simple prey that moves
// on screen based on a noise() function. It can move around
// the screen and be consumed by Predator objects.

class Prey extends MobileElement{

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius, avatarPic) {
    super(x, y);
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

    this.avatarPic = avatarPic;
  }

  // move
  //
  // Sets velocity based on the noise() function and the Prey's speed
  // Moves based on the resulting velocity and handles wrapping
  move(canMove) {
    // Erase the previous display of this prey
    this.clearPreviousDisplayTrail();
    //this.handleWrapping();

    if(canMove) {
      // Update position
      this.x += this.vx;
      this.y += this.vy;
      // Add to a queue structure the history of movements past and future
      // So to be able to keep a track and clear the trails
      this.movementQueueX.enqueue(this.x);
      this.movementQueueY.enqueue(this.y);
    }
    else {
      this.handleWrapping();
      this.x += this.vx;
      this.y += this.vy;
      this.movementQueueX.enqueue(this.x);
      this.movementQueueY.enqueue(this.y);
    }
    this.tx += 0.01;
    this.ty += 0.02;
  }

  /**
    Check if the up, down, left, right tiles around the prey or predator
    trying to move is moveable to (empty space).

  */
  checkNeighbourTiles(tileMapExplorer) {
    //this.movementQueueX()
    this.vx = floor(map(noise(this.tx), 0, 1, -this.speed, this.speed));
    this.vy = floor(map(noise(this.ty), 0, 1, -this.speed, this.speed));

    let currentX = this.x;
    let currentY = this.y;

    let anticipatedX = floor(currentX += this.vx);
    let anticipatedY = floor(currentY += this.vy);

    let constrainedX = constrain(anticipatedX, 0, 639);
    let constrainedY = constrain(anticipatedY, 0, 639);

    //if(tileMapExplorer.tileMap[constrainedX][constrainedY].elementType === spaceTypeId.EMPTY) {
    //  //console.log("Ok moving to empty tile...");
    //  return true;
    //}
    //else {
      //console.log("Not moving there... So it's a wall. Bouncing from there instead.");
      //console.log(tileMapExplorer.tileMap[constrainedX][constrainedY].elementPositionX);
      //console.log(tileMapExplorer.tileMap[constrainedX][constrainedY].elementPositionY);
    //  return false;
    //}
  }

  // handleWrapping
  //
  // Checks if the prey has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    const innerMargins = 50;
    const radiusOffset = 1.5;
    if (this.x - this.radius * radiusOffset < 0 + innerMargins || this.x + this.radius * radiusOffset > width - innerMargins * 2) {
      console.log("handling non-BORDER wrapping");
      this.vx = -this.vx * 50;
    }
    if (this.y - this.radius * radiusOffset < 0 + innerMargins || this.y + this.radius * radiusOffset > height - innerMargins) {
      console.log("handling non-BORDER wrapping");
      this.vy = -this.vy * 50;
    }
    // if (this.x - this.radius * radiusOffset <= 0 || this.x + this.radius * radiusOffset >= 639) {
    //   //alert("handling BORDER wrapping X");
    //   this.vx = -this.vx * 50;
    // }
    // if (this.y - this.radius * radiusOffset <= 0 || this.y + this.radius * radiusOffset >= 639) {
    //   //alert("handling BORDER wrapping Y");
    //   this.vy = -this.vy * 50;
    // }
  }

  // display
  //
  // Draw the predator as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    this.radius = this.health;
    image(this.avatarPic, this.x, this.y, this.radius * 2);
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
    this.radius = this.maxHealth;
    rect(this.lastPosX, this.lastPosY, this.radius * 10);
    pop();
  }
}
