/**
  A class that represents a simple Survivor
  controlled by the arrow keys. It can move around and loses health if he does.

*/
class Survivor extends Human {
  constructor(x, y, speed, fillColor, radius, avatarPic, vx, vy, maxHealth, health, healthLossPerMove, healthGainPerEat) {
    super(x, y, speed, fillColor, radius, avatarPic, vx, vy, maxHealth, health);
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 1;
  }
  /**
    Takes a zombie object as an argument and checks if the survivor decides to cook it.
    (while it overlaps it and press shift) If so, reduces the prey's health and increases
    the Human's. If the prey dies, it gets reset.

  */
  handleEating(prey) {
    // Calculate distance from this Human to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + prey.radius) {
      // Increase Human health and constrain it to its possible range
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
  /**
    Draws the Human with a radius the same size as its current health.

  */
  displaySurvivalMode() {
    push();
    imageMode(CENTER);
    image(this.avatarPic, this.x, this.y, this.radius, this.radius);
    pop();
  }
  /**
    Tile-based movement upon keyPressed.

  */
  keyPressed(TILE_SIZE) {
    if(keyCode === LEFT_ARROW) {
      this.vx = -TILE_SIZE;
    }
    else if(keyCode === RIGHT_ARROW) {
      this.vx = TILE_SIZE;
    }
    else {
      this.vx = 0;
    }
    if(keyCode === UP_ARROW) {
      this.vy = -TILE_SIZE;
    }
    else if(keyCode === DOWN_ARROW) {
      this.vy = TILE_SIZE;
    }
    else {
      this.vy = 0;
    }
    this.x += this.vx;
    this.y += this.vy;
    this.handleWrapping();
  }
}
