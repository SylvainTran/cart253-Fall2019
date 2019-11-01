/**
  This class contains the data itself for our scenes.

*/
class SceneTable {
  constructor(filePath){
    this.filePath = filePath; //the scenesData.json to be loaded.
    this.sceneTable = {};
  }

  get sceneTable() {
    return this.sceneTable;
  }

  set sceneTable(value) {
    this.sceneTable = loadJSON(this.filePath); // Load the scene data from the JSON file
  }

  // Tests integrity by checking the number of properties inside each object
  // in the array.
  checkIntegrity() {
    console.log(this.filePath);
    console.log("sceneTable: " + this.sceneTable.length);
    let size = 0, objScene;
    for (let i = 0; i < sceneTable.length; i++) {
      objScene = this.sceneTable[i];
      size++;
    }
    console.log(size);
    if(size === 3){
      console.log("Pass");
    }
    else {
      console.log("Fail");
    }
  }
}
