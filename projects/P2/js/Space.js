/**
  The static elements that are a traversable space.
  This includes spots where things may be generated from, such
  as a soil spot and checkpoints for settlements' build locations.

*/
class Space extends StaticElement {
  constructor(x, y) {
    super(x, y);
    this.elementType = spaceTypeId.EMPTY;
  }

  /**
    Returns the space type id for this space object.


  get spaceTypeId() {
    return this.spaceTypeId;
  }
  */

  /**
    Returns the space type id for this space object.


  set spaceTypeId(spaceTypeId) {
    this.spaceTypeId = spaceTypeId;
  }
  */

  /**
    Returns the position (x) of this space object.

  */
  get spacePositionX() {
    return this.x;
  }

  /**
    Returns the position (y) of this space object.

  */
  get spacePositionY() {
    return this.y;
  }

  /**
    Returns the current array of generated spaces in the world.

  */
  get spaceArray() {

  }
}
