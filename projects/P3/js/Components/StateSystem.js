/**
  StateSystem()
  @constructor args: states, UILayer, stateConfig, characterPortrait
    inits default state parameters in parent State prototype.
    Starts at the currentStateTag.
  @Creates Subsystems to handle data processing.
  @Updates the scenes by updating the subsystems.
  @Changes scenes.
*/
class StateSystem {
  constructor(states, UILayer, stateConfig, characterPortrait) {
    this.states = states;
    this.UILayer = UILayer;
    this.stateConfig = stateConfig;
    this.currentStateTag = "Tutorial";
    this.nextStateTag = "BetweenLifeSlicesA";
    this.characterPortrait = characterPortrait;
    this.numberOfClicksOverPortrait = 0;
    console.log("StateSystem created.");
  }

  /**
    createSubSystems()
    @args: none.
    @Creates the UISystem, StatesParticles and StateInteractor subsystems.
  */
  createSubSystems() {
    this.UISystem = new UISystem(this.states, this.UILayer, this.stateConfig);
    this.StateParticles = new StateParticles(this.states, this.UILayer, this.stateConfig, this.characterPortrait);
  }

  /**
    updateSystems()
    @args: none.
    @Updates the UISystem and the StateParticles subsystems using a callback function, i.e., using closure
    on the checkCurrentStateTag(stateConfig) method for the stateConfig.
  */
  updateSystems() {
    this.updateCurrentStateTag();
    // If we are not in a BetweenLifeSlices, display the UI
    if(!this.states[this.currentStateTag].stateTag.includes("Life")) {
      this.UISystem.updateStateUI();
    }
    else {
      UILayer.clear();
    }
    this.StateParticles.updateParticles(this.checkCurrentStateTag);
  }

  /**
    updateCurrentStateTag()
    @args: none.
      @Updates the current state tag depending on in-state behaviours.
  */
  updateCurrentStateTag() {
    // Check the current active state
    // See if the boolean variable flag "readyToChangeState" is true
    // If so, update the currentState flags' values (this one and the next state)
    if(this.states[this.currentStateTag].readyToChangeState === true) {
      this.states[this.currentStateTag].readyToChangeState = false;
      this.stateConfig[this.currentStateTag].currentState = "false";
      this.stateConfig[this.nextStateTag].currentState = "true";
      // Update the current and next state tags in the config file
      this.currentStateTag = this.stateConfig[this.nextStateTag].stateTag;
      this.nextStateTag = this.stateConfig[this.currentStateTag].nextStateTag;
    }
  }

  /**
    checkCurrentStateTag()
    @args: none.
      Contains the state config objects to check for the status of states.
    @Returns the currentState by looping through the stateConfig.
  */
  checkCurrentStateTag() {
    let currentState = null;
    for(let i = 0; i < Object.keys(stateConfig).length; i++)
    {
      for (var state in stateConfig)
      {
        if(stateConfig[state].currentState === "true")
        {
            //&& stateConfig[state].stateTag !== this.currentStateTag
            currentState = state;
        }
      }
    }
    return currentState;
  }

  triggerReadyToChangeState() {
    this.states[this.currentStateTag].readyToChangeState = true;
  }
}
