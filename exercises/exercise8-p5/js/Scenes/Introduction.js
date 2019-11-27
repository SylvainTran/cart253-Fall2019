/**
  Introduction()
  @constructor args: characterPortrait
    Assigns portrait.
    inits default state parameters in parent State prototype.
  @Assigns a tag to this scene to identify it.
  @Updates the scene with the provided map.
*/
class Introduction extends State {
    constructor(stateConfig, stateData, UILayer, characterPortrait) {
      super(stateConfig, stateData, UILayer);
      this.characterPortrait = characterPortrait;
      this.positivityGrowthFactor = 50;
      this.positivityDecayFactor = 10; // Could become increasingly larger relative to growth factor by age slice.
      this.resetPositivity();
      this.positivityScore = 0; // Final positivity score for this slice of life when leaving state.
    }

    /**
      updateState()
      @no custom args.
      @Updates this state.
    */
    updateState() {
      this.updateStateTimer();
      this.autoDecreasePositivity(this.positivityDecayFactor);
      this.positivityScore = this.incrementPositivity(this.positivityGrowthFactor);
      //console.log("Final positivity score: " + this.positivityScore);
      this.displayPositivity();
      this.decayMemory();
      this.spawnMentalSchemas();
      this.displayStateTimer();
      console.log("State timer: " + this.stateTimer);
      console.log("State duration: " + this.stateDuration);
      // Change scene after the duration of state
      if(this.stateTimer >= this.stateDuration) {
        this.readyToChangeState = true;
        if(this.positivityScore < 0) {
          // If the positivity score was negative, make the next state significantly harder
          this.states[this.stateConfig[this.stateTag].nextStateTag].positivityDecayFactor += 15;
          alert(this.states[this.stateConfig[this.stateTag].nextStateTag].positivityDecayFactor);
        }
      }
    }

    /**
      decayMemory()
      @no custom args.
      @Uses filter effects to induce a decay effect on displayed
      text, image and "UI".
    */
    decayMemory() {
      // Decay effect using blur, gray and dilate filters.
      push();
      filter(BLUR);
      filter(GRAY);
      filter(DILATE);
      pop();
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
      // Instructions
      textFont(AntonRegularType);
      push();
      noStroke();
      fill(0, 255, 255);
      textSize(30);
      text("Game Psychologist: Try holding any key or mouse button down.", 50, 250);
      pop();

      push();
      stroke(255, 0, 0);
      strokeWeight(this.strokeW);
      fill(0);
      textSize(this.tSizer);
      push();
      translate(width/2, height/2);
      // TODO replace with array of different positive or negative thoughts
      text("I don't fit in...", sin(this.timerAngle) * 200, cos(this.timerAngle) * 200);
      pop();

      push();
      translate(0, 0);
      stroke(255, 0, 0);
      strokeWeight(5);
      textSize(this.tSizer);
      text("I don't fit in...?", random(width/2, width), random(height/2, height));
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
        text("No, I can be friends with everyone!", mouseX - 250, mouseY);
        pop();
      }
      else {
        push();
        noStroke();
        fill(255, 0, 0);
        textSize(42);
        text("I really don't fit in...", mouseX - 250, mouseY);
        pop();
      }
      // Decrement the text stroke size and weight properties
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
      this.numberOfClicksOverPortrait++;
      console.log(this.numberOfClicksOverPortrait);
    }
}
