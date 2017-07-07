class Balle {

  constructor(ctx, game, pad, debug = false) {
    this.ctx = ctx
    this.game = game
    this.x = 0
    this.y = 0
    this.r = 10
    this.color = "black"
    this.dx = 5
    this.dy = 5
    this.v = 1
    this.pad = pad
    this.debug = debug
    this.fixed = false

  }

  getTop() {
    return {
      y: this.y - this.r,
      x: this.x,
    }
  }
  getRight() {
    return {
      x: this.x + this.r,
      y: this.y
    }
  }
  getBot() {
    return {
      y: this.y + this.r,
      x: this.x
    }
  }
  getLeft() {
    return {
      x: this.x - this.r,
      y: this.y
    }
  }
  inverserDX() { this.dx = -this.dx }
  inverserDY() { this.dy = -this.dy }

  draw() {
    this.ctx.beginPath()
    this.ctx.fillStyle = this.color
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    this.ctx.fill()
    this.ctx.stroke()

    if (this.debug) {
      // line y
      this.ctx.beginPath()
      this.ctx.moveTo(0, this.y)
      this.ctx.lineTo(this.x, this.y)
      this.ctx.stroke()

      //line x
      this.ctx.beginPath()
      this.ctx.moveTo(this.x, 0)
      this.ctx.lineTo(this.x, this.y)
      this.ctx.stroke()

      this.ctx.font = "10px Georgia"
      var msg = "Balle:"
      this.ctx.fillText(msg, 10, 500)
      msg = "dx: " + this.dx + " dy: " + this.dy
      this.ctx.fillText(msg, 10, 510)
      msg = "x: " + this.x + ", y: " + this.y
      this.ctx.fillText(msg, 10, 520)
      msg = "vitesse: " + this.v
      this.ctx.fillText(msg, 10, 530)
    }
  }

  init() {
    this.fixed = true;
    var laMoitieDuPad = this.ctx.canvas.clientWidth /2
    this.x = laMoitieDuPad
    this.v = 1
  }

  fire() {
    this.fixed = false
    this.dx = 0 // on tire droit au 1er tir
    this.v = 1 // on réinitialise la vitesse
  }

  move() {

    // la balle est fixé au pads
    if(this.fixed) {
      this.dx = 0
      this.y = this.pad.y - this.r -1 // on place la balle au dessus du pad
    }

    // collision avec les murs
    if ((this.x + this.dx * this.v) - this.r >= 0) { // mur gauche
      if ((this.x + this.dx * this.v) + this.r <= this.ctx.canvas.clientWidth) { // mur droit
        if ((this.y + this.dy * this.v) - this.r >= 0) { // mur haut
          if ((this.y + this.dy * this.v) + this.r <= this.ctx.canvas.clientHeight) { // mur bas
            // on met la position de la balle à jour
            this.x += this.dx * this.v
            this.y += this.dy * this.v
          } else {
            this.game.player.lifes-- // on enleve une vie
            this.init() // on replace la balle
            this.pad.init() // on replace le pad
          }
        } else {
          this.inverserDY()
        }
      } else {
        this.inverserDX()
      }
    } else {
      this.inverserDX()
    }
    // collision avec le pad
    if (this.x + this.r >= this.pad.x && this.x + this.r <= this.pad.x + this.pad.w) { //la balle est entre le début du pad et le bout du pad
      if (this.y + this.r >= this.pad.y) { // la balle est touche la hauteur du pad
        this.inverserDY() // rebond vertical

        this.game.player.addScore(10) // on gagne 10 points si on touche le pad

        if (this.v < 10) { // on met la vitesse max à 10
          this.v *= 1.05 // on augmente la vitesse de 5% dès qu'on touche le pad
        }

        if (this.x + this.r >= this.pad.x && this.x + this.r <= this.pad.x + this.pad.w / 2) { // on tape à gauche
          this.dx -= 1 // on fait aller la balle plus à gauche
        } else if (this.x + this.r > this.pad.x + this.pad.w / 2 && this.x + this.r <= this.pad.x + this.pad.w) { // on tape à droite
          this.dx += 1 // on fait aller la balle plus à droite
        }
      }
    }
    // collision avec les briques
    for (var i = 0; i < this.game.map.briques.length; i++) {
      for (var j = 0; j < this.game.map.briques[i].length; j++) {
        var br = this.game.map.briques[i][j] // on recupère la brique en cours

        // haut de la brique
        if(this.getTop().y >= br.y && this.getTop().y <= br.y + br.h &&
           this.getTop().x >= br.x && this.getTop().x <= br.x + br.w) {
             this.inverserDY() // rebond
             br.endommage() // brique endomagé
             this.game.player.addScore(20) // on gagne 20 points
         }
         // bas de la brique
         if(this.getBot().y >= br.y && this.getBot().y <= br.y + br.h &&
            this.getBot().x >= br.x && this.getBot().x <= br.x + br.w) {
              this.inverserDY()
              br.endommage()
              this.game.player.addScore(20)
          }
          // gauche de la brique
          if(this.getLeft().x <= br.x + br.w && this.getLeft().x >= br.x &&
             this.getLeft().y >= br.y && this.getLeft().y <= br.y + br.h) {
            this.inverserDX()
            br.endommage()
            this.game.player.addScore(20)
          }
          // drotie de la brique
          if(this.getRight().x <= br.x + br.w && this.getRight().x >= br.x &&
             this.getRight().y >= br.y && this.getRight().y <= br.y + br.h) {
            this.inverserDX()
            br.endommage()
            this.game.player.addScore(20)
          }
      }
    }
  }
}
