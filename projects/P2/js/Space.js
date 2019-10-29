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
    Displays a tile border around this space element for style,
    on the gridLayer.

  */
  displayTile(gridLayer, fillColor, TILE_SIZE) {
    gridLayer.push();
    gridLayer.rectMode();
    gridLayer.fill(fillColor);
    gridLayer.stroke(255);
    gridLayer.strokeWeight(5);
    gridLayer.rect(this.x, this.y, TILE_SIZE, TILE_SIZE);
    gridLayer.pop();
  }

  /**
    Call back event for when this object is clicked.

  */
  clicked() {

  }
}
