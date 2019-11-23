/**
  StateSystem()
  @constructor args: states
    inits default state parameters in parent State prototype.
  @Creates Subsystems to handle data processing.
  @Updates the scenes by updating the subsystems.
  @Changes scenes.
*/
class StateSystem {
  constructor(states, UILayer, stateConfig) {
    this.states = states;
    this.UILayer = UILayer;
    this.stateConfig = stateConfig;
    this.currentStateTag = "Introduction";
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
    this.StateParticles = new StateParticles(this.states, this.UILayer, this.stateConfig);
  }

  /**
    updateSystems()
    @args: none.
    @Updates the UISystem and the StateParticles subsystems using a callback function, i.e., using closure
    on the checkCurrentStateTag(stateConfig) method for the stateConfig.
  */
  updateSystems() {
    this.UISystem.updateStateUI();
    this.StateParticles.updateParticles(this.checkCurrentStateTag);
  }

  /**
    checkCurrentStateTag()
    @args: stateConfig.
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

  /**
    updateClickCounter()
    @arg: none.
    @Displays the click counter for this state. TODO pass parameters for other scenes.
  */
  updateClickCounter() {
    ++this.numberOfClicksOverPortrait;
    push();
    textSize(42);
    fill(255);
    //console.log(this.numberOfClicksOverPortrait);
    text("Number of recalls: " + this.numberOfClicksOverPortrait, 100, 50);
    pop();
  }
}
