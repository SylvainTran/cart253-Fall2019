/**
  Main Menu scene. Start game or exit game.

*/
class MainMenuScene extends Scene {
  constructor(sceneData){
    super(sceneData);
  }


  /**
    Boots the scene.

  */
  bootScene() {
    displayMainMenu();
    displayCaptions();
  }

  /**
    Makes a main menu scene. Simple background colors for now.

  */
  displayMainMenu() {
    background(this.sceneData.bgColor);
  }

  /**
    Displays the text

  */
  displayCaptions() {
    push();
    textSize(this.sceneData.tSize);
    fill(this.sceneData.textColor);
    text(this.sceneData.narration, this.sceneData.tPosX, this.sceneData.tPosY);
    pop();
  }
}
