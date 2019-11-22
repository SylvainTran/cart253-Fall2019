/**
  StateSystem()
  @constructor args: states
    inits default state parameters in parent State prototype.
  @Creates Subsystems to handle data processing.
  @Updates the scenes by updating the subsystems.
  @Changes scenes.
*/
class StateSystem {
  constructor(states) {
    this.states = states;
    this.currentStateTag = "";
    this.previousStateTag = "MainMenu";
    this.nextStateTag = "";
    this.maxScenes = 2;
    console.log("StateSystem created.");
  }
  createSubSystems() {
    this.StateParticles = new StateParticles(currentStateTag);
    this.StateInteractors = new StateInteractors(currentStateTag);
  }
  update() {
    this.StateParticles.updateParticles(this.currentStateTag);
    this.StateInteractors.updateInteractors(this.currentStateTag);
    this.changeState();
  }
  /**
    changeState()
    @args: none.
    @Changes state if the StateInteractor returned a scene change event.
  */
  changeState() {
    if(this.StateInteractors.updateState()){
      this.states[this.currentStateTag].updateState();
    }
  }
}
