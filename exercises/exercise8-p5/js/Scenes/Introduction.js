/**
  Introduction()
  @constructor args: none
    inits default state parameters in parent State prototype.
  @Assigns a tag to this scene to identify it.
  @Updates the scene with the provided map.
*/
class Introduction extends State {
    constructor(stateConfig, stateData, characterPortrait) {
      super(stateConfig, stateData);
      this.characterPortrait = characterPortrait;
    }

    /**
      updateState()
      @no custom args.
      @Updates this state.
    */
    updateState() {
      this.decayMemory();
      this.spawnMentalSchemas();
      //if > 6 triggerReadyToChangeState
    }

    /**
      decayMemory()
      @no custom args.
      @Uses filter effects to induce a decay effect on displayed
      text, image and "UI".
    */
    decayMemory() {
      textFont(zeyadaType);
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
      // Instructions
      push();
      fill(255, 0, 0);
      textSize(42);
      text("Hold any key down to choose another thought for Allison.", 50, 250);
      pop();

      push();
      fill(0);
      textSize(42);
      // TODO replace with array of different positive or negative thoughts
      text("I am different", random(width/2, width), random(height/2, height));
      pop();
      // Hold any key down to think about the opposite
      if(keyIsPressed) {
        push();
        fill(0, 255, 0);
        textSize(42);
        text("No, I'm just like the other kids", mouseX - 250, mouseY);
        pop();
      }
      else {
        push();
        fill(255, 0, 0);
        textSize(42);
        text("I really am different than the other kids", mouseX - 250, mouseY);
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
      push();
      clear(); // Resets the memory decay effect to visualize what it means to "recall".
      imageMode(CENTER);
      image(this.characterPortrait, 300, 540, this.characterPortrait.width, this.characterPortrait.height);
      pop();
    }
}
