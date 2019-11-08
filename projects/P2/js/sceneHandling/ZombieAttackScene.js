/**
  Zombie attack scene. Introduces the damage mechanic. Explores the concept of the body.

*/
class ZombieAttackScene extends Scene {
  constructor(sceneData, actorFactory, tileMapExplorer, zombieAttackVoiceActing){
    super(sceneData);
    this.zombieAttackVoiceActing = zombieAttackVoiceActing;
    this.playedVoiceActing = false;
    this.strugglingAdam = new Survivor(width / 2, height / 2, TILE_SIZE, color(200, 200, 0), 40, avatarMale);
    this.dialogueAverageTextWidth = this.textLineWidth(this.sceneData.dialogue);
    this.actorFactory = actorFactory;
    this.actorArray = []; // Empty on start
    this.tileMapExplorer = tileMapExplorer;
    this.timesComplained = 0; // Times player has complained so far
    this.playerIsDead = false;
  }
  /**
    Updates the scene.

  */
  updateScene() {
    if(!this.playedVoiceActing) {
      this.zombieAttackVoiceActing.play();
      this.playedVoiceActing = true;
    }
    this.playerIsDead = this.strugglingAdam.checkHealth();
    this.strugglingAdam.protestOutloud(this.sceneData, this.timesComplained);
    this.displayCinematic();
    this.displayCaptions();
    this.fillActorArray();
    this.updateActors();
    this.enactActing();
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
        this.actorArray[i].seekPlayer(this.strugglingAdam);
        this.actorArray[i].damagePlayer(this.strugglingAdam);
        this.actorArray[i].displayZombieMode();
      }
    }
  }
  /**
    Creates a little cinematic scene.

  */
  displayCinematic() {
    background(this.sceneData.bgColor); // Black
    this.strugglingAdam.displaySurvivalMode();
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

  }
  /**
    Handles keyboard inputs.

  */
  keyPressed(TILE_SIZE) {
    let sceneKeyPressEvent = null;
    this.strugglingAdam.keyPressed(TILE_SIZE);
    this.timesComplained = this.strugglingAdam.protestOutloud(this.sceneData, this.timesComplained);
    sceneKeyPressEvent = this.sendPlayerStatus();
    return sceneKeyPressEvent;
  }
  /**
    Checks if the player is dead and returns the result to the scene handler.

  */
  sendPlayerStatus() {
    if(this.playerIsDead) {
      return "playerIsDead";
    }
    else {
      return null;
    }
  }
}
