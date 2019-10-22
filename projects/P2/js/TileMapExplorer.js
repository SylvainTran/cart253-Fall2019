/**
  The decorator class that gives us information about the tile map's
  walkable tiles and the paths that are supposed to be taken next by the
  mobile element.

*/
class TileMapExplorer {
  constructor(tileMap) {
    this.tileMap = tileMap;
    this.walkableTiles = [];
    this.paths = new Queue();
  }

  /**
    Charts walkable tiles and stores them in an array.

  */
  chartTileMap(tileMap) {
    // iterate through the tileMap, starting at location 0, 0 (top left).
    // chart all the walkable spaces on this map. -> decorator class to do this only?
    for(let k = 0; k <= tileMapSize; k++) {
      tileMap[k] = [];
      for(let m = 0; m <= tileMapSize; m++) {
        if(tileMap[k][m].elementType === "SPACE") {
          // we're on a space element. Is it walkable? Occupied?
        }
        //console.log("Coords X" + tileMap[k][m].spaceTypeId);
        //console.log("Coords X" + tileMap[k][m].spacePositionX);
        //console.log("Coords Y" + tileMap[k][m].spacePositionY);
      }
    }


    // starting at the mobile element's current position x, y, check if the desired movement
    // is walkable and un-occupied by something (e.g., a building or another person)
    // the desired movement is always 100px in stride in all four directions (not diagonal) from current position x, y
    // move only after a delay of 2 seconds or something
  }
}
