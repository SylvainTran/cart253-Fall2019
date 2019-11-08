/**
  The actual object containing the texts for our scenes.
  To be implemented LATER for custom text animations.

*/
class TextObject {
  constructor(tSize, tColor, tContent, tPosX, tPosY, tFont) {
    this.tSize = tSize;
    this.tColor = tColor;
    this.tContent = tContent;
    this.tPosX = tPosX;
    this.tPosY = tPosY;
    this.tFont = tFont;
  }
  /**
    Animating the text in a certain way.

  */
  animate() {
    // for each character in the string, display it then fade out, repeat until
    // no character is left.
    let character;
    let charQueue = new Queue(this.tContent.length);

    // Fill the queue with characters
    for (let c = 0; c < charQueue.maxItems; c++) {
      let character = tContent[c];
      charQueue.push(character);
    }

    for (let i = 0; i < charQueue.maxItems; i++) {
      // display animation
    }
    push();
    fill(this.tColor);
    textSize(this.tSize);
    font(this.tFont);
    text(charQueue.pop(), this.tPosX, this.tPosY);
    pop();
  }
}
