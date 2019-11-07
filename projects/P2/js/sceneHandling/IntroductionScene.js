/**
  Main Menu scene. Start game or exit game.

*/
class IntroductionScene extends Scene {
  constructor(sceneData){
    super(sceneData);
    this.jitteringAdam = new Human(width / 2, height / 2, TILE_SIZE, color(200, 200, 0), 40, avatarMale);
    this.dialogueAverageTextWidth = this.textLineWidth(this.sceneData.dialogue);
  }
  /**
    Updates the scene.

  */
  updateScene() {
    this.displayCinematic();
    this.displayCaptions();
  }
  /**
    Creates a little cinematic scene.

  */
  displayCinematic() {
    background(this.sceneData.bgColor); // Black
    this.jitteringAdam.jitterAnimation();
    this.jitteringAdam.display(this.sceneData.sizeMultiplier);
  }
  /**
    Displays the text.

  */
  displayCaptions() {
    const narrationLineSpacing = 200;
    const dialogueLineSpacing = this.sceneData.tSize;
    let narrationPosY = this.sceneData.narrationPosY;
    let dialoguePosY = this.sceneData.dialoguePosY;
    // The semi-transparent bg behind the dialogue choices
    let dialogueBg = this.sceneData.dialoguePosY - this.sceneData.dialogueTSize;
    const dialogueBgSize = this.sceneData.dialogueTSize + 10;
    for(let i = 0; i < this.sceneData.narration.length; i++) {
      // Adds incremented line spacing
      narrationPosY += narrationLineSpacing;
      push();
      fill(this.sceneData.textColor);
      textSize(this.sceneData.tSize);
      text(this.sceneData.narration[i], this.sceneData.narrationPosX, narrationPosY);
      pop();
    }
    for(let k = 0; k < this.sceneData.dialogue.length; k++) {
      dialogueBg += dialogueLineSpacing;
      push();
      fill(20, 255, 60, 30); // TODO remove hardcoded values
      rect(this.sceneData.dialoguePosX, dialogueBg, this.dialogueAverageTextWidth, dialogueBgSize);
      pop();
    }
    for(let j = 0; j < this.sceneData.dialogue.length; j++) {
      dialoguePosY += dialogueLineSpacing;
      push();
      fill(this.sceneData.textColor);
      textSize(this.sceneData.dialogueTSize);
      text(this.sceneData.dialogue[j], this.sceneData.dialoguePosX, dialoguePosY);
      pop();
    }

  }
  /**
    Uses the position of the displayed narration and the size of the font to calculate
    the positions of the buttons that handle start or exit game behaviours.

  */
  mousePressed() {
    console.log("Intro mouse pressed");
    console.log("Pos Y" + mouseY);
    // A string variable that is used to assign specific scene handling in the sceneHandler.js. Returns null
    // if nothing happened.
    let sceneMouseEvent = null;
    // The start button
    if(
      mouseX >= this.sceneData.dialoguePosX && mouseX <= this.sceneData.dialoguePosX + this.dialogueAverageTextWidth
      && mouseY >= this.sceneData.dialogueChoice1PosY && mouseY <= this.sceneData.dialogueChoice1PosY + this.sceneData.dialogueTSize + 10 // TODO Remove hardcoded values
    ) {
      console.log("Clicking above The human body.");
      sceneMouseEvent = "Human Body";
    }
    return sceneMouseEvent;
  }
}
