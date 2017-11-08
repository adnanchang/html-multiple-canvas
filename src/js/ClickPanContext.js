

export default class PanContext {
    constructor(ctx, offScreenCtx) {
      this.ctx = ctx; //Context
      this.offScreenCtx = offScreenCtx; //OffScreen Context
  
      console.log(this.ctx.canvas);
      this.ctx.canvas.width = window.innerWidth;
      this.ctx.canvas.height = window.innerHeight;
  
      this.offScreenCtx.canvas.width = this.ctx.canvas.width * 2;
      this.offScreenCtx.canvas.height = this.ctx.canvas.height * 2;
  
      //Different b/w their sizes
      this.widthDifference = this.offScreenCtx.canvas.width - this.ctx.canvas.width;
      this.heightDifference = this.offScreenCtx.canvas.height - this.ctx.canvas.height;

      //Making another canvas
      this.aNewCanvas = document.createElement("canvas");
      this.aNewContext = this.aNewCanvas.getContext("2d");
      this.aNewContext.canvas.width = this.ctx.canvas.width;
      this.aNewContext.canvas.height = this.ctx.canvas.height;
      this.aNewContext.strokeRect(0, 0, this.aNewContext.canvas.width, this.aNewContext.canvas.height);
  
      //Some Global Variables
      this.global = {
        scale : 1,
        offset : {
          x : 0,
          y : 0
        }
      };
  
      this.panning = {
        start : {
          x : null,
          y : null
        },
        offset : {
          x : 0,
          y : 0
        }
      };
      this.oneTimeToggle = true;
  
      this.draw(); // Drawing shapes on the new context
      this.offScreenCtx.drawImage(this.aNewContext.canvas, 0, 0);


      this.drawOffScreen(this.offScreenCtx.canvas, 0, 0);
      this.startPanHandler = this.startPan.bind(this);
      this.trackMouseHandler = this.trackMouse.bind(this);
      this.panHandler = this.pan.bind(this);
      this.endPanHandler = this.endPan.bind(this);
      window.addEventListener("mousedown", this.startPanHandler);

      //Registering the button!
      this.btn = document.getElementById('btnStart');
      this.btn.addEventListener('click', this.toKickStartEventListener.bind(this));
    }

    toKickStartEventListener() {
        this.moveTheScreen();
    }
  
    draw() {
      // We draw everything on the offscreen canvas's canvas
      //Drawing a square
      this.aNewContext.beginPath();
      this.aNewContext.rect(50,50,100,100);
      this.aNewContext.fillStyle='skyblue';
      this.aNewContext.fill();
  
      //Drawing a circle
      this.aNewContext.beginPath();
      this.aNewContext.arc(350, 250, 50, 0 , 2 * Math.PI, false);
      this.aNewContext.fillStyle = 'green';
      this.aNewContext.fill();
    }
  
    drawOffScreen(x, y){
      this.ctx.drawImage(this.offScreenCtx.canvas, x, y)
    }
  
    startPan(event) {
      window.addEventListener("mousemove", this.trackMouseHandler);
      window.addEventListener("mousemove", this.panHandler);
      window.addEventListener("mouseup", this.endPanHandler);
      
      //Since the offscreen canvas is bigger than the onscreen canvas
      //We will add their size differences to the start points of the panning
      //If we don't add the size difference, the offscreen canvas jumps to where
      //The mouse is, and that's what we don't want
      if (this.oneTimeToggle) {
        this.panning.start.x = event.clientX + this.widthDifference;
        this.panning.start.y = event.clientY + this.heightDifference;
        this.oneTimeToggle = false;
      }
      else if (!this.oneTimeToggle) {
        this.panning.start.x = event.clientX;
        this.panning.start.y = event.clientY;
      }
    }
  
    endPan(event) {
      window.removeEventListener("mousemove", this.trackMouseHandler);
      window.removeEventListener("mousemove", this.panHandler);
      window.removeEventListener("mouseup", this.endPanHandler);
      this.panning.start.x = null;
      this.panning.start.y = null;
      this.global.offset.x = this.panning.offset.x;
      this.global.offset.y = this.panning.offset.y;
    }
  
    trackMouse(event) {
      var offsetX = event.clientX - this.panning.start.x;
      var offsetY = event.clientY - this.panning.start.y;
      this.panning.offset.x = this.global.offset.x + offsetX;
      this.panning.offset.y = this.global.offset.y + offsetY;
    }
  
    pan(event) {
      this.ctx.setTransform(1,0,0,1,0,0);
      this.ctx.clearRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.translate(this.panning.offset.x, this.panning.offset.y);
      console.log("YOU ARE AT { x : " + this.panning.offset.x + ", y : " + this.panning.offset.y + "} ")
      this.drawOffScreen(this.panning.offset.x, this.panning.offset.y);
    }

    moveTheScreen() {
        requestAnimationFrame(this.moveTheScreen.bind(this));

        var newX = -this.ctx.canvas.width;
        var newY = -this.ctx.canvas.height;
        var i, j = 0;
        if (i != newX && j != newY) {
            i -= 5;
            j -= 5;
            this.ctx.clearRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height);
            this.drawOffScreen(i, j);
        }
    }
  }
  