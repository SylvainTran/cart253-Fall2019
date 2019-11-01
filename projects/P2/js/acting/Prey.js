/**
  A class that represents a simple prey that moves
  on screen based on a noise() function. It can move around
  the screen and be consumed by Predator objects.

*/
class Prey extends MobileElement{
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

  /**
    Sets velocity based on the noise() function and the Prey's speed
    Moves based on the resulting velocity and handles wrapping

  */
  move(canMove) {
    if(canMove) {
      this.x += this.vx;
      this.y += this.vy;
    }
    else {
      this.handleWrapping();
      this.x += this.vx;
      this.y += this.vy;
    }
    this.tx += 0.01;
    this.ty += 0.02;
  }

  /**
    Check if the up, down, left, right tiles around the prey or predator
    trying to move is moveable to (empty space).

  */
  checkNeighbourTiles(tileMapExplorer) {
    this.vx = random(-1, 1); //floor(map(noise(this.tx), 0, 1, -this.speed, this.speed));
    this.vy = random(-1, 1); //floor(map(noise(this.ty), 0, 1, -this.speed, this.speed));
    this.avatarPic.width += 0.01;
    this.avatarPic.height += 0.01;

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

  /**
    Checks if the prey has gone off the canvas and
    wraps it to the other side if so

  */
  handleWrapping() {
    const innerMargins = 50;
    const radiusOffset = 1.5;
    push();
    imageMode(CENTER);
    if (this.x - this.avatarPic.width / 2 < 0 + innerMargins || this.x + this.avatarPic.width / 2 > width - innerMargins * 2) {
      this.vx = -this.vx * 50;
    }
    if (this.y - this.avatarPic.width / 2 < 0 + innerMargins || this.y + this.avatarPic.width / 2 > height - innerMargins) {
      this.vy = -this.vy * 50;
    }
    pop();
  }

  /**
    Draw the predator as an ellipse on the canvas
    with a radius the same size as its current health.

  */
  display() {
    push();
    imageMode(CENTER); // Big fleshy effect
    this.radius = this.health;
    image(this.avatarPic, this.x, this.y, this.avatarPic.width * 5, this.avatarPic.height * 5);
    pop();
  }

  /**
    Set the position to a random location and reset health
   and radius back to default

  */
  reset() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.health = this.maxHealth;
    this.radius = this.health;
  }
}
