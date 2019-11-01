/**
  The base type of scene to be inherited.

*/
class Scene {
  constructor(sceneIndex, bgColor, textObject, actorsPresent, isCinematic, nbActors){
    this.sceneIndex = sceneIndex;
    this.bgColor = bgColor;
    this.textObject = textObject;
    this.isCinematic = isCinematic;
    this.nbActors = nbActors;
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
