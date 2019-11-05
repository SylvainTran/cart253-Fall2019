/**
  Creates a tile map and the things related to it.

*/
class TileMapFactory {
  constructor(tileMapSize, tileMapExplorer) {
    this.tileMapWidth = tileMapSize;
    thils.tileMapHeight = tileMapHeight;
    this.tileMapExplorer = tileMapExplorer; // TODO refactor out in a handler class?
  }
  /**
    Creates a two-dimensional and empty tile map so to be able
    to organize the canvas elements and some screen
    behaviours.

  */
  createEmptyTileMap(gridLayer, tileMapSize) {
    // Fill the tileMap array with an array in each of its
    // elements.
    console.log("Creating an empty tile map. Size = " + tileMapSize);
    for(let k = 0; k < tileMapSize; k+= TILE_SIZE) {
      tileMap[k] = [];
      for(let m = 0; m < tileMapSize; m+= TILE_SIZE) {
        // We add empty spaces first--TODO don't add where there is going to be walls
        let newSpace = new Space(k, m);
        tileMap[k][m] = newSpace;
        tileMap[k][m].displayTile(gridLayer, color(0, 120, 255, 15), TILE_SIZE);
      }
    }
  }

  /**
    Fills the tiles in the tileMap with Wall static elements to create borders.
    TDDO to be implemented in an interactive way instead.

  */
  createWallElements(tileMapWidth, tileMapHeight) {
    let newWallElement;

    for(let k = 0; k < tileMapWidth; k++) {
      for(let m = 0; m < tileMapHeight; m++) {

      }
    }
  }

  /**
    Snaps mousePosX on the gridmap.

  */
  gridSnapX(mouseX, mouseY) {
    let gridSnappedValue;

    return gridSnappedValue;
  }

  /**
    Snaps mousePosY on the gridmap.

  */
  gridSnapY() {

  }

  /**
    Create a new settlement inside the canvas at mouse position X, Y.

  */
  createSettlement(tileMapWidth, tileMapHeight) {
    let newSettlement;
    //let gridConstrainedX = gridSnapX(mouseX, mouseY);
    //let gridConstrainedY = gridSnapY(mouseX, mouseY);
    newSettlement = new Settlement(mouseX, mouseY);
    //newSettlement = new Settlement(gridConstrainedX, gridConstrainedY);
    newSettlement.drawSettlement(environmentLayer, TILE_SIZE);
  }
}
