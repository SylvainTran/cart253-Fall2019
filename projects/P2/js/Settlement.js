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
  drawSettlement() {
    console.log("drawing settlement");
    push();
    rectMode(CENTER);
    fill(255, 0, 0);
    rect(this.x, this.y, 100, 100);
    pop();
  }
}
