/**
  A class that represents a simple zombie that moves
  on screen based on a noise() function. It can move around
  the screen and be try to consume the player.

*/
class Zombie extends Prey {
  constructor(x, y, speed, fillColor, radius, avatarPic, zombieMode) {
    super(x, y, speed, fillColor, radius, avatarPic);
    // Zombie mode or not -- REMOVE not needed anymore.
    this.zombieMode = true;
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
