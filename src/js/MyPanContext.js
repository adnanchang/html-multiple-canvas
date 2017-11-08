

export default class PanContext {
  constructor(ctx, offScreenCtx) {
    this.ctx = ctx; //Context
    this.offScreenCtx = offScreenCtx; //OffScreen Context

    console.log(this.ctx.canvas);
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;

    this.offScreenCtx.canvas.width = this.ctx.canvas.width * 2;
    this.offScreenCtx.canvas.height = this.ctx.canvas.height * 2;

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

    this.draw();
    this.startPanHandler = this.startPan.bind(this);
    this.trackMouseHandler = this.trackMouse.bind(this);
    this.panHandler = this.pan.bind(this);
    this.endPanHandler = this.endPan.bind(this);
    window.addEventListener("mousedown", this.startPanHandler);
  }

  draw() {
    //Drawing a square
    this.ctx.beginPath();
    this.ctx.rect(50,50,100,100);
    this.ctx.fillStyle='skyblue';
    this.ctx.fill();

    //Drawing a circle
    this.ctx.beginPath();
    this.ctx.arc(350, 250, 50, 0 , 2 * Math.PI, false);
    this.ctx.fillStyle = 'green';
    this.ctx.fill();
  }

  startPan(event) {
    window.addEventListener("mousemove", this.trackMouseHandler);
    window.addEventListener("mousemove", this.panHandler);
    window.addEventListener("mouseup", this.endPanHandler);
    this.panning.start.x = event.clientX;
    this.panning.start.y = event.clientY;
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
    this.draw();
  }
}
