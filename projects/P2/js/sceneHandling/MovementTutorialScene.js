/**
  MovementTutorial scene. Teaches how to move mainly.

*/
class MovementTutorialScene extends Scene {
  constructor(sceneData, actorFactory, movementTutorialVoiceActing){
    super(sceneData);
    this.actorFactory = actorFactory;
    this.movementTutorialVoiceActing = movementTutorialVoiceActing;
    this.playedVoiceActing = false;
    this.movingAdam = new Human(width / 2, height / 2, TILE_SIZE, color(200, 200, 0), 40, this.actorFactory.avatarMale);
    this.dialogueAverageTextWidth = this.textLineWidth(this.sceneData.dialogue);
  }
  /**
    Updates the scene.

  */
  updateScene() {
    if(!this.playedVoiceActing) {
      this.movementTutorialVoiceActing.play();
      this.playedVoiceActing = true;
    }
    this.displayCinematic();
    this.displayCaptions();
  }
  /**
    Creates a little cinematic scene.

  */
  displayCinematic() {
    background(this.sceneData.bgColor); // Black
    this.movingAdam.display(this.sceneData.sizeMultiplier);
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
    // No mouse events in this scene
    return null;
  }
  /**
    Handles keyboard inputs.

  */
  keyPressed(TILE_SIZE, movementSounds){
    let sceneKeyPressEvent = this.checkIfExited();
    this.movingAdam.keyPressed(TILE_SIZE, movementSounds);
    return sceneKeyPressEvent;
  }
  /**
    Check if the player successfully left the screen on the right side.
    Returns null if not.

  */
  checkIfExited() {
    let adjustedAvatarWidth = this.movingAdam.avatarPic.width;
    if(this.movingAdam.x + adjustedAvatarWidth / 2 >= width) {
      return "exitedSuccessfully";
    }
    else {
      return null;
    }
  }
}
