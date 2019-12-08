class BetweenLifeSlicesA extends BetweenLifeSlices {
  constructor(stateConfig, stateData, UILayer, characterPortrait, cloudsPlatformerBg) {
    super(stateConfig, stateData, UILayer, characterPortrait, cloudsPlatformerBg);
    this.resetStateTimer();
    this.stateDuration = 365;
    this.stateTag = "BetweenLifeSlicesA";
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
    text("“In three words I can sum up everything\nI've learned about life: it goes on.” ― Robert Frost", -150, -150);
    pop();
    this.updateParallaxBg();
    //this.updateText();
    this.moveableAllison.handleInput();
    this.moveableAllison.move();
    this.moveableAllison.display();
    if(this.stateTimer >= this.stateDuration) {
      this.readyToChangeState = true;
      go.play();
    }

    // Display the third dimension if mouse is pressed
    this.displayEmotionalDimension();
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
