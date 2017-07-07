class Pad {

  constructor(ctx, debug = false) {
    this.w = 100;
    this.h = 10;
    this.color = "black";
    this.x = 0;
    this.y = 0;
    this.ctx = ctx;
    this.debug = debug;
  }

  draw() {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.w, this.h);
      this.ctx.strokeStyle = "white"
      this.ctx.strokeRect(this.x, this.y, this.w, this.h)

      if (this.debug) {
        // line y
        this.ctx.beginPath()
        this.ctx.moveTo(0,this.y);
        this.ctx.lineTo(this.x, this.y)
        this.ctx.stroke();
        // line x
        this.ctx.beginPath()
        this.ctx.moveTo(this.x,0);
        this.ctx.lineTo(this.x, this.y)
        this.ctx.stroke();
      }
  }

  move(x) {
    if(x >= 0 + this.w/2 && x <= this.ctx.canvas.clientWidth - this.w/2) {
        this.x = x - this.w/2;
    }
  }

  init() {
    // on règle la position du pad à l'initial
    this.x = (this.ctx.canvas.clientWidth/2) - (this.w/2); //au milieu de l'écran
    this.y = this.ctx.canvas.clientHeight - this.h *4; // en bas
  }

}
