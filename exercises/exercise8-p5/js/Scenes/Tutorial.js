/**
  Tutorial()
  @constructor args: none
    inits default state parameters in parent State prototype.
  @Assigns a tag to this scene to identify it.
  @Updates the scene with the provided map.
*/
class Tutorial extends State {
    constructor(stateConfig) {
      super(stateConfig);
      this.tag = "Tutorial";
    }
    update() {
      push();
      fill(0, 255, 0);
      ellipse(width/2, height/2, 300, 300);
      pop();
    }
}
