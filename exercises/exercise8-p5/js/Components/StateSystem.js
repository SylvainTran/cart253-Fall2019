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
    this.currentState = "";
    this.previousState = "MainMenu";
    this.nextState = "";
    console.log("StateSystem created.");
  }
  createSubSystems() {
    this.StateInteractors = new StateParticles();
    this.StateInteractors = new StateInteractors();
  }
  update() {
  }
  changeScene() {
  }
}
