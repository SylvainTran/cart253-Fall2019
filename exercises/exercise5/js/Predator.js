/**
  A class that represents a simple predator
  controlled by the arrow keys. It can move around
  the screen and consume Prey objects to maintain its health.

*/
class Predator {
  /**
    Sets the initial values for the Predator's properties
    Either sets default values or uses the arguments provided

  */
  constructor(x, y, speed, fillColor, radius, inputKeys, eatenPreyAmount, speedMultiplier, type, avatarPic) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    this.maxHealth = radius;
    this.health = this.maxHealth;
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 1;
    this.fillColor = fillColor;
    this.radius = this.health;
    // Input properties
    this.upKey = inputKeys.UP;
    this.downKey = inputKeys.DOWN;
    this.leftKey = inputKeys.LEFT;
    this.rightKey = inputKeys.RIGHT;
    // Tracks how many prey the predator has eaten.
    this.eatenPreyAmount = eatenPreyAmount;
    // For flexibility among predators' natural sprintingabilities
    this.speedMultiplier = speedMultiplier;
    // Sprint key
    this.sprintKey = inputKeys.SPRINT;
    // Type of predator (breed) and avatar pic
    this.type = type;
    this.avatarPic = avatarPic;
  }

  /**
   Checks if an arrow key is pressed and sets the predator's
   velocity appropriately.

  */
  handleInput() {
    // If sprinting.
    if (keyIsDown(this.sprintKey)) {
      console.log("sprinting");
      this.sprint();
      return;
    }
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    } else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    } else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    } else {
      this.vy = 0;
    }
  }

  /**
   Updates the position according to velocity
   Lowers health (as a cost of living)
   Handles wrapping

  */
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update health
    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 0, this.maxHealth);
    // Handle wrapping
    this.handleWrapping();
  }

  /**
    Handles input for sprinting.

  */
  sprint() {
    let boostedSpeed = this.speed * this.speedMultiplier;
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -boostedSpeed;
    } else if (keyIsDown(this.rightKey)) {
      this.vx = boostedSpeed;
    } else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -boostedSpeed;
    } else if (keyIsDown(this.downKey)) {
      this.vy = boostedSpeed;
    } else {
      this.vy = 0;
    }
  }

  /**
    Checks if the predator has gone off the canvas and
    wraps it to the other side if so

  */
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }

  /**
    Takes a Prey object as an argument and checks if the predator
    overlaps it. If so, reduces the prey's health and increases
    the predator's. If the prey dies, it gets reset.

  */
  handleEating(prey) {
    let d = dist(this.x, this.y, prey.x, prey.y);
    if (d < this.radius + prey.radius) {
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      prey.health -= this.healthGainPerEat;
      if (prey.health < 0) {
        this.eatenPreyAmount++;
        prey.reset();
      }
    }
  }

  /**
    Draw the predator on the canvas
    with a radius the same size as its current health.

  */
  display() {
    image(this.avatarPic, this.x, this.y, 128, 128);
  }

  /**
    Displays the amount of prey this predator has eaten.

  */
  displayEatenPrey(x, y) {
    push();
    fill(this.fillColor);
    textSize(32);
    text(this.type + " ate " + this.eatenPreyAmount + "!", x, y);
    pop();
  }
}
