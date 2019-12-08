/**
  Downtown()
  @constructor args: characterPortrait
    Assigns portrait.
    inits default state parameters in parent State prototype.
  @Assigns a tag to this scene to identify it.
  @Updates the scene with the provided map.
*/
class Downtown extends State {
    constructor(stateConfig, stateData, UILayer, characterPortrait) {
      super(stateConfig, stateData, UILayer);
      this.characterPortrait = characterPortrait;
      this.resetStateTimer();
      this.positivityGrowthFactor = 50;
      this.positivityDecayFactor = 47; // Could become increasingly larger relative to growth factor by age slice.
      this.resetPositivity();
      this.positivityScore = 0; // Final positivity score for this slice of life when leaving state.
      this.stateTag = "Downtown";
    }

    /**
      updateState()
      @no custom args.
      @Updates this state.
    */
    updateState() {
      this.setFrameRate();
      this.updateStateTimer();
      this.autoDecreasePositivity(this.positivityDecayFactor)
      this.positivityScore = this.incrementPositivity(this.positivityGrowthFactor)
      this.displayPositivity();
      this.curveDecayFactor();
      this.displayTitle("74 years old. You nearly died of a heart attack.\nYour son started talking to you again.");
      this.displayStateTimer();
      this.displayPortrait();
      this.spawnMentalSchemas();
      this.displayEmotionalDimension();
      // Change scene after the duration of state
      if(this.stateTimer >= this.stateDuration) {
        this.readyToChangeState = true;
        congratulations.play();
        climaticScene = true; 
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
      this.timerAngle += 0.10;
      push();
      translate(0, 0);
      fill(255);
      stroke(255, 0, 0);
      strokeWeight(5);
      textSize(this.tSizer);
      text("I'm useless.", sin(this.timerAngle) * 200, cos(this.timerAngle) * 200);
      text("I don't care about society.", random(width/2, width), random(height/2, height));
      pop();

      // Hold any key down or mouse button to think about the opposite
      if(keyIsPressed || mouseIsPressed) {
        // Re-display the colored portrait to show the character's renewed self-confidence
        push();
        imageMode(CENTER);
        image(this.characterPortrait, 300, 640, this.characterPortrait.width, this.characterPortrait.height);
        pop();

        push();
        noStroke();
        fill(0, 255, 0);
        textSize(42);
        text("For the next generation.", mouseX - 250, mouseY);
        pop();
      }
      else {
        push();
        noStroke();
        fill(255, 0, 0);
        textSize(42);
        text("Nobody cares about what I know or did.", mouseX - 250, mouseY);
        pop();
      }
        this.modifyStroke();
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
