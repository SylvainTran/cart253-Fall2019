/**
  AzayashiMall()
  @constructor args: characterPortrait
    Assigns portrait.
    inits default state parameters in parent State prototype.
  @Assigns a tag to this scene to identify it.
  @Updates the scene with the provided map.
*/
class AzayashiMall extends State {
    constructor(stateConfig, stateData, UILayer, characterPortrait) {
      super(stateConfig, stateData, UILayer);
      this.characterPortrait = characterPortrait;
    }

    /**
      updateState()
      @no custom args.
      @Updates this state.
    */
    updateState() {
      this.displayPortrait();
      this.spawnMentalSchemas();
    }

    /**
      updateClicks()
      @arg: updateClickCounter.
        callbacks the function updateClickCounter in the UISystem after this is done.
      @Listens to mousePressed in main.js.
    */
    updateClicks(updateClickCounter) {

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
      fill(0, 255, 255);
      textSize(42);
      text("I was lost at the mall when I was around seven...", 50, 250);
      pop();

      let thoughtsArray = ["Should I just go home alone?", "I'm scared.", "Will they punish me once they find me?"];
      let randomThought = random(0, 2);
      push();
      fill(0);
      textSize(42);
      if(randomThought === 0) {
        text(thoughtsArray[0], random(width/2, width), random(height/2, height));
      }
      else if(randomThought === 1) {
        text(thoughtsArray[1], random(width/2, width), random(height/2, height));
      }
      else if(randomThought === 2) {
        text(thoughtsArray[2], random(width/2, width), random(height/2, height));
      }
      pop();
      // Hold any key down to think about the opposite
      if(keyIsPressed) {
        push();
        fill(0, 255, 0);
        textSize(42);
        text("I'll wait for them. I'm sure they will find me soon.", mouseX - 250, mouseY);
        pop();
      }
      else {
        push();
        fill(255, 0, 0);
        textSize(42);
        text("I'm useless", mouseX - 250, mouseY);
        pop();
      }
    }
}
