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
    this.jitteringAdam.display();
  }

  /**
    Takes an array of strings and calculate the average length of all the entries.

  */
  textLineWidth(text) {
    let averageLengthPerWord = 0;
    let numberOfChars = 0;
    let totalLength = 0;
    let textLineWidth = 0;
    for(let i = 0; i < text.length; i++) {
      let word = text[i];
      for(let j = 0; j < word.length; j++) {
        // Count each letter char of the word
        numberOfChars++;
      }
      totalLength += numberOfChars; // increment
      numberOfChars = 0; // reset
    }
    averageLengthPerWord = totalLength / text.length;
    textLineWidth = averageLengthPerWord * (this.sceneData.tSize - 30);
    return textLineWidth;
  }
  /**
    Displays the text.

  */
  displayCaptions() {
    const narrationLineSpacing = 200;
    const adjustedDialogueSize = this.sceneData.tSize - 30;
    const dialogueLineSpacing = adjustedDialogueSize + 30;
    let narrationPosY = this.sceneData.narrationPosY;
    let dialoguePosY = this.sceneData.dialoguePosY;
    // The semi-transparent bg behind the dialogue choices
    let dialogueBg = this.sceneData.dialoguePosY - adjustedDialogueSize;
    const dialogueBgSize = adjustedDialogueSize + 10;
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
      fill(20, 255, 60, 30);
      rect(this.sceneData.dialoguePosX, dialogueBg, this.dialogueAverageTextWidth, dialogueBgSize);
      pop();
    }
    for(let j = 0; j < this.sceneData.dialogue.length; j++) {
      dialoguePosY += dialogueLineSpacing;
      push();
      fill(this.sceneData.textColor);
      textSize(adjustedDialogueSize);
      text(this.sceneData.dialogue[j], this.sceneData.dialoguePosX, dialoguePosY);
      pop();
    }

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
    let situation;
    // The start button
    if(
      mouseX >= this.sceneData.startButtonPosX && mouseX <= this.sceneData.startButtonPosX + startButtonWidth
      && mouseY >= adjustedStartButtonY && mouseY <= adjustedStartButtonY + this.sceneData.tSize
    ) {
      console.log("Clicking above the Start button.");
      situation = "Starting Game";
    }
    // The exit button
    if(
      mouseX >= this.sceneData.exitButtonPosX && mouseX <= this.sceneData.exitButtonPosX + exitButtonWidth
      && mouseY >= adjustedExitButtonY && mouseY <= adjustedExitButtonY + this.sceneData.tSize
    ) {
      console.log("Clicking above the Exit button.");
      situation = "Exiting Game";
    }
    return situation;
  }
}
