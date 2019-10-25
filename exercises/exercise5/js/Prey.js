/**
 A class that represents a simple prey that moves
 on screen based on a noise() function. It can move around
 the screen and be consumed by Predator objects.

*/
class Prey {

  /**
   Sets the initial values for the Predator's properties
   Either sets default values or uses the arguments provided

  */
  constructor(x, y, speed, fillColor, avatarPic, radius) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    this.tx = random(0, 1000);
    this.ty = random(0, 1000);
    this.maxHealth = radius;
    this.health = this.maxHealth;
    this.fillColor = fillColor;
    this.avatarPic = avatarPic;
    this.radius = this.health;
  }

  /**
    Sets velocity based on the noise() function and the Prey's speed
    Moves based on the resulting velocity and handles wrapping

  */
  move() {
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    this.x += this.vx;
    this.y += this.vy;
    this.tx += 0.01;
    this.ty += 0.01;
    this.handleWrapping();
  }

  /**
   Checks if the prey has gone off the canvas and
   wraps it to the other side if so

  */
  handleWrapping() {
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }

  /**
   Draw the prey on the canvas
   with a radius the same size as its current health.

   */
  display() {
    this.radius = this.health;
    image(this.avatarPic, this.x, this.y, this.radius * 2);
  }

  /**
    Set the position to a random location and reset health
    and radius back to default
  */
  reset() {
    // Random position
    this.x = random(0, width);
    this.y = random(0, height);
    // Default health
    this.health = this.maxHealth;
    // Default radius
    this.radius = this.health;
  }
}
