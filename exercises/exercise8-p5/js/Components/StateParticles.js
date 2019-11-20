/**
  StateParticles()
  @constructor args: none
  @Transforms particle data inputted by the StateSystem and returns
  the processed output.
*/
class StateParticles extends StateSystem{
  constructor() {
    super();
    console.log("StateParticles created.");    
  }
  update(data) {
    return data;
  }
}
