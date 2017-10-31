import GameContext from "./GameContext.js"

export default class Character {
  constructor() {
    this.tileFrom = [1, 1];
    this.tileTo = [1, 1];
    this.timeMoved = 0;
    this.dimensions = [30, 30];
    this.position = [45, 45];
    this.delayMove = 700;

    /**
     * Cannot access the variables from GameContext.js so resorting to this bullshit
     * SORRY!
     */
    this.tileW = 40;
    this.tileH = 40;
  }

  // Place the player at a certain position
  placeAt(x, y) {
    this.tileFrom = [x, y];
    this.tileTo = [x, y];
    this.position = [
      ((this.tileW * x) + ((this.tileW - this.dimensions[0])/2)),
      ((this.tileH * y) + ((this.tileH - this.dimensions[1])/2))
    ]
  }

  // Process the movement of the character for every frame
  processMovement(t) {
    // Check if player is moving
    if (this.tileFrom[0] == this.tileTo[0] && this.tileFrom[1] == this.tileTo[1]) {
      return false;
    }
    if ((t - this.timeMoved) >= this.delayMove) {
      this.placeAt(this.tileTo[0], this.tileTo[1]);
    }
    else {
      this.position[0] = (this.tileFrom[0] * this.tileW) + ((this.tileW - this.dimensions[0])/2);
      this.position[1] = (this.tileFrom[1] * this.tileH) + ((this.tileH - this.dimensions[1])/2);

      if (this.tileTo[0] != this.tileFrom[0]) {
        var diff = (this.tileW / this.delayMove) * (t - this.timeMoved);
        this.position[0] += (this.tileTo[0] < this.tileFrom[0] ? 0 - diff : diff);
      }

      if (this.tileTo[1] != this.tileFrom[1]) {
        var diff = (this.tileH / this.delayMove) * (t - this.timeMoved);
        this.position[1] += (this.tileTo[0] < this.tileFrom[0] ? 0 - diff : diff);
      }

      this.position[0] = Math.round(this.position[0]);
      this.position[1] = Math.round(this.position[1]);
    }

    // To let the code that called this function know
    // that the character is currently moving
    return true;
  }
}
