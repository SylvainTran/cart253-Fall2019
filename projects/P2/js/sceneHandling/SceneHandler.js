/**
  Handles the scenes: checks current scene index, and if the game state
  requests to change to the next scene.

*/
class SceneHandler {
  // Internal "private" property. Game starts at 0 by default, which is also narratively also the main menu

  constructor(currentScene, sceneObjects) {
    this.currentScene = currentScene;
    this.sceneObjects = sceneObjects;
  }

  process() {
    let currentSc = this.currentScene;
    let sceneObjs = this.sceneObjects;
    sceneObjs.currentSc.bootScene();
  }

  testSceneText(){
    console.log(this.currentSceneIndex);
  }

//   checkPlayerReadyForNextScene(currentSceneIndex) {
//     // depending on the scene, certain screen boundaries are open for going to the next scene
//     switch (currentScene) {
//       case "eden1":
//         sceneExit("DOWN");
//         break;
//       case "eden2":
//         sceneExit("LEFT");
//         break;
//       case "eden3":
//         sceneExit("TOP");
//         break;
//       case "forbiddenFruitScene":
//         if (!prefallenState) { //fallen state starts after player collides with fruit
//           nextScene();
//         }
//         break;
//       case "playgrounds1":
//         sceneExit("RIGHT");
//         break;
//       case "playgrounds2": // At this point the game is over
//         if (otherGenderEaten === 7) {
//           gameOver = true;
//         }
//         break;
//       default:
//         break;
//     }
//   }
//
//   nextScene(){
//     // Go to the next scene by its index
//     if (sceneTable.isEmpty()) {
//       return;
//     } else {
//     let nextScene = sceneQueue.dequeue();
//     currentScene = nextScene;
//     goToScene(currentScene);
// }
//     this.sceneTable.sceneIndex
//   }
//
//   previousScene(){
//
//   }
//
//   resetGame(){
//
//   }

}
