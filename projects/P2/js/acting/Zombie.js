/**
  A class that represents a simple zombie that moves
  on screen based on a noise() function. It can move around
  the screen and be try to consume the player.

*/
class Zombie extends Prey {
  constructor(x, y, speed, fillColor, radius, avatarPic) {
    super(x, y, speed, fillColor, radius, avatarPic);
  }

  /**
    Seeks the player in order to eat them.

  */
  seekPlayer(player) {
    // get the current distance from the player
    let playerPosX = player.x;
    let playerPosY = player.y;
    const minDistance = 20;
    const maxDistance = minDistance * 2;
    const zombieStepFactor = 0.10;

    let currentDistance = dist(playerPosX, this.x, playerPosY, this.y);
    if (currentDistance >= minDistance) {
      // Advance to the one-seventh of a distance
      this.vx = currentDistance / 7;
      this.vy = currentDistance / 7;

      // Update otherGender position to go towards the player depending on the distance
      // relative to the player at each successive call of this function
      if (this.x < playerPosX) {
        this.x += this.vx * zombieStepFactor;
      } else {
        this.x -= this.vx * zombieStepFactor;
      }
      if (this.y < playerPosY) {
        this.y += this.vy * zombieStepFactor;
      } else {
        this.y -= this.vy * zombieStepFactor;
      }
    }
    this.handleWrapping();
  }
  /**
    Draw the prey as per the provided avatar pic and radius as per health.

  */
  displayZombieMode() {
    push();
    imageMode(CENTER); // Big fleshy effect
    this.avatarPic.width = this.health * 10;
    this.avatarPic.height = this.health * 10;
    image(this.avatarPic, this.x, this.y, this.avatarPic.width, this.avatarPic.height);
    pop();
  }
}
