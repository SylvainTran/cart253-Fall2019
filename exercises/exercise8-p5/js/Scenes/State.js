/**
  State()
  @constructor args: stateData
    inits default state parameters in the parent State prototype.
  The base type of state to be inherited by all other states.
  States are basically data-dumps. There should be no logic in it,
  as only the StateInteractor/StateParticle transforms this data.
  @Assigns a state tag to identify this state.
  @Initializes all static properties of this state.
*/
class State {
  constructor(stateData){
    this.stateData = stateData; // A reference to the original state data file.
    // Making sure all extended states get are initialized with these properties.
    // These properties are only static elements (non-interactible or non-mobile)
    this.stateIndex = stateData.stateIndex;
    this.stateTag = stateData.stateTag;
    this.bgColor = stateData.bgColor;
    this.isCinematic = stateData.isCinematic;
    this.nbActors = stateData.nbActors;
    this.tSize = stateData.tSize;
    this.textColor = stateData.textColor;
    this.narrationPosX = stateData.narrationPosX;
    this.narrationPosY = stateData.narrationPosY;
    this.narration = stateData.narration;
    this.dialogue = stateData.dialogue;
    this.subtitles = stateData.subtitles;
    this.translation = stateData.translation;
  }
}
