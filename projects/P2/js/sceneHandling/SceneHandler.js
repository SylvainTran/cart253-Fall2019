/**
  Handles the scenes: checks current scene index, and if the game state
  requests to change to the next scene.

*/
class SceneHandler {
  constructor(sceneObjects, sceneConfig) {
    this.sceneObjects = sceneObjects;
    // Start at the main menu
    this.currentSceneName = sceneConfig.mainMenuScene.sceneName;
  }

  // A simple hash table that boots the current SceneObject as defined by its name in the scene config
  process() {
    this.sceneObjects[this.currentSceneName].bootScene();
  }

  trackProcessedScenes() {

  }

  nextScene(){
    // Go to the next scene by its index
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

//   previousScene(){
//
//   }
//
//   resetGame(){
//
//   }

}
