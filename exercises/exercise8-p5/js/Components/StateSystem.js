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
    this.maxScenes = 2;
    this.numberOfClicksOverPortrait = 0;    
    console.log("StateSystem created.");
    console.log(this.getStateConfig());
  }
  getStateConfig() {
    return this.stateConfig;
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
    @Updates the UISystem and the StateParticles subsystems.
  */  
  updateSystems() {
    // Update the current state based on the current state tag
    this.checkCurrentSceneTag();    
    this.UISystem.updateStateUI();
    this.StateParticles.updateParticles();
    console.log("Updated systems");
  }

  checkCurrentSceneTag() {
    //For each key in the object stateConfig, check their tag
    for(let i = 0; i <= Object.keys(this.stateConfig).length; i++) {
      alert("going through loop");
      let val = this.stateConfig[i];
      console.log(val);
      if(this.stateConfig[val].currentState === true) {
        alert(this.stateConfig[val].stateTag);
      }
    }
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
