/**
  The base type of scene to be inherited.

*/
class Scene {
  // Constructed from the SceneTable data.
  constructor(sceneIndex, bgColor, textObject, actorsPresent, nbActors){
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

    // Text display
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
    if (currentScene === "intro1" || currentScene === "intro2" || currentScene === "intro3") {
      fill(255);
      textSize(42);
      text("Press Enter to continue.", 30, height / 1.2);
    }
    // Grass growing -- Not fully implemented yet
    // grassGenerator();

    // The animation for the forbiddenFruitScene
    if (isCinematic && currentScene === "forbiddenFruitScene") {
      // spawn actors (ellipses for now)
      let actors = [nbActors];
      // Take control of Eve and animate her...
      // Prevent her from being attracted to player
      // Place Eve at the top center of the Scene
      otherGenderX = width / 2;
      // Increment her Y by +1 each call if has not reached center yet
      if (otherGenderY <= height / 2) {
        otherGenderY++;
      } else {
        otherGenderY = height / 2;
      }
      // Draw the forbidden fruit.
      push();
      fill(255, 0, 0);
      imageMode(CENTER);
      image(forbiddenFruit, width / 2, height / 2, 85, 85);
      pop();
    }
  }
}
