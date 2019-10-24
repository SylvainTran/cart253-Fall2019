/**
  The static Wall elements that are a non-traversable space.

*/
class Wall extends StaticElement {
  constructor(x, y) {
    super(x, y);
    this.elementType = spaceTypeId.BORDER;
  }

  /**
    Draws a wall picture at the specified position.

  */
  drawWall() {
    push();
    rectMode(CENTER);
    fill(255, 0, 0);
    rect(this.x, this.y, 20, 20);
    pop();
  }
}
