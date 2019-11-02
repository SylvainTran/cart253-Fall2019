/**
  A class that represents a simple Human
  controlled by the arrow keys. It can move around
  the screen and consume Prey objects to maintain its health.

*/
class Human extends MobileElement {
  constructor(x, y, speed, fillColor, radius, avatarPic) {
    super(x, y);
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth;
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
    this.avatarPic = avatarPic;
  }

  /**
    Takes a Prey object as an argument and checks if the Human
    overlaps it. If so, reduces the prey's health and increases
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
    Draw the Human as an ellipse on the canvas
    with a radius the same size as its current health.

  */
  display() {
    this.avatarPic.width = this.health;
    this.avatarPic.height = this.health;
    push();
    imageMode(CENTER);
    image(this.avatarPic, this.x, this.y, this.avatarPic.width * 20, this.avatarPic.height * 20);
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

  /**
    Checks if the Human has gone off the canvas and
    wraps it to the other side if so

  */
  handleWrapping() {
    push();
    imageMode(CENTER);
    if (this.x < 0 || this.x > width) {
      this.x = -this.vx;
    }
    if (this.y < 0 || this.y > height) {
      this.y = -this.vy;
    }
    pop();
  }

  /**
    Jittering animation for some scenes like the introduction scene.

  */
  jitterAnimation() {
    const animationsCount = 100;
    const frameSkip = 2;
    for(let i = 0; i <= animationsCount; i++) {
      if(frameCount % frameSkip) {
        this.x += random(-1, 1);
        this.y += random(-1, 1);
      }
    }
    this.handleWrapping();
  }
}
