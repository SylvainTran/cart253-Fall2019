/**
  A class that represents a simple Prisoner controlled by the arrow keys. It can move around
  and attempt to break free from spiritual bondage.

*/
class Prisoner extends Human {
  constructor(x, y, speed, fillColor, radius, avatarPic, vx, vy, maxHealth, health) {
    super(x, y, speed, fillColor, radius, avatarPic, vx, vy, maxHealth, health);
    this.movementCombination = new Queue(4); // TODO remove hardcoded value
  }
  /**
    Displays the key pressed by the prisoner.
    For the combination puzzle in the SpiritualDesert scene.

  */
  displayKeyPressed() {
    push();
    fill(255);
    textSize(42);
    text(key, width / 2, height / 3); // Display last key pressed.
    pop();
  }
  /**
    Tile-based movement upon keyPressed.

  */
  keyPressed(TILE_SIZE) {
    if(keyCode === LEFT_ARROW) {
      this.vx = -TILE_SIZE;
      this.movementCombination.enqueue("left");
      console.log("left");
    }
    else if(keyCode === RIGHT_ARROW) {
      this.vx = TILE_SIZE;
      this.movementCombination.enqueue("right");
      console.log("right");
    }
    else {
      this.vx = 0;
    }
    if(keyCode === UP_ARROW) {
      this.vy = -TILE_SIZE;
      this.movementCombination.enqueue("up");
      console.log("up");
    }
    else if(keyCode === DOWN_ARROW) {
      this.vy = TILE_SIZE;
      this.movementCombination.enqueue("down");
      console.log("down");
    }
    else {
      this.vy = 0;
    }
    this.x += this.vx;
    this.y += this.vy;
    this.handleWrapping();
    console.log("New health: " + this.health);
  }
}
