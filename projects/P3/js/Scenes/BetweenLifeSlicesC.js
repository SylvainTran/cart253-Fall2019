class BetweenLifeSlicesC extends BetweenLifeSlices {
  constructor(stateConfig, stateData, UILayer, characterPortrait, cloudsPlatformerBg) {
    super(stateConfig, stateData, UILayer, characterPortrait, cloudsPlatformerBg);
    this.resetStateTimer();
    this.stateDuration = 365;
    this.stateTag = "BetweenLifeSlicesC";
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
    push();
    background(0);
    textSize(100);
    fill(255);
    text("CineLife Movies. Yours truly.", 0, -150);
    pop();
    this.updateParallaxBg();
    this.updateText();
    this.moveableAllison.handleInput();
    this.moveableAllison.move();
    this.moveableAllison.display();
    if(this.stateTimer >= this.stateDuration) {
      this.readyToChangeState = true;
      readyVoice.play();
    }
  }

  updateText() {
    push();
    noStroke();
    textSize(40);
    fill(255);
    text("“If at first life seems to pass you by,\nwalk and jump and cry but don't give up.”\n-Your Own Intuition", 20, 850);
    pop();
  }
}
