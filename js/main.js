'use strict';

function getMousePosition(canvas, e) {
  var r = canvas.getBoundingClientRect();
  return {
    x: e.clientX - r.left,
    y: e.clientY - r.top
  }
}


window.onload = function() {

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var g = new Game(ctx);

  const maxH = ctx.canvas.clientHeight;
  const maxW = ctx.canvas.clientWidth;


  canvas.addEventListener('mousemove', function(e) {
    var mousePosition = getMousePosition(canvas,e);
    if(!g.player.hasNoMoreLives()) {
      g.map.pad.move(mousePosition.x)
      if(g.map.balle.fixed) {
        g.map.balle.x = mousePosition.x
      }
    }
  }, false);

  canvas.addEventListener('click', function(e) {
    if(!g.player.hasNoMoreLives()) {
      var mousePosition = getMousePosition(canvas,e);
      if(g.map.balle.fixed) {
        g.map.balle.fire()
      }
    }
  }, false);

  setInterval( function() {
    g.draw()

    console.log(g.map.niveau + " first");
    if(g.map.isLevelFinished()) {
      g.drawWin()
    }
  }, 30);

}
