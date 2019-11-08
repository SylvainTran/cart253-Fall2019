/**
  A class that represents a simple Prisoner controlled by the arrow keys. It can move around
  and attempt to break free from spiritual bondage.

*/
class Prisoner extends Human {
  constructor(x, y, speed, fillColor, radius, avatarPic, vx, vy, maxHealth, health) {
    super(x, y, speed, fillColor, radius, avatarPic, vx, vy, maxHealth, health);
    this.movementCombination = new Queue(4); // TODO remove hardcoded value
    this.stainOfDarkness = 255;
    this.sizeOfStainOfDarkness = 42;
    this.movementsCounter = 0;
  }
  /**
    Displays the key pressed by the prisoner.
    For the combination puzzle in the SpiritualDesert scene.

  */
  displayKeyPressed() {
    push();
    fill(this.stainOfDarkness);
    textSize(this.sizeOfStainOfDarkness);
    text(key, width / 2.5, height / 3); // Displays last key pressed.
    pop();
  }
  /**
    Tile-based movement upon keyPressed.

  */
  keyPressed(TILE_SIZE) {
    // Count the number of moves yet to handle displaying the fail message feedback in SpiritualDesert.js
    if(!this.movementCombination.isFull()) { // If we still have space in the queue
      this.movementsCounter++;
    }
    else {
      this.movementsCounter = 0; // Reset counter
    }
    if(keyCode === LEFT_ARROW) {
      this.vx = -TILE_SIZE;
      this.movementCombination.enqueue("left");
    }
    else if(keyCode === RIGHT_ARROW) {
      this.vx = TILE_SIZE;
      this.movementCombination.enqueue("right");
    }
    else {
      this.vx = 0;
    }
    if(keyCode === UP_ARROW) {
      this.vy = -TILE_SIZE;
      this.movementCombination.enqueue("up");
    }
    else if(keyCode === DOWN_ARROW) {
      this.vy = TILE_SIZE;
      this.movementCombination.enqueue("down");
    }
    else {
      this.vy = 0;
    }
    this.x += this.vx;
    this.y += this.vy;
    this.handleWrapping();
  }
}
