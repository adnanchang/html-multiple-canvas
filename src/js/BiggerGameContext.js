//Following instructions from http://technologies4.me/articles/tile-map-canvas-javascript-a1/
import Character from "./Character.js"

export default class GameContext {
  constructor(ctx) {
    this.ctx = ctx; //Context
    //302 x 152
    console.log(this.ctx.canvas);
    this.ctx.canvas.width = 400;
    this.ctx.canvas.height = 400;

    this.gameMap = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0,
        0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0,
        0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0,
        0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0,
        0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
        0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
        0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0,
        0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];

    // The size of the tiles laid accross the game map
    this.tileW = 40;
    this.tileH = 40;

    // The size of the map. 10x10 grid of tiles sized 40x40
    this.mapW = 20;
    this.mapH = 20;

    //Calculations to be done
    this.currentSecond = 0;
    this.frameCount = 0;
    this.framesLastSecond = 0;

    //The key presses
    this.keydown = {
      37 : false,
      38 : false,
      39 : false,
      40 : false
    }

    //The View port
    var self = this;
    this.viewPort = {
        screen : [0,0],
        startTile : [0,0],
        endTile : [0,0],
        offset : [0,0],

        /**
         * px & py are the centre of our camera
         */
        update : function(px, py) {
            this.offset[0] = Math.floor((this.screen[0]/2) - px);
            this.offset[1] = Math.floor((this.screen[1]/2) - py);

            var tile = [Math.floor(px/self.tileW), Math.floor(py/self.tileH)];

            this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0]/2) / self.tileW);
            this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1]/2) / self.tileH);

            if (this.startTile[0] < 0) {
                this.startTile[0] = 0;
            }
            if (this.startTile[1] < 0) {
                this.startTile[1] = 0;
            }

            this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0]/2) / self.tileW);
            this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[1]/2) / self.tileH);

            if (this.endTile[0] >= self.mapW) {
                this.endTile[0] = self.mapW;
            }
            if (this.endTile[1] >= self.mapH) {
                this.endTile[1] = self.mapH;
            }
        }
    }

    //Our player on screen
    this.player = new Character();
    this.animate();
    this.onKeyDown();
    this.onKeyUp();

    this.viewPort.screen = [document.getElementById('game').width,
    document.getElementById('game').height];

  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.drawGame();
    // this.test
  }

  onKeyDown() {
    var self = this;
    window.addEventListener("keydown", function(event) {
      if (event.keyCode >= 37 && event.keyCode <= 40) {
        self.keydown[event.keyCode] = true;
      }
    });
  }

  onKeyUp() {
    var self = this;
    window.addEventListener("keyup", function(event) {
      if (event.keyCode >= 37 && event.keyCode <= 40) {
        self.keydown[event.keyCode] = false;
      }
    });
  }

  drawGame() {
    if (this.ctx == null) {
      return;
    }

    var currentFrameTime = Date.now();
    var timeElapsed = currentFrameTime - this.lastFrameTime;

    var sec = Math.floor(Date.now()/1000);
    if(sec != this.currentSecond)
    {
      this.currentSecond = sec;
      this.framesLastSecond = this.frameCount;
      this.frameCount = 1;
    }
    else { this.frameCount++; }

    //Player movement and input
    if (!this.player.processMovement(currentFrameTime)) {
        //Moving the player based on the key press
        if (this.keydown[38] 
          && this.player.tileFrom[1] > 0 
          && this.gameMap[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1] - 1)] == 1) {
            console.log("Key Pressed");
            this.player.tileTo[1] -= 1;
        }
        else if (this.keydown[40] 
          && this.player.tileFrom[1] < (this.mapH - 1) 
          && this.gameMap[this.toIndex(this.player.tileFrom[0], this.player.tileFrom[1] + 1)] == 1) { 
            this.player.tileTo[1] += 1; 
        }
        else if (this.keydown[37] 
          && this.player.tileFrom[0] > 0 
          && this.gameMap[this.toIndex(this.player.tileFrom[0] - 1, this.player.tileFrom[1])] == 1) { 
            this.player.tileTo[0]-= 1; 
        }
        else if (this.keydown[39] 
          && this.player.tileFrom[0] < (this.mapW - 1) 
          && this.gameMap[this.toIndex(this.player.tileFrom[0]+1, this.player.tileFrom[1])] == 1) { 
            this.player.tileTo[0] += 1; 
        }
  
        /**
         * Afterwards, we do a quick test to see if the destination (tileTo) 
         * is now different from the current tile (tileFrom). 
         * If so, we update the player timeMoved to the currentFrameTime, 
         * and close this input processing block:
         */
        if (this.player.tileFrom[0] != this.player.tileTo[0] 
          || this.player.tileFrom[1] != this.player.tileTo[1]) { 
          this.player.timeMoved = currentFrameTime; 
        }
    }

    this.viewPort.update(this.player.position[0] + (this.player.dimensions[0]/2),
    this.player.position[1] + (this.player.dimensions[1]/2));

    this.ctx.fillStyle = "#000000";
	this.ctx.fillRect(0, 0, this.viewPort.screen[0], this.viewPort.screen[1]);

    for(var y = this.viewPort.startTile[1] ; y < this.viewPort.endTile[1]; ++y)
    {
      for(var x = this.viewPort.startTile[0]; x < this.viewPort.endTile[0]; ++x)
      {
        switch(this.gameMap[((y*this.mapW)+x)])
        {
          case 0:
            this.ctx.fillStyle = "#000000";
            break;
          default:
            this.ctx.fillStyle = "#ccffcc";
        }

        this.ctx.fillRect(this.viewPort.offset[0] + (x*this.tileW), this.viewPort.offset[1] + (y*this.tileH),
        this.tileW, this.tileH);
      }
    }

    //Draw the player
    this.ctx.fillStyle = "#0000FF";
    this.ctx.fillRect(this.viewPort.offset[0] + this.player.position[0], this.viewPort.offset[1] + this.player.position[1],
		this.player.dimensions[0], this.player.dimensions[1]);

    this.ctx.fillStyle = "#ff0000";
    this.ctx.fillText("FPS: " + this.framesLastSecond, 10, 20);

    this.lastFrameTime = currentFrameTime;

    // requestAnimationFrame(this.drawGame); THIS IS A PROBLEM! DON'T UNCOMMENT IT ADNAN! YOU FOOL!
  }

  toIndex(x, y){
    return ((y * this.mapW) + x);
  }

  
}
