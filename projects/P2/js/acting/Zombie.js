/**
  A class that represents a simple zombie that moves
  on screen based on the player's position. It can move around
  the screen and be try to consume the player.

*/
class Zombie extends Prey {
  constructor(x, y, speed, fillColor, radius, avatarPic) {
    super(x, y, speed, fillColor, radius, avatarPic);
    this.healthGainPerEat = 1;
    this.attackValue = 0.05;
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
    const zombieStepFactor = 0.05;

    let currentDistance = dist(playerPosX, this.x, playerPosY, this.y);
    if (currentDistance >= minDistance) {
      // Change the velocity to the one-seventh of a distance
      this.vx = currentDistance / 7 * this.speed * zombieStepFactor;
      this.vy = currentDistance / 7 * this.speed * zombieStepFactor;

      // Update otherGender position to go towards the player depending on the distance
      // relative to the player at each successive call of this function
      if (this.x < playerPosX) {
        this.x += this.vx;
      } else {
        this.x -= this.vx;
      }
      if (this.y < playerPosY) {
        this.y += this.vy;
      } else {
        this.y -= this.vy;
      }
    }
    this.handleWrapping();
  }
  /**
    Damages the player when they overlap.

  */
  damagePlayer(player) {
    let distanceToPlayer = dist(this.x + this.avatarPic.width / 2, this.y + this.avatarPic.height / 2, player.x + player.avatarPic.width / 2, player.y + player.avatarPic.height / 2);
    if (distanceToPlayer < this.radius * 2) {
      if (player.health > 0) {
        player.health -= this.attackValue;
        console.log("This zombie is busy eating the player.");
      }
    }
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
