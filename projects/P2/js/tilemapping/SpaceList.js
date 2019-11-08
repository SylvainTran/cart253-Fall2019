/**
  Decorator class that keeps track of the space elements set in a space array.

*/
class SpaceList {
  constructor(spaceArray) {
    this.spaceArray = spaceArray;
  }
  /**
    Returns the current array of generated spaces in the world.

  */
  get spaceArray() {
    return this.spaceArray;
  }
}
