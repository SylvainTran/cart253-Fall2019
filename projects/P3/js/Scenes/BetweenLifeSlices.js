/**
  BetweenLifeSlices()
  @constructor args: characterPortrait
    Assigns portrait.
    inits default state parameters in parent State prototype.
    This is the transition scene where to character goes beyond life stages.
  @Assigns a tag to this scene to identify it.
  @Updates the scene with the provided map.
*/
class BetweenLifeSlices extends State {
    constructor(stateConfig, stateData, UILayer, characterPortrait, cloudsPlatformerBg) {
      super(stateConfig, stateData, UILayer);
      this.characterPortrait = characterPortrait;
      this.cloudsPlatformerBg = cloudsPlatformerBg;
      this.resetStateTimer();
      this.stateDuration = 365;
      this.moveableAllison = new MoveablePerson(300, 255, 10, characterPortrait);
      this.leftBg = 0;
      this.rightBg = width;
      this.scrollSpeed = 2;
      this.stateTag = "BetweenLifeSlices";
    }

    /**
      updateState()
      @no custom args.
      @Updates this state.
    */
    updateState() {
      frameRate(60);
      this.updateStateTimer();
      this.displayStateTimer();
      this.updateParallaxBg();
      this.updateText();
      this.moveableAllison.handleInput();
      this.moveableAllison.move();
      this.moveableAllison.display();
      if(this.stateTimer >= this.stateDuration) {
        this.readyToChangeState = true;
      }
    }

    updateClicks(updateClickCounter) {
      this.contextMenuDisplayed = false;
    }

    updateParallaxBg() {
      image(this.cloudsPlatformerBg, this.leftBg, 0, width, height);
      image(this.cloudsPlatformerBg, this.rightBg, 0, width, height);

      this.leftBg -= this.scrollSpeed;
      this.rightBg -= this.scrollSpeed;

      if (this.leftBg < -width){
        this.leftBg = width;
      }
      if (this.rightBg < -width){
        this.rightBg = width;
      }
    }

    updateText() {
      push();
      noStroke();
      textSize(40);
      fill(255);
      text("“Love is like an orange, but do you even like oranges?”\n-The End.", 20, 850);
      pop();
    }
}
