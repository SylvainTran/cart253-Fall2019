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
}
