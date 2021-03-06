

export default class ClickPanBiggerContext {
    constructor(ctx, offScreenCtx) {
      this.ctx = ctx; //Context
      this.offScreenCtx = offScreenCtx; //OffScreen Context
  
      console.log(this.ctx.canvas);
      this.ctx.canvas.width = window.innerWidth;
      this.ctx.canvas.height = window.innerHeight;
  
      this.offScreenCtx.canvas.width = this.ctx.canvas.width * 3;
      this.offScreenCtx.canvas.height = this.ctx.canvas.height * 3;
  
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

      //Making yet another canvas
      this.aNewCanvas2 = document.createElement("canvas");
      this.aNewContext2 = this.aNewCanvas2.getContext("2d");
      this.aNewContext2.canvas.width = this.ctx.canvas.width;
      this.aNewContext2.canvas.height = this.ctx.canvas.height;
      this.aNewContext2.strokeStyle = "green";
      this.aNewContext2.strokeRect(0, 0, this.aNewContext2.canvas.width, this.aNewContext2.canvas.height);

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
      this.totalSeconds = 0;
      this.lastTimeFrame = 0;
      this.looping = false;
      this.whatItShouldBe = 0;
      this.x = -this.ctx.canvas.width;
      this.y = -this.ctx.canvas.height;
  
      this.draw(); // Drawing shapes on the new contexts
      this.offScreenCtx.drawImage(this.aNewContext.canvas, 0, 0); // Top Left
      this.offScreenCtx.drawImage(this.aNewContext1.canvas, this.ctx.canvas.width * 2, this.ctx.canvas.height * 2); //Bottom Right
      this.offScreenCtx.drawImage(this.aNewContext2.canvas, this.ctx.canvas.width, this.ctx.canvas.height); // Middle

      this.ctx.drawImage(this.offScreenCtx.canvas, -this.ctx.canvas.width, -this.ctx.canvas.height);

      //Registering the button!
      this.btn = document.getElementById('btnStart');
      this.btn.addEventListener('click', this.toKickStartEventListener.bind(this));

      //Registering the ComboBox
      this.comboBox = document.getElementById('comboBoxDirection');

      //Registering the status span
      this.status = document.getElementById('status');
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


      // We draw everything on the offscreen canvas's canvas
      //Drawing a square
      this.aNewContext2.beginPath();
      this.aNewContext2.rect(50,50,100,100);
      this.aNewContext2.fillStyle='pink';
      this.aNewContext2.fill();

      //Drawing a circle
      this.aNewContext2.beginPath();
      this.aNewContext2.arc(350, 250, 50, 0 , 2 * Math.PI, false);
      this.aNewContext2.fillStyle = 'red';
      this.aNewContext2.fill();

      //Drawing a circle
      this.aNewContext2.beginPath();
      this.aNewContext2.arc(350, 500, 50, 0 , 2 * Math.PI, false);
      this.aNewContext2.fillStyle = 'black';
      this.aNewContext2.fill();
    }

    drawCanvas(delta, x, y) {
      this.totalSeconds += delta;
      console.log(x + ", " + y);
      this.ctx.drawImage(this.offScreenCtx.canvas, x, y);
    }

    moveTheScreen() {
      this.looping = !this.looping;

      if (this.looping) {
        this.lastTimeFrame = Date.now();
        this.whatItShouldBe = this.totalSeconds + 4;
        this.status.innerHTML = "Started";
        requestAnimationFrame(this.moveTheScreenExtension.bind(this));
      }
      else { 
        this.status.innerHTML = "Stopped";
      }
    }

    moveTheScreenExtension() {
      if (!this.looping) {
        return;
      }
      requestAnimationFrame(this.moveTheScreenExtension.bind(this));
      this.ctx.clearRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height);

      var now = Date.now();
      var deltaSeconds = (now - this.lastTimeFrame) / 1000;
      this.lastTimeFrame = now;

      if (this.comboBox.value == "Left") {
        if (this.x <= 0 && this.y <= 0) {
          this.x += 5;
          this.y += 5;
          this.drawCanvas(deltaSeconds, this.x, this.y);
        }
        else {
          this.looping = false;
          this.status.innerHTML = "Stopped"
          this.x -= 5;
          this.y -= 5;
          this.drawCanvas(deltaSeconds, this.x, this.y);
          return;
        }
      }
      else if (this.comboBox.value == "Right") {
        if (this.x >= -Math.abs(this.ctx.canvas.width * 2)) {
          this.x -= 5;
          this.drawCanvas(deltaSeconds, this.x);
        }
        else {
          this.looping = false;
          this.x += 5;
          this.drawCanvas(deltaSeconds, this.x);
          return;
        }
      }
      else if (this.comboBox.value == "Middle") {
        if (this.x >= -Math.abs(this.ctx.canvas.width)) {
          this.x -= 5;
          this.drawCanvas(deltaSeconds, this.x);
        }
        else if (this.x <= -Math.abs(this.ctx.canvas.width)) {
          this.x += 5;
          this.drawCanvas(deltaSeconds, this.x);
        }
        else {
          this.looping = false;
          this.x += 5;
          this.drawCanvas(deltaSeconds, this.x);
          return;
        }
      }
    }
  }
  