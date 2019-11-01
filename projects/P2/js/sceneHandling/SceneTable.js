/**
  This class contains the data itself for our scenes.

*/
class SceneTable {
  constructor(filePath, fileName){
    this.filePath = filePath;
    this.sceneTable = [];
  }

  /**
    Load the scene data from the JSON file.

  */
  loadScenes() {
    this.sceneTable = loadJSON(this.filePath);
  }

  /**
    Gets the scene array.

  */
  get sceneTable() {
    return this.sceneTable;
  }
}
