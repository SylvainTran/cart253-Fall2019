/**
  Conclusion scene.

*/
class ConclusionScene extends Scene {
  constructor(sceneData, actorFactory, tileMapExplorer, conclusionVoiceActing){
    super(sceneData);
    this.conclusionVoiceActing = conclusionVoiceActing;
    this.playedVoiceActing = false;
    this.dialogueAverageTextWidth = this.textLineWidth(this.sceneData.dialogue);
    this.actorFactory = actorFactory;
    this.actorArray = [];
    this.tileMapExplorer = tileMapExplorer;
    this.timesPraised = 0; // TO BE IMPLEMENTED (with protest outloud)
    this.contriteAdam = new Prisoner(width / 2, height / 2, TILE_SIZE, color(200, 200, 0), 40, this.actorFactory.avatarMale);
  }
  /**
    Updates the scene.

  */
  updateScene() {
    if(!this.playedVoiceActing) {
      this.conclusionVoiceActing.play();
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
    this.contriteAdam.display(this.sceneData.sizeMultiplier);
  }
  /**
    Displays the text.

  */
  displayCaptions() {
    const narrationLineSpacing = 200;
    const dialogueLineSpacing = this.sceneData.tSize;
    let narrationPosY = this.sceneData.narrationPosY;
    let dialoguePosY = this.sceneData.dialoguePosY;
    let dialogueBg = this.sceneData.dialoguePosY - this.sceneData.dialogueTSize;
    const dialogueBgSize = this.sceneData.dialogueTSize + 10;
    for(let i = 0; i < this.sceneData.narration.length; i++) {
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
    mousePressed events. To be implemented later.

  */
  mousePressed() {
    console.log("Mouse pressed");
  }
  /**
    Handles keyboard inputs.

  */
  keyPressed(TILE_SIZE) {
    let sceneKeyPressEvent = null;
    this.contriteAdam.keyPressed(TILE_SIZE);
    return sceneKeyPressEvent;
  }
}
