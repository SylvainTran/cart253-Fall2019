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

    /**
      updateState()
      @no custom args.
      @Updates this state.
    */
    updateState() {

    }

    /**
      updateClicks()
      @arg: updateClickCounter.
        callbacks the function updateClickCounter in the UISystem after this is done.
      @Listens to mousePressed in main.js.
    */
    updateClicks(updateClickCounter) {

    }
}
