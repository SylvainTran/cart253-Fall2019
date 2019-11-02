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
    this.tPosX = sceneData.tPosX;
    this.tPosY = sceneData.tPosY;
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
  makeCinematicScene() {
  }

  render() {
    //enact();
  }
}
