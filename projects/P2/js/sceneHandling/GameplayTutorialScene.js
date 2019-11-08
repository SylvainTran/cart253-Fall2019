/**
  GameplayTutorialScene. Teaches how to move, and explores the concept of the body.

*/
class GameplayTutorialScene extends Scene {
  constructor(sceneData, actorFactory, tileMapExplorer){
    super(sceneData);
    this.strugglingAdam = new Survivor(width / 2, height / 2, TILE_SIZE, color(200, 200, 0), 40, avatarMale);
    this.dialogueAverageTextWidth = this.textLineWidth(this.sceneData.dialogue);
    this.actorFactory = actorFactory;
    this.actorArray = []; // Empty on start
    this.tileMapExplorer = tileMapExplorer;
    this.timesComplained = 0; // Times player has complained so far
  }
  /**
    Updates the scene.

  */
  updateScene() {
    this.displayCinematic();
    this.displayCaptions();
    this.fillActorArray();
    this.updateActors();
    this.enactActing();
    this.strugglingAdam.protestOutloud(this.sceneData, this.timesComplained);
  }
  /**
    Fills the actor array with zombies by calling the actor factory if it's not full.

  */
  fillActorArray() {
    if(this.actorArray.length < this.actorFactory.numberOfActors) {
      this.actorArray = this.actorFactory.generateActors("Zombie", this.actorArray);
      console.log(this.actorArray);
    }
  }
  /**
    Updates the actors' Array after they pass through the screen. (Splice)

  */
  updateActors() {
    for(let i = 0; i < this.actorArray.length; i++) {
      if(this.actorArray[i].passedScreenBorders) {
        //splice
      }
    }
  }
  /**
    Enacts the actors in the actors array. In zombie mode.

  */
  enactActing() {
    if(this.actorArray.length > 0) {
      for(let i = 0; i < this.actorArray.length; i++) {
        let checkMove = this.actorArray[i].checkNeighbourTiles(this.tileMapExplorer);
        this.actorArray[i].move(checkMove);
        this.actorArray[i].displayZombieMode();
      }
    }
  }
  /**
    Creates a little cinematic scene.

  */
  displayCinematic() {
    background(this.sceneData.bgColor); // Black
    this.strugglingAdam.display(this.sceneData.sizeMultiplier);
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
      text(this.sceneData.dialogue[j] + " " + this.timesComplained, this.sceneData.dialoguePosX, dialoguePosY);
      pop();
    }
  }
  /**
    Handles mouse input. To be implemented for other things later.

  */
  mousePressed() {
    console.log("Mouse pressed.");
  }
  /**
    Handles keyboard inputs.

  */
  keyPressed(TILE_SIZE) {
    let sceneKeyPressEvent = null;
    this.strugglingAdam.keyPressed(TILE_SIZE);
    this.timesComplained = this.strugglingAdam.protestOutloud(this.sceneData, this.timesComplained);
    sceneKeyPressEvent = this.countComplaints();
    return sceneKeyPressEvent;
  }
  /**
    Checks if the player successfully complained 266 times over.

  */
  countComplaints() {
    if(this.timesComplained >= 266) {
        return "successfullyComplained";
    }
    else {
      return null;
    }
  }
}
