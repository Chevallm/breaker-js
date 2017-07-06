class Map {

  constructor(ctx) {
    this.ctx = ctx;
    this.w = ctx.canvas.clientWidth;
    this.h = ctx.canvas.clientHeight;
    this.pads = [];
    this.balles = [];
    this.bckgrndColor = "skyblue";
    this.briques = []
  }

  addPad(pad) {
    this.pads.push(pad);
  }

  addBalle(balle) {
    this.balles.push(balle)
  }

  draw() {
    // draw the map
    this.ctx.fillStyle = this.bckgrndColor;
    this.ctx.fillRect(0, 0, this.w, this.h);

    //draw the pads
    this.pads.forEach( j => {
      j.draw();
    });

    //draw the balls
    this.balles.forEach( b => {
      b.move();
      b.draw();
    });

    //draw briques
    for (var i = 0; i < this.briques.length; i++) {
      for (var j = 0; j < this.briques[i].length; j++) {
        if(this.briques[i][j].sante > 0) {
          this.briques[i][j].draw()
        } else {
          this.briques[i].splice(j,1)
        }
      }
    }
  }
}
