/**
  StateParticles()
  @constructor args: states
    Takes in the states object.
  @Takes in the currentStateTag and updates the visuals to render
  on screen accordingly in the states object.
  @Transforms particle data inputted by the StateSystem and returns
  the processed output.
*/
class StateParticles extends StateSystem{
  constructor(states) {
    super();
    this.states = states;
    console.log("StateParticles created.");    
  }
  /**
    updateParticles()
    @constructor args: currentStateTag
      The string variable of the current state tag passed by the StateSystem.
    @Takes in the currentStateTag and updates the visuals to render
    on screen accordingly in the states object.
  */
  updateParticles(currentStateTag) {
    
  }
  /**
    Displays captions.

  */
  displayCaptions() {
    console.log("Displaying captions.");
  }  

  /**
    Takes an array of strings and calculate the average length of all the entries.

  */
  textLineWidth(stringArray) {
    let averageLengthPerWord = 0;
    let numberOfChars = 0;
    let totalLength = 0;
    let textLineWidth = 0;
    for(let i = 0; i < stringArray.length; i++) {
      let word = stringArray[i];
      for(let j = 0; j < word.length; j++) {
        // Count each letter char of the word
        numberOfChars++;
      }
      totalLength += numberOfChars; // increment
      numberOfChars = 0; // reset
    }
    averageLengthPerWord = totalLength / stringArray.length;
    textLineWidth = averageLengthPerWord * (this.stateData.tSize - this.stateData.tSize / 2);
    return textLineWidth;
  }  
}
