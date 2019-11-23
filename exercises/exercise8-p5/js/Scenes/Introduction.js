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
      this.decayMemory();
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

      // State text
      push();
      textSize(60);
      fill(0);
      textSize(42);
      text("This is my Allison.\nShe was... four years\nold at the time.", width/1.44, 600);
      pop();
    }
    updateClicks() {
      if(mouseOverPortrait()) {
        contextMenuDisplayed = false;
        ++numberOfClicksOverPortrait;
        console.log("Number of clicks: " + numberOfClicksOverPortrait);
        push();
        clear();
        console.log("Clicking over portrait.");
        imageMode(CENTER);
        image(allison, 300, 540, allison.width, allison.height);
        pop();
      }
      if(mouseOverUIButton()) {
        console.log("Clicking over menu button.");
        clickedOnMenuButton = !clickedOnMenuButton;
        if(clickedOnMenuButton) {
          // UI text prompt
          if(numberOfClicksOverPortrait <= 3) {
            message = "Keep clicking on the picture to recall\nthe memory.";
          }
          else if(numberOfClicksOverPortrait <= 6) {
            message = "That's good. You're doing great.";
          }
          createContextMenu(message);
        }
      }
      else {
        contextMenuDisplayed = false;
      }
      if(!contextMenuDisplayed) {
        clearContextMenu();
      }
    }    
}
