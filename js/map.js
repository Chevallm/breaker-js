class Map {

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

  create2DArray(rows) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
      arr[i] = [];
    }
    return arr;
  }

  constructor(ctx,levelName) {
    this.ctx = ctx;
    this.w = ctx.canvas.clientWidth;
    this.h = ctx.canvas.clientHeight;
    this.pads = [];
    this.balles = [];
    this.bckgrndColor = "skyblue";
    this.briques = []
    this.levelName = levelName; //match to the json file : ./js/levels/1.json and object {levelName}
    var xhr = this.getXMLHttpRequest();
    xhr.open("get","./js/levels/1.json", false);
    xhr.send(null);
    if (xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) {
      throw new Error("Impossible de charger le niveau.\r\n debug: " + xhr.status)
    }
    var data = JSON.parse(xhr.responseText);
    this.briques = this.create2DArray(data[this.levelName].data.length);

    for (var i = 0; i < data[this.levelName].data.length; i++) {
      for (var j=0; j < data[this.levelName].data[i].length; j++) {
        var br = new Brique(ctx, data[this.levelName].data[i][j]);
        br.moveTo((50 + (j * br.w) + (j * 10)) , 50 + ( i * br.h) + (i * 10));
        this.briques[i][j] = br
      }
    }

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
    var img = new Image()
    img.src = 'https://placeimg.com/600/600/nature'
    this.ctx.drawImage(img,0,0)

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
