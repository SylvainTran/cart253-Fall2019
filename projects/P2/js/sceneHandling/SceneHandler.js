/**
  Handles the scenes: checks current scene index, and if the game state
  requests to change to the next scene.

*/
class SceneHandler {
  constructor(sceneObjects, sceneConfig) {
    // Scene data: the objects and the config file
    this.sceneObjects = sceneObjects;
    this.sceneConfig = sceneConfig;
    // Start at the main menu. This property is used to know which is the current scene
    this.currentSceneName = sceneConfig.mainMenuScene.sceneName;
    // A string property that keeps the name of the previous game scene (non-menu type)
    this.previousGameScene = "";
    // Property that shields us from the discrepancy between mousePressed() events and process() calls
    this.sceneWasChanged = false;
    // The property that tells us which scene where change to
    this.goingToScene = "";
    // Scene management structures: maxScenes = 2 allows us to have two scenes at the same time (the previous scene history + the current game scene
    // or the current game scene + a game menu)
    this.maxScenes = 2;
    this.processingQueue = new Queue(this.maxScenes); // Will allow for defensive gating logic later
    this.currentSceneQueue = new Queue(this.maxScenes);
    // Updates the current scene queue initially
    this.currentSceneQueue.enqueue(this.currentSceneName);
  }

  /**
    A series of simple hash tables. Boots the current SceneObject as defined by its name in the scene config
    Checks if the scene was changed too for an updates flag (to prevent non-scene changes to trigger a next scene).
    This function is only concerned with the current scene's properties and ignores other scenes.

  */
  process() {
    this.trackProcessedScenes();
    // Boots the current scene's update functions, by referring to its name.
    this.sceneObjects[this.currentSceneName].updateScene();
    // Updates the sceneWasChanged flag gating (to prevent discrepancy between mousePressed() and process()
    if(this.sceneWasChanged === true) {
      this.sceneConfig[this.currentSceneName].readyForNextScene = true;
    }
    else {
      this.sceneConfig[this.currentSceneName].readyForNextScene = false;
    }
  }

  /**
    Checks what's going on within the scenes.
    The sceneWasChanged property is only set to true if this event
    occurred in a change scene type of event.

  */
  handleSceneMouseEvent(sceneMouseEvent) {
    switch(sceneMouseEvent) {
      case "Starting Game":
        console.log(sceneMouseEvent);
        // Flags that we just changed scene
        this.sceneWasChanged = true;
        // The following line tells us which is the new scene
        this.goingToScene = "introduction";
        break;
      case "Exiting Game":
        console.log("Exiting game.");
        document.write("Bye! Live your day as if it were the last. Take care of yourself, your loved ones, and your enemies as well. Enjoy your life with gratitude and there won't be any regrets :-). God loves you more than you think!");
        break;
      case "Human Body":
        this.sceneWasChanged = true;
        console.log("sceneMouseEvent over Human body");
        this.goingToScene = "movementTutorial";
        break;
      default:
        break;
    }
    if(this.sceneConfig[this.currentSceneName].readyForNextScene) {
      this.changeScene();
      console.log(this.currentSceneName);
      console.log(this.sceneConfig[this.currentSceneName].currentScene);
    }
  }

  /**
    This function deals with the previous and processing scenes in the queue
    to update their flag parameters (currentScene)

  */
  trackProcessedScenes() {
    // Should keep up to date the currentScene information
    if(this.sceneWasChanged) {
      // Update the processing and current scenes queues
      // Updates the previous game scene name so to be able to update its properties
      this.sceneConfig[this.previousGameScene].currentScene = false;
      this.sceneConfig[this.previousGameScene].readyForNextScene = false;
    }
    if(!this.processingQueue.isEmpty()) {
      this.processingQueue.dequeue();
    }
    if(!this.currentSceneQueue.isEmpty()) {
      this.previousGameScene = this.currentSceneQueue.dequeue();
    }
  }

  changeScene(){
    // Adds the new scene to the queue of scenes to be processed
    this.processingQueue.enqueue(this.goingToScene);
    // Updates the current scene queue
    this.currentSceneQueue.enqueue(this.goingToScene);
    // Go to the next scene by using its name
    this.sceneObjects[this.goingToScene].updateScene();
    // Update the currentSceneName property for the scene we are transitioning to
    this.currentSceneName = this.goingToScene;
    // Update the scene config file
    this.sceneConfig[this.currentSceneName].currentScene = true;
  }
}
