class Game {

  getXMLHttpRequest() {
    var xhr = null;

    if (window.XMLHttpRequest || window.ActiveXObject) {
      if (window.ActiveXObject) {
        try {
          xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
      } else {
        xhr = new XMLHttpRequest();
      }
    } else {
      alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
      return null;
    }

    return xhr;
  }

  constructor(ctx) {
    this.ctx = ctx
    this.niveau = 0
    this.player = new Player()
    this.toutLesNiveaux = []
    var xhr = this.getXMLHttpRequest();
    xhr.open("get","./js/levels/1.json", false);
    xhr.send(null);
    if (xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) {
      throw new Error("Impossible de charger le niveau.\r\n debug: " + xhr.status)
    }
    this.toutLesNiveaux = JSON.parse(xhr.responseText);
    this.map = new Map(this.ctx, this.niveau, this)
    var pad = new Pad(this.ctx)
    pad.init()
    var balle = new Balle(this.ctx, this, pad)
    balle.init()
    this.map.addPad(pad)
    this.map.addBalle(balle)
  }

  getMap()  { return this.map }
  getPlayer() { return this.player }

  start() {

  }

  pause() {

  }

  nextLevel() {
    this.niveau++
    this.map = new Map(this.ctx, this.niveau, this)
    var pad = new Pad(this.ctx)
    var balle = new Balle(this.ctx, this, pad)
    pad.init()
    balle.init()
    this.map.addPad(pad)
    this.map.addBalle(balle)
  }

  drawLifeAndScore() {
    this.ctx.font="25px Georgia";
    this.ctx.fillStyle = "black"
    this.ctx.strokeStyle = "white"
    this.ctx.strokeText("score : " + this.player.score + "  . lifes : " + this.player.lifes + "♥ ", 0, this.ctx.canvas.clientHeight - 10)
    this.ctx.font="25px Georgia";
    this.ctx.fillText("score : " + this.player.score + "  . lifes : " + this.player.lifes + "♥ ", 0, this.ctx.canvas.clientHeight - 10)
  }

  drawGameOver() {
    this.ctx.fillStyle = "white"
    this.ctx.font="15px comics sans ms";
    this.ctx.fillText("Game Over",50,40)
    this.ctx.fillText("Your score : " + this.player.score, 50 ,50)
    this.map.balles = []
    this.map.briques = []
    this.map.bckgrndColor = "black"
  }

  drawWin() {
    this.ctx.fillStyle = "white"
    this.ctx.font="15px comics sans ms";
    this.ctx.fillText("Level finished ! Well played",50,40)
    this.ctx.fillText("Your score : " + this.player.score, 50 ,50)
    this.map.balle.fixed = true
    this.map.briques = []
    this.map.bckgrndColor = "black"
    var secondBeforeNextLevel = 5;
    this.ctx.fillText("Next level begin in " + secondBeforeNextLevel + " s", 50, 60)
    var self = this
    setTimeout( function() {
        self.nextLevel()
    },secondBeforeNextLevel * 1000)

  }

  draw() {
    this.map.draw()
    this.drawLifeAndScore()

    if(this.player.hasNoMoreLives()) {
      this.map.pad = null
      this.map.balle = null
      this.drawGameOver();
    }


  }



}
