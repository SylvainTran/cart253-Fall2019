/**
  BetweenLifeSlices()
  @constructor args: characterPortrait
    Assigns portrait.
    inits default state parameters in parent State prototype.
  @Assigns a tag to this scene to identify it.
  @Updates the scene with the provided map.
*/
class BetweenLifeSlices extends State {
    constructor(stateConfig, stateData, UILayer, characterPortrait) {
      super(stateConfig, stateData, UILayer);
      this.characterPortrait = characterPortrait;
      this.positivityGrowthFactor = 50;
      this.positivityDecayFactor = 20; // Could become increasingly larger relative to growth factor by age slice.
      this.resetPositivity();
      this.resetStateTimer();
      this.stateDuration = 60;
      this.positivityScore = 0;
      this.moveableAllison = new MoveablePerson(300, 640, 10, color(255, 0, 0), 100);
    }

    /**
      updateState()
      @no custom args.
      @Updates this state.
    */
    updateState() {
      this.moveableAllison.handleInput();
      this.moveableAllison.move();   
      this.moveableAllison.display();
    }
 
    updateClicks(updateClickCounter) {
      this.contextMenuDisplayed = false;
    }
}
