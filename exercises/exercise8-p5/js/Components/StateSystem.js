/**
  StateSystem()
  @constructor args: states
    inits default state parameters in parent State prototype.
  @Creates Subsystems to handle data processing.
  @Updates the scenes by updating the subsystems.
  @Changes scenes.
*/
class StateSystem {
  constructor(states, UILayer) {
    this.states = states;
    this.UILayer = UILayer;
    this.currentStateTag = "AzayashiMall";
    this.previousStateTag = "MainMenu";
    this.nextStateTag = "";
    this.maxScenes = 2;
    console.log("StateSystem created.");
  }
  createSubSystems() {
    this.StateParticles = new StateParticles(this.states);
    this.StateInteractors = new StateInteractors(this.states);
    this.UISystem = new UISystem(this.states, this.UILayer);
  }
  updateSystems() {
    this.StateParticles.updateParticles(this.currentStateTag);
    this.StateInteractors.updateInteractors(this.currentStateTag);
    this.UISystem.updateStateUI();
    this.changeState();
  }
  /**
    changeState()
    @args: none.
    @Changes state if the StateInteractor returned a scene change event.
  */
  changeState() {
    if(this.StateInteractors.updateInteractors()){
      this.states[this.currentStateTag].updateState();
    }
  }
}
