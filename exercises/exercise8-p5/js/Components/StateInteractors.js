/**
  StateInteractors()
  @constructor args:
  @Updates state interactors (keypresses, mouse inputs).
*/
class StateInteractors extends StateSystem {
  constructor(states) {
    super(states);
    this.oldState = true; // The old state which is true by default
    this.newState = false; // A new state than the last one is true
    console.log("StateInteractors created.");
  }

  /**
    Tells the StateSystem whether to change states, if it changed.
  */
  updateInteractors() {
    if(this.oldState === this.newState) {
      return this.newState;
    }
  }

  /**
    Should somehow register to p5.js mousePressed events.

  */
  updateStateMouseEvents(stateMouseEvent) {
    switch (stateMouseEvent) {
      case "Starting Game":
        this.nextStateTag = "introduction";
        this.newState = true;
        this.updateInteractors();
        break;
      case "Exiting Game":
        document.write("Game Over.");
        break;
      default:
        break;
    }
    // Reset state changes
    this.newState = false;
  }
}
