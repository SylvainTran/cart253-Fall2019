/**
  A class that represents a simple Survivor
  controlled by the arrow keys. It can move around and loses health if he does.

*/
class Survivor extends Human {
  constructor(x, y, speed, fillColor, radius, avatarPic, vx, vy, maxHealth, health, healthLossPerMove, healthGainPerEat) {
    super(x, y, speed, fillColor, radius, avatarPic, vx, vy, maxHealth, health);
    this.healthLossPerMove = 0.05;
    this.healthGainPerEat = 1;
  }
  /**
    Takes an object as an argument and checks if the survivor decides to cook it.
    (while it overlaps it and press shift) If so, reduces the food's health and increases
    the Human's. If the food dies, it gets reset.

  */
  handleEating(food) {
    // Calculate distance from this Human to the food
    let d = dist(this.x, this.y, food.x, food.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + food.radius) {
      // Increase Human health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease food health by the same amount
      food.health -= this.healthGainPerEat;
      // Check if the food died and reset it if so
      if (food.health < 0) {
        food.reset();
      }
    }
  }
  /**
    Constrains the health to 0 to maxHealth.

  */
  checkHealth() {
    this.health = constrain(this.health, 0, this.maxHealth);
    if(this.health <= 0) {
      return true;
    }
    else {
      return false;
    }
  }
  /**
    Draws the Human with a radius the same size as its current health.
    Currently magnified display using the health as a base to
    initially create a shrinking effect.

  */
  displaySurvivalMode() {
    this.radius = this.health * 10;
    push();
    imageMode(CENTER);
    image(this.avatarPic, this.x, this.y, this.radius, this.radius);
    pop();
  }
  /**
    Tile-size based movement upon keyPressed.

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
    console.log("New health: " + this.health);
  }
  /**
    Vocalize your suffering by displaying captions above your head.
    TODO threshold for times complained in sceneData

  */
  protestOutloud(sceneData, timesComplained) {
    if(keyCode === ENTER) {
      if(timesComplained <= 30) {
        push();
        fill(sceneData.textColor);
        textSize(sceneData.tSize);
        text(sceneData.subtitles[0], this.x - this.avatarPic.width, this.y - this.avatarPic.height - this.radius);
        pop();
      }
      else if(timesComplained <= 60) {
        push();
        fill(sceneData.textColor2);
        textSize(sceneData.tSize * 1.2);
        text(sceneData.subtitles[1], this.x - this.avatarPic.width, this.y - this.avatarPic.height - this.radius);
        pop();
      }
      else if(timesComplained <= 120) {
        push();
        fill(sceneData.textColor3);
        textSize(sceneData.tSize * 1.4);
        text(sceneData.subtitles[2], this.x - this.avatarPic.width, this.y - this.avatarPic.height - this.radius);
        pop();
      }
      else if(timesComplained <= 180) {
        push();
        fill(sceneData.textColor4);
        textSize(sceneData.tSize * 1.6);
        text(sceneData.subtitles[3], this.x - this.avatarPic.width, this.y - this.avatarPic.height - this.radius);
        pop();
      }
      else if(timesComplained <= 266) {
        push();
        fill(sceneData.textColor4);
        textSize(sceneData.tSize * 2);
        text(sceneData.subtitles[4], this.x - this.avatarPic.width, this.y - this.avatarPic.height - this.radius);
        pop();
      }
      timesComplained++;
    }
    return timesComplained;
  }
}
