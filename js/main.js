'use strict';

window.onload = function() {

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  const ARROW_UP = 38;
  const ARROW_RIGHT = 39;
  const ARROW_LEFT = 37;
  const ARROW_DOWN = 40;

  const maxH = ctx.canvas.clientHeight;
  const maxW = ctx.canvas.clientWidth;

  function create2DArray(rows) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
      arr[i] = [];
    }
    return arr;
  }

  ctx.player = new Player();
  ctx.m = new Map(ctx);
  ctx.p = new Pad(ctx, true);ctx.p.init();
  ctx.b = new Balle(ctx, ctx.p, true);ctx.b.init()
  var col = 1;
  var row = 8;
  var briques = create2DArray(row)
  console.log(briques);
  for (var i = 0; i < row; i++) {
    for (var j=0; j < col; j++) {
      var br = new Brique(ctx, 1);
      br.moveTo((50 + (i * br.w) + (i * 10)) , 50 + ( j * br.h) + (j * 10));
      briques[i][j] = br
    }
  }

	console.log("-- start");
  //var p = new Pad(ctx, true);p.init();
  //var b = new Balle(ctx, p, true);
  //var m = new Map(ctx);

  ctx.m.addPad(ctx.p);
  ctx.m.addBalle(ctx.b);
  ctx.m.briques = briques;

  function getMousePosition(canvas, e) {
    var r = canvas.getBoundingClientRect();
    return {
      x: e.clientX - r.left,
      y: e.clientY - r.top
    }
  }

  canvas.addEventListener('mousemove', function(e) {
    var mousePosition = getMousePosition(canvas,e);
    ctx.p.move(mousePosition.x)
    ctx.m.balles.forEach( b => {
      if(b.fixed) {
        b.x = mousePosition.x
      }
    });
  }, false);

  canvas.addEventListener('click', function(e) {
    var mousePosition = getMousePosition(canvas,e);
    ctx.m.balles.forEach( (b) => {
      if(b.fixed) {
        b.fire()
      }
    });
  }, false);

  setInterval( function() {
    ctx.m.draw();
    ctx.font="20px Georgia";
    ctx.fillStyle = "black"
    ctx.fillText("score : " + ctx.player.score + "  . lifes : " + ctx.player.lifes + "♥ ", 0,ctx.canvas.clientHeight - 10)
    ctx.m.balles.forEach( b => {
      if(b.fixed) {
        b.dx = 0;
        b.y = ctx.p.y - b.r -1; // on place la balle au dessus du pad
      }
    });

    var tableauVide = false;
    var briquesLength = 0;
    for (var i = 0; i < ctx.m.briques.length; i++) {
      for (var j = 0; j < ctx.m.briques[i].length; j++) {
        var br = ctx.m.briques[i][j];
        briquesLength++;
      }
    }


    if(ctx.player.lifes == 0) {
      ctx.fillStyle = "white"
      ctx.font="15px comics sans ms";
      ctx.fillText("Game Over",50,40)
      ctx.fillText("Your score : " + ctx.player.score, 50 ,50)
      ctx.m.balles = []
      ctx.m.briques = []
      ctx.m.bckgrndColor = "black"
    }
  }, 30);

}
