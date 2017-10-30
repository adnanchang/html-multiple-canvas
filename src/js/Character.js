import GameContext from "./GameContext"

export default class Character {
  constructor() {
    this.tileFrom = [1, 1];
    this.tileTo = [1, 1];
    this.timeMoved = 0;
    this.dimensions = [30, 30];
    this.position = [45, 45];
    this.delayMove = 700;
  }

  // Place the player at a certain position
  placeAt(x, y) {
    this.tileFrom = [x, y];
    this.tileTo = [x, y];
    this.position = [
      ((GameContext.prototype.tileW * x) + ((GameContext.prototype.tileW - this.dimensions[0])/2)),
      ((GameContext.prototype.tileH * y) + ((GameContext.prototype.tileH - this.dimensions[1])/2))
    ]
  }

  // Process the movement of the character for every frame
  processMovement(t) {
    // Check if player is moving
    if (this.tileFrom[0] == this.tileTo[0] && this.tileFrom[1] == this.tileTo[1]) {
      return false;
    }

  }
}
