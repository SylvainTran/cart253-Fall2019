/**
  Introduction()
  @constructor args: none
    inits default state parameters in parent State prototype.
  @Assigns a tag to this scene to identify it.
  @Updates the scene with the provided map.
*/
class Introduction extends State {
    constructor(stateConfig, stateData) {
      super(stateConfig, stateData);
      this.tag = "Introduction";
      this.numberOfClicksOverPortrait = 0; // Number of times player has clicked the portrait.
    }
    updateState() {
      decayMemory();
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

      // State text
      push();
      textSize(60);
      fill(0);
      textSize(42);
      text("This is my Allison.\nShe was... four years\nold at the time.", width/1.44, 600);
      pop();
    }
    introductionMousePressed() {
      if(mouseOverPortrait()) {
        contextMenuDisplayed = false;
        ++this.numberOfClicksOverPortrait;
        console.log("Number of clicks: " + this.numberOfClicksOverPortrait);
        push();
        clear();
        console.log("Clicking over portrait.");
        imageMode(CENTER);
        image(allison, 300, 540, allison.width, allison.height);
        pop();
      }
    }
}
