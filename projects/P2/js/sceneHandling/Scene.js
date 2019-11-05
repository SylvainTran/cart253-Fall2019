/**
  The base type of scene to be inherited.

*/
class Scene {
  constructor(sceneData){
    this.sceneData = sceneData; // A reference to the original scene data file.
    // Making sure all extended Scenes get are initialized with these properties.
    this.sceneIndex = sceneData.sceneIndex;
    this.sceneName = sceneData.sceneName;
    this.bgColor = sceneData.bgColor;
    this.isCinematic = sceneData.isCinematic;
    this.nbActors = sceneData.nbActors;
    this.tSize = sceneData.tSize;
    this.textColor = sceneData.textColor;
    this.narrationPosX = sceneData.narrationPosX;
    this.narrationPosY = sceneData.narrationPosY;
    this.narration = sceneData.narration;
    this.dialogue = sceneData.dialogue;
    this.subtitles = sceneData.subtitles;
    this.translation = sceneData.translation;
    this.references = sceneData.references;
  }

  /**
    Makes a scene. Simple background colors for now.

  */
  makeNormalScene() {
    background(this.bgColor);
    push();
    textSize(this.textObject.tSize);
    fill(this.textObject.textColor);
    text(this.textObject.textContent, this.textObject.tPosX, this.textObject.tPosY);
    pop();
  }

  /**
    Makes a cinematic scene. To be specialized in inherited classes.

  */
  displayCinematic() {
    console.log("Displaying cinematic scene.");
  }

  displayCaptions() {
    console.log("Displaying captions.");
  }
  render() {
    //enact();
  }
  /**
    Takes an array of strings and calculate the average length of all the entries.

  */
  textLineWidth(text) {
    let averageLengthPerWord = 0;
    let numberOfChars = 0;
    let totalLength = 0;
    let textLineWidth = 0;
    for(let i = 0; i < text.length; i++) {
      let word = text[i];
      for(let j = 0; j < word.length; j++) {
        // Count each letter char of the word
        numberOfChars++;
      }
      totalLength += numberOfChars; // increment
      numberOfChars = 0; // reset
    }
    averageLengthPerWord = totalLength / text.length;
    textLineWidth = averageLengthPerWord * (this.sceneData.tSize - 30); // TODO remove hardcoded values
    return textLineWidth;
  }
}
