/**
  The static Wall elements that are a non-traversable space.

*/
class Settlement extends StaticElement {
  constructor(x, y) {
    super(x, y);
    this.elementType = spaceTypeId.BUILD_LOCATION;
  }

  /**
    Draws a wall picture at the specified position.

  */
  drawSettlement(environmentLayer, settlementSize) {
    console.log("drawing settlement");
    environmentLayer.push();
    environmentLayer.rectMode(CENTER);
    environmentLayer.fill(255, 0, 0);
    environmentLayer.rect(this.x, this.y, settlementSize, settlementSize);
    environmentLayer.pop();
  }
}
