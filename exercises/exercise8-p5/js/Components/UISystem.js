/**
  UISystem()
  @constructor args: states UILayer.
    the states object required for certain methods.
    the create graphics layer used to update the UI.
  @Displays the UI images provided at the specified x, y positions.
*/
class UISystem extends StateSystem {
  constructor(states, UILayer, stateConfig) {
    super(states, UILayer, stateConfig)
    this.contextMenuDisplayed = false;
  }

  updateStateUI() {
    this.updateUI();
    this.updatePsyInstructions();
  }

  updateUI() {
    this.UILayer.push();
    // The UI at the top.
    this.UILayer.fill(0);
    this.UILayer.rect(0,0,width,100);
    this.UILayer.fill(64,224,208);
    this.UILayer.rect(width-150,0,150,100);
    this.UILayer.pop();
  }

  updatePsyInstructions() {
    // Psychologist's Instructions
    this.UILayer.push();
    this.UILayer.fill(0);
    this.UILayer.textSize(25);
    this.UILayer.text("Instructions", openContextMenuButtonX + 10, 50);
    this.UILayer.pop();
  }

  /**
    createContextMenu()
    @arg: message.
      The string to be passed as the first argument of text().
    @Displays Displays the context menu at the top.
  */
  createContextMenu(message) {
    this.contextMenuDisplayed = true;
    this.UILayer.push();
    this.UILayer.fill(0);
    this.UILayer.rect(openContextMenuButtonX - 300, openContextMenuButtonHeight, 600, 200);
    this.UILayer.textSize(25);
    this.UILayer.fill(255);
    this.UILayer.text(message, openContextMenuButtonX - 295, openContextMenuButtonHeight + 50);
    this.UILayer.pop();
  }
}
