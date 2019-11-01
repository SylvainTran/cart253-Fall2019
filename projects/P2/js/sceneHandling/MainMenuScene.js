/**
  Main Menu scene. Start game or exit game.

*/
class MainMenuScene extends Scene {
  constructor(sceneIndex, bgColor, textObject, actorsPresent, isCinematic, nbActors, scenesConfig){
    super(sceneIndex, bgColor, textObject, actorsPresent, isCinematic, nbActors);
    this.scenesConfig = scenesConfig;
  }


  /**
    Boots the scene.

  */
  bootScene() {
    displayMainMenu();
    displayText();
  }

  /**
    Displays the text

  */
  displayText() {
    let textObject = loadJSON(this.textObject.textObjectPath);
    push();
    textSize(this.textObject.tSize);
    fill(this.textObject.textColor);
    text(this.textObject.textContent, this.textObject.tPosX, this.textObject.tPosY);
    pop();
  }

  /**
    Makes a main menu scene. Simple background colors for now.

  */
  displayMainMenu() {
    background(this.bgColor);
  }
}
