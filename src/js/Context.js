import Circle from './Circle'

export default class Context {
  constructor(ctx) {
    this.ctx = ctx; //Context
    //302 x 152
    console.log(this.ctx.canvas);
    // this.ctx.canvas.width = window.innerWidth;
    // this.ctx.canvas.height = window.innerHeight;

    this.circleArray = [];
    for (var i = 0; i < Math.floor(Math.random() * 20); i++) {
      var radius = 10;
      var x = Math.random() * (this.ctx.canvas.width - radius * 2) + radius;
      var y = Math.random() * (this.ctx.canvas.height - radius * 2) + radius;
      var dx = (Math.random() - 0.5) * 3;
      var dy = (Math.random() - 0.5) * 3;
      this.circleArray.push(new Circle(x, y, dx, dy, radius, ctx, this.mouse));
    }

    this.animate();
    this.mouseClick();

    this.isMouseOver = false;
    this.mouseOver();
  }

  // Animation Time!
  animate() {
    this.ctx.clearRect(0, 0, innerWidth, innerHeight);
    requestAnimationFrame(this.animate.bind(this));
    for (var i = 0; i < this.circleArray.length; i++) {
      this.circleArray[i].updateCircle();
    }
    if (this.isMouseOver) {
      this.increaseCanvasSize();
    }
  }

  mouseClick() {
    this.ctx.canvas.addEventListener('click', this.mouseClickEvent.bind(this));
  }

  mouseClickEvent(event) {
    console.log(event);
    this.ctx.canvas.width = window.innerWidth;
    this.ctx.canvas.height = window.innerHeight;
    this.ctx.canvas.style.position = "absolute";
    this.ctx.canvas.style.top = "0";
    this.ctx.canvas.style.left = "0";
  }

  mouseOver() {
    this.ctx.canvas.addEventListener('mouseover', this.mouseOverEvent.bind(this))
  }

  mouseOverEvent() {
    this.isMouseOver = true;
  }

  increaseCanvasSize(){
    if (this.ctx.canvas.width < 310 && this.ctx.canvas.height < 160) {
      this.ctx.canvas.width += 1;
      this.ctx.canvas.height += 1;
    }
  }
}
