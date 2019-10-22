/**
  The static Wall elements that are a non-traversable space.

*/
class Wall extends StaticElement {
  constructor(x, y, wallTypeId) {
    super(x, y);
    this.elementType = "WALL";
    this.wallTypeId = wallTypeId;
  }

  /**
    Returns the space type id for this space object.


  get wallTypeId() {
    return this.wallTypeId;
  }
  */

  /**
    Returns the space type id for this space object.


  set wallTypeId(wallTypeId) {
    this.wallTypeId = wallTypeId;
  }
  */

  /**
    Returns the position (x) of this space object.

  */
  get wallPositionX() {
    return this.x;
  }

  /**
    Returns the position (y) of this space object.

  */
  get wallPositionY() {
    return this.y;
  }

  /**
    Returns the current array of generated spaces in the world.

  */
  get wallArray() {

  }

  /**
    Draws a wall picture at the specified position.

  */
  drawWall() {
    push();
    fill(120, 120, 120);
    rect(this.x, this.y, 40, 40);
    pop();
  }
}
