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
    
    updateState() {
      this.decayMemory();
      console.log(this.numberOfClicksOverPortrait);
      if(this.numberOfClicksOverPortrait > 6) {
      }
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
    updateClicks() {
      this.contextMenuDisplayed = false;
      ++this.numberOfClicksOverPortrait;
      console.log("Number of clicks: " + this.numberOfClicksOverPortrait);
      push();

      clear(); // Resets the memory decay effect to visualize what it means to "recall".
      imageMode(CENTER);
      image(this.characterPortrait, 300, 540, this.characterPortrait.width, this.characterPortrait.height);
      pop();
    }
}
