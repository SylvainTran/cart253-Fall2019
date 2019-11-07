/**
  A class that represents a simple Survivor
  controlled by the arrow keys. It can move around and loses health if he does.

*/
class Prisoner extends Human {
  constructor(x, y, speed, fillColor, radius, avatarPic, vx, vy, maxHealth, health) {
    super(x, y, speed, fillColor, radius, avatarPic, vx, vy, maxHealth, health);
    this.movementCombination = new Queue(4);
  }
  /**
    Displays the key pressed. For the combination puzzle in the SpiritualDesert scene.

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
      this.timesMovedRight++;
      this.movementCombination.enqueue("right");
      console.log("right");
    }
    else {
      this.vx = 0;
    }
    if(keyCode === UP_ARROW) {
      this.vy = -TILE_SIZE;
      this.timesMovedUp++;
      this.movementCombination.enqueue("up");
      console.log("up");
    }
    else if(keyCode === DOWN_ARROW) {
      this.vy = TILE_SIZE;
      this.timesMovedDown++;
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
      timesComplained += 100;
    }
    return timesComplained;
  }
}
