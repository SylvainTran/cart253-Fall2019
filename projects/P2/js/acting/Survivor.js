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
    this.radius = this.health * 10;
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
      this.health -= this.healthLossPerMove;
    }
    else if(keyCode === RIGHT_ARROW) {
      this.vx = TILE_SIZE;
      this.health -= this.healthLossPerMove;
    }
    else {
      this.vx = 0;
      this.health -= this.healthLossPerMove;
    }
    if(keyCode === UP_ARROW) {
      this.vy = -TILE_SIZE;
      this.health -= this.healthLossPerMove;
    }
    else if(keyCode === DOWN_ARROW) {
      this.vy = TILE_SIZE;
      this.health -= this.healthLossPerMove;
    }
    else {
      this.vy = 0;
    }
    this.x += this.vx;
    this.y += this.vy;
    this.handleWrapping();
  }

  /**
    Vocalize your suffering by displaying captions above your head.

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
      timesComplained+= 100;
    }
    return timesComplained;
  }
}
