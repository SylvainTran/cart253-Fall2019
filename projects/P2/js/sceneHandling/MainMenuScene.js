/**
  Main Menu scene. Start game or exit game.

*/
class MainMenuScene extends Scene {
  constructor(sceneData){
    super(sceneData);
  }


  /**
    Updates the scene.

  */
  updateScene() {
    this.displayMainMenu();
    this.displayCaptions();
  }

  /**
    Makes a main menu scene. Simple background colors for now.

  */
  displayMainMenu() {
    background(this.sceneData.bgColor); // Alpha value set to 10 for transparency
  }

  /**
    Displays the text.

  */
  displayCaptions() {
    push();
    fill(this.sceneData.textColor);
    textSize(this.sceneData.tSize);
    text(this.sceneData.narration, this.sceneData.narrationPosX, this.sceneData.narrationPosY);
    text(this.sceneData.startButton, this.sceneData.startButtonPosX, this.sceneData.startButtonPosY);
    text(this.sceneData.exitButton, this.sceneData.exitButtonPosX, this.sceneData.exitButtonPosY);
    text("Please turn on your sound.\n", width / 10, height / 1.2);
    pop();

    //fill(255);
    //rect(this.sceneData.startButtonPosX, this.sceneData.startButtonPosY, 350, 60);

    push();
    fill(255, 0, 0);
    textSize(30);
    text("(Be advised that this game may be shocking.)", width / 10, height / 1.1);
    pop();
  }

  /**
    Uses the position of the displayed narration and the size of the font to calculate
    the positions of the buttons that handle start or exit game behaviours.

  */
  mousePressed() {
    const adjustedStartButtonY = this.sceneData.startButtonPosY - this.sceneData.tSize;
    const adjustedExitButtonY = this.sceneData.exitButtonPosY - this.sceneData.tSize;
    const startButtonWidth = 300;
    const exitButtonWidth = 325;
    // A string variable that is used to assign specific scene handling in the sceneHandler.js
    let sceneMouseEvent;
    // The start button
    if(
      mouseX >= this.sceneData.startButtonPosX && mouseX <= this.sceneData.startButtonPosX + startButtonWidth
      && mouseY >= adjustedStartButtonY && mouseY <= adjustedStartButtonY + this.sceneData.tSize
    ) {
      console.log("Clicking above the Start button.");
      sceneMouseEvent = "Starting Game";
    }
    // The exit button
    if(
      mouseX >= this.sceneData.exitButtonPosX && mouseX <= this.sceneData.exitButtonPosX + exitButtonWidth
      && mouseY >= adjustedExitButtonY && mouseY <= adjustedExitButtonY + this.sceneData.tSize
    ) {
      console.log("Clicking above the Exit button.");
      sceneMouseEvent = "Exiting Game";
    }
    return sceneMouseEvent;
  }
}
