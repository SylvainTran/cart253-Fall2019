/**
  MovementTutorial scene. Teaches how to move, and explores the concept of the body.

*/
class GameplayTutorialScene extends Scene {
  constructor(sceneData, actorFactory, tileMapExplorer){
    super(sceneData);
    this.movingAdam = new Human(width / 2, height / 2, TILE_SIZE, color(200, 200, 0), 40, avatarMale);
    this.dialogueAverageTextWidth = this.textLineWidth(this.sceneData.dialogue);
    this.actorFactory = actorFactory;
    this.actorArray = []; // Empty on start
    this.tileMapExplorer = tileMapExplorer;
  }
  /**
    Updates the scene.

  */
  updateScene() {
    this.displayCinematic();
    this.displayCaptions();
    this.fillActorArray();
    this.updateActors();
    this.displayActors();
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

      }
    }
  }
  /**
    Displays the actor array. In zombie mode.

  */
  displayActors() {
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
    this.movingAdam.display(this.sceneData.playerSize);
  }
  /**
    Displays the text.

  */
  displayCaptions() {
    console.log("displaying captions for gameplay tutorial");
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
    this.movingAdam.keyPressed(TILE_SIZE);
    return sceneKeyPressEvent;
  }
  /**
    Checks if the player successfully dodged 20 persons.

  */
  countDodges() {
    let adjustedAvatarWidth = this.movingAdam.avatarPic.width;
    if(this.movingAdam.x + adjustedAvatarWidth / 2 >= width) {
      return "exitedSuccessfully";
    }
    else {
      return null;
    }
  }
}
