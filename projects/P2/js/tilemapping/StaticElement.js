/**
  The base class for elements that are static in the game.

*/
class StaticElement extends Element {
  constructor(x, y) {
    super(x, y);
    this.elementType = spaceTypeId.DEFAULT;
  }
  /**
    Returns the position (x) of this space object.

  */
  get elementPositionX() {
    return this.x;
  }
  /**
    Returns the position (y) of this space object.

  */
  get elementPositionY() {
    return this.y;
  }
}
