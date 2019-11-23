/**
  AzayashiMall()
  @constructor args: none
    inits default state parameters in parent State prototype.
  @Assigns a tag to this scene to identify it.
  @Updates the scene with the provided map.
*/
class AzayashiMall extends State {
    constructor(stateConfig, stateData) {
      super(stateConfig, stateData);
      this.tag = "AzayashiMall";
    }
    updateState() {

    }
    updateClicks() {
      if(mouseOverUIButton()) {
        clickedOnMenuButton = !clickedOnMenuButton;
        if(clickedOnMenuButton) {
          // UI text prompt
          if(numberOfClicksOverPortrait <= 3) {
            message = "Find out what happened to your parents.";
          }
          else if(numberOfClicksOverPortrait <= 6) {
            message = "Keep trying.";
          }
          createContextMenu(message);
        }
        else {
          contextMenuDisplayed = false;
        }
        if(!contextMenuDisplayed) {
          clearContextMenu();
        }
      }  
    }  
}
