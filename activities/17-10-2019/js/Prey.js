class Prey {
  constructor(x, y, radius, vx, vy, fillColor) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vx = vx;
    this.vy = vy;
    this.image = image;
  }

  move() {
    // Move
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);

    this.x = this.vx;
    this.y = this.vy;

    this.handleWrapping();

  }

  handleWrapping(){
    if (this.x < 0) {
      this.x += width;
    }
    else if (this.x > width) {
      this.x -= width;
    }
    if (this.y < 0) {
      this.y += height;
    }
    else if (this.y > height) {
      this.y -= height;
    }
  }

  display() {
    push();
    noStroke();
    fill(this.fillColor,this.health);
    this.radius = this.health;
    ellipse(this.x,this.y,this.radius * 2);
    pop();
  }

  reset() {
    this.health = this.maxHealth;
    this.x = random(0, width);
    this.y = random(0, height);
    this.radius = this.health;
  }
}
