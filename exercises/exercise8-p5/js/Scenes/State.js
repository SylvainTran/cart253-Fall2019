/**
  State()
  @constructor args: stateConfig
    inits default state parameters in the parent State prototype.
  The base type of state to be inherited by all other states.
  States are basically data-dumps. There should be no logic in it,
  as only the StateInteractor/StateParticle transforms this data.
  @Assigns a state tag to identify this state.
  @Initializes all static properties of this state.
*/
class State {
  constructor(stateConfig, stateData, UILayer){
    this.stateConfig = stateConfig; // A reference to the original state data file.
    this.stateData = stateData;
    this.UILayer = UILayer;
    // Making sure all extended states get are initialized with these properties.
    // These properties are only static elements (non-interactible or non-mobile)
    this.stateIndex = stateConfig.stateIndex; // TODO fix this
    this.stateTag = stateConfig.stateTag; // TODO fix this
    this.bgColor = stateData.bgColor;
    this.isCinematic = stateData.isCinematic;
    this.nbActors = stateData.nbActors;
    this.tSize = stateData.tSize;
    this.textColor = stateData.textColor;
    this.narrationPosX = stateData.narrationPosX;
    this.narrationPosY = stateData.narrationPosY;
    this.narration = stateData.narration;
    this.dialogue = stateData.dialogue;
    this.subtitles = stateData.subtitles;
    this.translation = stateData.translation;
    this.numberOfClicksOverPortrait = 0; // Number of times player has clicked the portrait.
    this.readyToChangeState = false; // The flag that says this state is ready to change to the next one, depending on in-state player behaviours
    //Slice of life bar mechanics
    this.positiveThoughts = 0;
    this.stateTimer = 0;
    this.timerAngle = 0;
    this.tSizer = 150;
    this.strokeW = 5;
    this.stateDuration = 60;
  }

  /**
    resetNumberOfClicks()
    @arg: none.
    @Resets the click counter for this state.
  */
  resetNumberOfClicks() {
    this.numberOfClicksOverPortrait = 0;
  }

  /**
    displayPortrait()
    @arg: character
      The cached image to display.
    @Displays the character image provided as an argument
    at the portrait's default x, y positions.
  */
  displayPortrait() {
    let portraitDefaultX = 300;
    let portraitDefaultY = 650;
    push();
    imageMode(CENTER);
    image(this.characterPortrait, portraitDefaultX, portraitDefaultY, this.characterPortrait.width, this.characterPortrait.height);
    pop();
  }

  /**
    incrementPositivity()
    @arg: none.
    @Increments the slice of life bar's positivity if any key or mouse button is pressed.
  */
  incrementPositivity(positivityGrowthFactor) {
    if(keyIsPressed || mouseIsPressed) {
      this.positiveThoughts += positivityGrowthFactor;
    }
    return this.positiveThoughts;
  }

  /**
    autoDecreasePositivity()
    @arg: none.
    @Automatically decreases positivity in a given state. Game mechanic.
  */
  autoDecreasePositivity(positivityDecayFactor) {
    this.positiveThoughts -= positivityDecayFactor;
  }

  /**
    resetPositivity()
    @arg: none.
    @Resets the slice of life bar's positivity.
  */
  resetPositivity() {
    this.positiveThoughts = 0;
  }

  /**
    resetStateTimer()
    @arg: none.
    @Resets the state timer of the state.
  */
  resetStateTimer() {
    this.stateTimer = 0;
  }

  /**
    displayPositivity()
    @arg: none.
    @Displays the internal amount of positive thoughts as a horizontal green bar.
  */
  displayPositivity() {
    this.UILayer.push();
    this.UILayer.fill(0, 255, 0);
    this.UILayer.rect(0, 75, this.positiveThoughts, 50);
    this.UILayer.pop();
  }

  /**
    updateStateTimer()
    @arg: none.
    @Updates the state timer.
  */
  updateStateTimer() {
    if(frameCount % 60) {
      this.stateTimer++;
    }
  }

  /**
    displayStateTimer()
    @arg: none.
    @Displays the state timer.
  */
  displayStateTimer() {
    this.UILayer.push();
    this.UILayer.fill(255);
    this.UILayer.textSize(30);
    this.UILayer.text("Days of Life Spent: " + this.stateTimer, sin(this.timerAngle), cos(this.timerAngle) + 50);
    this.UILayer.pop();
  }

  /**
    modifyStroke()
    @arg:
    Decrements the text stroke size and weight properties.
  */
  modifyStroke() {
    this.tSizer-= 10;
    this.strokeW-= 0.1;
    if(this.tSizer <= 0) {
      this.tSizer = 150;
    }
    else if(this.strokeW <= 0) {
      this.strokeW = 5;
    }
  }
}
