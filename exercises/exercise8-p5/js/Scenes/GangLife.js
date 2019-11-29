/**
  GangLife()
  @constructor args: characterPortrait
    Assigns portrait.
    inits default state parameters in parent State prototype.
  @Assigns a tag to this scene to identify it.
  @Updates the scene with the provided map.
*/
class GangLife extends State {
    constructor(stateConfig, stateData, UILayer, characterPortrait) {
      super(stateConfig, stateData, UILayer);
      this.characterPortrait = characterPortrait;
      this.positivityGrowthFactor = 50;
      this.positivityDecayFactor = 20; // Could become increasingly larger relative to growth factor by age slice.
      this.resetPositivity();
      this.resetStateTimer();
      this.positivityScore = 0; // Final positivity score for this slice of life when leaving state.
    }

    /**
      updateState()
      @no custom args.
      @Updates this state.
    */
    updateState() {
      this.updateStateTimer();
      this.autoDecreasePositivity(this.positivityDecayFactor)
      this.incrementPositivity(this.positivityGrowthFactor)
      this.displayPositivity();
      this.displayPortrait();
      this.spawnMentalSchemas();
      this.displayStateTimer();
      if(this.stateTimer >= this.stateDuration) {
        this.readyToChangeState = true;
        congratulations.play();
      }
    }

    /**
      spawnMentalSchemas()
      @arg:
      @spawn allison's thoughts (stored in an array) in random coordinates to create a mental map.
        also known as a mental schema or script.
      @allows the player to redirect their x-y values towards the portrait.
        The positive or negative thoughts that touch her will be the life choice of that slice of life.
        Output should be displayed in the life bar skills.
    */
    spawnMentalSchemas() {
      push();
      fill(0);
      textSize(42);
      // TODO replace with array of different positive or negative thoughts
      text("I am leading this gang. We need more weed.", random(width/2, width), random(height/2, height));
      pop();
      // Hold any key down to think about the opposite
      if(keyIsPressed || mouseIsPressed) {
        push();
        fill(0, 255, 0);
        textSize(42);
        text("I just want to make money like crazy.", mouseX - 250, mouseY);
        pop();
      }
      else {
        push();
        fill(255, 0, 0);
        textSize(42);
        text("Maybe I should try reconnecting with myself...", mouseX - 250, mouseY);
        pop();
      }
    }

    /**
      updateClicks()
      @arg: updateClickCounter.
        callbacks the function updateClickCounter in the UISystem after this is done.
      @Listens to mousePressed in main.js.
    */
    updateClicks(updateClickCounter) {
      this.contextMenuDisplayed = false;
    }
}
