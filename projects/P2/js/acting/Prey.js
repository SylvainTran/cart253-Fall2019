/**
  A class that represents a simple prey that moves
  on screen based on a noise() function. It can move around
  the screen and be consumed by Predator objects.

*/
class Prey extends MobileElement {
  constructor(x, y, speed, fillColor, radius, avatarPic) {
    super(x, y);
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // Avatar pic
    this.avatarPic = avatarPic;
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

    // Property that checks if this actor has passed beyond the canvas' borders already. Mainly for zombie mode,
    // To be added as part of the game later.
    this.passedScreenBorders = false;
  }
  /**
    Gradually enlarges in width and height.
    Z position illusion effect.

  */
  enlarge(){
    this.avatarPic.width += 0.01;
    this.avatarPic.height += 0.01;
  }
  /**
    Sets velocity based on the noise() function and the Prey's speed
    Moves based on the resulting velocity and handles wrapping

  */
  move() {
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.x += this.vx;
    this.y += this.vy;
    this.enlarge();
    this.handleWrapping();
  }
  /**
    Check if the up, down, left, right tiles around the prey or predator
    trying to move is moveable to (empty space).
    TO BE IMPLEMENTED.

  */
  checkNeighbourTiles(tileMapExplorer) {
    // TODO
    // return true if neighbours are checked and assessed as ok.
    // do this by adding paths in a queue and stopping when the path is obsolete
    // or a valid path is found
    // pop the found path and return the itinary back or simply return a "can move" instead
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
      this.passedScreenBorders = true;
    }
    if (this.y - this.avatarPic.width / 2 < 0 + innerMargins || this.y + this.avatarPic.width / 2 > height - innerMargins) {
      this.vy = -this.vy * 50;
      this.passedScreenBorders = true;
    }
    pop();
  }
  /**
    Draw the prey as per the provided avatar pic.

  */
  display() {
    const sizeMultiplier = 5;
    // Big fleshy effect
    push();
    imageMode(CENTER);
    this.radius = this.health;
    image(this.avatarPic, this.x, this.y, this.avatarPic.width * sizeMultiplier, this.avatarPic.height * sizeMultiplier);
    pop();
  }
  /**
    Set the position to a random location and reset health
   and radius back to default. Not used currently.

  */
  reset() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.health = this.maxHealth;
    this.radius = this.health;
    this.passedScreenBorders = false;
  }
}
