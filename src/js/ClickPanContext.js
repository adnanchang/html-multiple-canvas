

export default class PanContext {
    constructor(ctx, offScreenCtx) {
      this.ctx = ctx; //Context
      this.offScreenCtx = offScreenCtx; //OffScreen Context
  
      console.log(this.ctx.canvas);
      this.ctx.canvas.width = window.innerWidth;
      this.ctx.canvas.height = window.innerHeight;
  
      this.offScreenCtx.canvas.width = this.ctx.canvas.width * 3;
      this.offScreenCtx.canvas.height = this.ctx.canvas.height;
  
      //Different b/w their sizes
      this.widthDifference = this.offScreenCtx.canvas.width - this.ctx.canvas.width;
      this.heightDifference = this.offScreenCtx.canvas.height - this.ctx.canvas.height;

      //Making another canvas
      this.aNewCanvas = document.createElement("canvas");
      this.aNewContext = this.aNewCanvas.getContext("2d");
      this.aNewContext.canvas.width = this.ctx.canvas.width;
      this.aNewContext.canvas.height = this.ctx.canvas.height;
      this.aNewContext.strokeStyle = "blue";
      this.aNewContext.strokeRect(0, 0, this.aNewContext.canvas.width, this.aNewContext.canvas.height);
  
      //Making another canvas
      this.aNewCanvas1 = document.createElement("canvas");
      this.aNewContext1 = this.aNewCanvas1.getContext("2d");
      this.aNewContext1.canvas.width = this.ctx.canvas.width;
      this.aNewContext1.canvas.height = this.ctx.canvas.height;
      this.aNewContext1.strokeStyle = "red";
      this.aNewContext1.strokeRect(0, 0, this.aNewContext1.canvas.width, this.aNewContext1.canvas.height);

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
      this.scrollValue = 0;
      this.speed = 10;
      this.looping = false;
      this.whereAmI = {
        screen1 : false,
        screen2 : true,
        screen3 : false
      }
  
      this.draw(); // Drawing shapes on the new context
      this.offScreenCtx.drawImage(this.aNewContext.canvas, 0, 0);
      this.offScreenCtx.drawImage(this.aNewContext1.canvas, 1366, 0);

      this.ctx.drawImage(this.offScreenCtx.canvas, this.ctx.canvas.width, 0);
      this.startPanHandler = this.startPan.bind(this);
      this.trackMouseHandler = this.trackMouse.bind(this);
      this.panHandler = this.pan.bind(this);
      this.endPanHandler = this.endPan.bind(this);
      window.addEventListener("mousedown", this.startPanHandler);

      //Registering the button!
      this.btn = document.getElementById('btnStart');
      this.btn.addEventListener('click', this.toKickStartEventListener.bind(this));

      //Registering the ComboBox
      this.comboBox = document.getElementById('comboBoxDirection');
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


      // We draw everything on the offscreen canvas's canvas
      //Drawing a square
      this.aNewContext1.beginPath();
      this.aNewContext1.rect(50,50,100,100);
      this.aNewContext1.fillStyle='purple';
      this.aNewContext1.fill();
  
      //Drawing a square
      this.aNewContext1.beginPath();
      this.aNewContext1.rect(100,100,100,100);
      this.aNewContext1.fillStyle='black';
      this.aNewContext1.fill();

      //Drawing a circle
      this.aNewContext1.beginPath();
      this.aNewContext1.arc(350, 250, 50, 0 , 2 * Math.PI, false);
      this.aNewContext1.fillStyle = 'red';
      this.aNewContext1.fill();
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
      //this.drawOffScreen(this.panning.offset.x, this.panning.offset.y);
    }

    moveTheScreen() {
      this.looping = !this.looping;

      if (this.looping){
        //requestAnimationFrame(this.moveTheScreenExtension.bind(this));
        this.moveTheScreenExtension();
      }
    }

    moveTheScreenExtension() {
      if (!this.looping) {
        console.log(this.looping);
        return;
      }
      
      requestAnimationFrame(this.moveTheScreenExtension.bind(this));
      console.log(this.looping);
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

      //We Either Go Left Or Right
      //First we go Left
      if (this.comboBox.value == "Left") {
        if (this.scrollValue >= this.ctx.canvas.width) {
          //DRAWING THE LAST FRAME
          this.scrollValue -= this.speed;
          this.ctx.drawImage(this.offScreenCtx.canvas,this.ctx.canvas.width - this.scrollValue,
            0, this.scrollValue, this.offScreenCtx.canvas.height, 0, 0, this.scrollValue, this.offScreenCtx.canvas.height);
  
          //RESETTING THE REST OF THE VALUES TO STOP ANIMATING
          this.scrollValue = 0;
          this.looping = false;
          return;
        }
  
        this.scrollValue += this.speed;
        this.ctx.drawImage(this.offScreenCtx.canvas, this.ctx.canvas.width - this.scrollValue,
        0, this.scrollValue, this.offScreenCtx.canvas.height, 0, 0, this.scrollValue, this.offScreenCtx.canvas.height);
      }
      else if (this.comboBox.value == "Right") {
        if (this.scrollValue >= this.ctx.canvas.width) {
          //DRAWING THE LAST FRAME
          this.scrollValue -= this.speed;
          this.ctx.drawImage(this.offScreenCtx.canvas, this.ctx.canvas.width-this.scrollValue, 0, 
            this.offScreenCtx.canvas.width, this.offScreenCtx.canvas.height);   
  
          //RESETTING THE REST OF THE VALUES TO STOP ANIMATING
          this.scrollValue = 0;
          this.looping = false;
          return;
        }
  
        this.scrollValue += this.speed;
        this.ctx.drawImage(this.offScreenCtx.canvas, this.ctx.canvas.width + this.scrollValue, 0, 
          this.offScreenCtx.canvas.width, this.offScreenCtx.canvas.height);   
      }
      //RESETS THE SCROLL (INFINITE SCROLL)
      // this.ctx.drawImage(this.offScreenCtx.canvas, this.scrollValue, 0, 
      //   this.offScreenCtx.canvas.width, this.offScreenCtx.canvas.height);
    }
  }
  