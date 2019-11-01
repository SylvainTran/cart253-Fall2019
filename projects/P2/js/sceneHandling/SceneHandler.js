/**
  Allows us to handle timing related code for scenes and keeping track
  of the overall process of the game.

*/
class SceneHandler {

  constructor(sceneTable) {
    // SceneQueue contains the Scene objects, that contains the text objects

  }

  nextScene(){
    // Go to the next scene by its index
    if (sceneTable.isEmpty()) {
      return;
    } else {
    let nextScene = sceneQueue.dequeue();
    currentScene = nextScene;
    goToScene(currentScene);
  }
    this.sceneTable.sceneIndex
  }

  previousScene(){

  }

  resetGame(){

  }

}
