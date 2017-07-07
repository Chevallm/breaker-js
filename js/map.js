class Map {

  create2DArray(rows) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
      arr[i] = [];
    }
    return arr;
  }

  constructor(ctx,levelName, game) {
    this.ctx = ctx;
    this.game = game
    this.w = ctx.canvas.clientWidth;
    this.h = ctx.canvas.clientHeight;
    this.pad;
    this.balle;
    this.bckgrndColor = "skyblue";
    this.briques = []
    this.levelName = levelName; //match to the json file : ./js/levels/1.json and object {levelName}
    this.toutLesNiveaux = this.game.toutLesNiveaux
    this.briques = this.create2DArray(this.toutLesNiveaux[this.levelName].data.length);

    for (var i = 0; i < this.toutLesNiveaux[this.levelName].data.length; i++) {
      for (var j=0; j < this.toutLesNiveaux[this.levelName].data[i].length; j++) {
        var br = new Brique(ctx, this.toutLesNiveaux[this.levelName].data[i][j], this.game);
        br.moveTo((50 + (j * br.w) + (j * 10)) , 50 + ( i * br.h) + (i * 10));
        this.briques[i][j] = br
      }
    }

  }

  addPad(pad) {
    this.pad = pad;
  }

  addBalle(balle) {
    this.balle = balle
  }

  isLevelFinished() {
    var nombreDeBriques = 0;
    for (var i = 0; i < this.briques.length; i++) {
      for (var j = 0; j < this.briques[i].length; j++) {
        nombreDeBriques++
      }
    }

    if (nombreDeBriques ==0) {
      return true
    }
    return false
  }

  drawBackground() {
    this.ctx.fillStyle = this.bckgrndColor;
    this.ctx.fillRect(0, 0, this.w, this.h);
    var img = new Image()
    img.src = 'https://placeimg.com/600/600/nature'
    this.ctx.drawImage(img,0,0)
  }

  draw() {

    this.drawBackground();

    if(!this.game.player.hasNoMoreLives()) {
      //draw the pad
      this.pad.draw();

      //draw the balls
      this.balle.move();
      this.balle.draw();


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
}
