/**
  The elements that are mobile in the game.

*/
class MobileElement extends Element {
  constructor(x, y) {
    super(x, y);
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
  }
  /**
    Moves the mobile element according to the tile map. This is what all the preys
    and predators inherit by default.

  */
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
    // Handle wrapping
    this.handleWrapping();
  }
  /**
    Checks if the prey has gone off the canvas and
    wraps it to the other side if so

   */
  handleWrapping() {
    const innerMargins = 50;
    // Off the left or right
    if (this.x < 0 + innerMargins) {
      this.x += width - innerMargins;
    } else if (this.x > width - innerMargins) {
      this.x -= width + innerMargins;
    }
    // Off the top or bottom
    if (this.y < 0 + innerMargins) {
      this.y += height - innerMargins;
    } else if (this.y > height - innerMargins) {
      this.y -= height + innerMargins;
    }
  }
  /**
    Jittering animation for some scenes like the introduction scene.
    Works for all mobile elements.

  */
  jitterAnimation() {
    const animationsCount = 100;
    const frameSkip = 2;
    for (let i = 0; i <= animationsCount; i++) {
      if (frameCount % frameSkip) {
        this.x += random(-1, 1);
        this.y += random(-1, 1);
      }
    }
    this.handleWrapping();
  }
  /**
    Staying still animation for some scenes like the introduction scene.
    Works for all mobile elements.

  */
  stayingStillAnimation() {
    this.x = random(0, width);
    this.y = random(0, height);
    // TODO display in a sine function instead
    this.handleWrapping();
  }
}
