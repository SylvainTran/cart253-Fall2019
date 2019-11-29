class BetweenLifeSlicesA extends BetweenLifeSlices {
  constructor(stateConfig, stateData, UILayer, characterPortrait, cloudsPlatformerBg) {
    super(stateConfig, stateData, UILayer, characterPortrait, cloudsPlatformerBg);
    this.resetStateTimer();
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
      go.play();
    }
  }

  updateText() {
    push();
    noStroke();
    textSize(40);
    fill(255);
    text("“In three words I can sum up everything I've learned about\nlife: it goes on.” ― Robert Frost", 20, 850);
    pop();
  }
}
