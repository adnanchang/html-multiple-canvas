

export default class PanContext {
    constructor(ctx) {
      this.ctx = ctx; //Context
  
      console.log(this.ctx.canvas);
      this.ctx.canvas.width = window.innerWidth;
      this.ctx.canvas.height = window.innerHeight;
  
      this.img = new Image();
      this.img.src = "https://upload.wikimedia.org/wikipedia/commons/a/a5/Ponta_de_S%C3%A3o_Louren%C3%A7o_north_north_east.jpg"
  
      //Some variables
      this.totalSeconds = 0;
      this.lastTimeFrame = 0;
      this.looping = false;
  
      this.draw(0, -8634, -2122.5);
  
      this.btn = document.getElementById('btnStart');
      this.btn.addEventListener('click', this.toKickStartEventListener.bind(this));
    }
  
    toKickStartEventListener() {
      this.startStop();
    }
  
    draw(delta, x, y) {
      this.totalSeconds += delta;
    //   var x = -1 * (this.img.width - this.ctx.canvas.width) / 2 * (1 + Math.cos(this.totalSeconds / Math.PI));
    //   var y = -1 * (this.img.height - this.ctx.canvas.height) / 2 * (1 + -Math.sin(this.totalSeconds / Math.PI));
      console.log("X : " + x);
      console.log("Y : " + y);
      this.ctx.drawImage(this.img, x, y);
    }
  
    startStop() {
      this.looping = !this.looping;
  
      if (this.looping) {
        this.lastTimeFrame = Date.now();
        requestAnimationFrame(this.loop.bind(this));
      }
    }
  
    loop() {
      if (!this.looping) {
        return;
      }
      requestAnimationFrame(this.loop.bind(this));
      var now = Date.now();
      var deltaSeconds = (now - this.lastTimeFrame) / 1000;
      this.lastTimeFrame = now;
      var origX = -8634;
      var origY = -2122.5;
      var x = -6141;
      var y = -198;
      if (x == origX && y == origY) { 
        this.draw(deltaSeconds, origX, origY);
        return;
      }

      while (x < origX && y < origY) {
        this.draw(deltaSeconds, origX, origY);
        origX = origX + 20;
        origY = origY + 20;
      }
    }
  }
  