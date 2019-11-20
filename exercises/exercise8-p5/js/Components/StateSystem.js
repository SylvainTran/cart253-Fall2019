/**
  StateSystem()
  @constructor args: states
    inits default state parameters in parent State prototype.
  @Assigns a tag to this scene to identify it.
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
