/**
  The types of space tiles.

*/
let spaceTypeId = {
  EMPTY: 1, // Default tile. Can walk on this tile.
  START: 2, // Player or enemy starting position.
  BUILD_LOCATION: 3, // Build location for objects.
  BATTLE_LOCATION: 4, // Location for battle events.
  CHANGE_SCENE: 5, // Change scene point location.
  BORDER: 6, // Wall borders.
}
