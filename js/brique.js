class Brique {
  constructor(ctx, sante, game) {
    this.game = game
    this.ctx = ctx;
    this.x = this.y = 0;
    this.w = 50;
    this.h = 25;
    this.sante = sante;
    this.color = "grey"
  }

  draw() {

    switch (this.sante) {
      case 3:
        this.color = "red"
        break;
      case 2:
        this.color = "green"
        break;
      case 1:
        this.color = "yellow"
        break;
      case 0:
        this.color = "grey"
        break;
      default:

    }
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.w, this.h)

    this.ctx.fillStyle = "red"
    this.ctx.strokeRect(this.x+1, this.y-1, this.w, this.h)
  }

  moveTo(x,y) {
    this.x = x;
    this.y = y;
  }

  endommage() {
    this.sante -= 1
    if(this.sante < 1) {
      this.game.player.addScore(30)
    }
  }
}
