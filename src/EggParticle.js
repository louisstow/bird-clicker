var randomColor = function(){
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

var randomRange = function (min, max) {
  return Math.random() * (max - min) + min;
}

var particleList = [];
var particleMax = 5;

var stage = {
  width: window.innerWidth,
  height: window.innerHeight,
  time: 0,

  init: function() {
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.left = "0";
    this.element.style.top = "0";
    this.element.style.backgroundColor = "transparent";
    this.element.style.zIndex = "1";
    this.element.setAttribute("id", "stage");
    document.body.appendChild(this.element);

    this.updateSize();
    window.addEventListener("resize", () => this.updateSize());
  },

  updateSize: function() {
    this.width = window.innerWidth,
    this.height = window.innerHeight;
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
  },
};

$(document).ready(() => stage.init());

// Like stage, but with z-index == -1, so stuff appears in background.
var backstage = {
  width: window.innerWidth,
  height: window.innerHeight,

  init: function() {
    this.element = document.createElement("div");
    this.element.style.position = "absolute";
    this.element.style.left = "0";
    this.element.style.top = "0";
    this.element.style.backgroundColor = "transparent";
    this.element.style.zIndex = "-1";
    this.element.setAttribute("id", "stage");
    document.body.appendChild(this.element);

    this.updateSize();
    window.addEventListener("resize", () => this.updateSize());
  },

  updateSize: function() {
    this.width = window.innerWidth,
    this.height = window.innerHeight;
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
  },
};

$(document).ready(() => backstage.init());


function EggParticle(x, y) {
  if (particleList.length >= particleMax) {

    while (particleList.length >= particleMax) {
      particleList[0].die();
    }

    return;
  }

  this.x = x || stage.width / 2;
  this.y = y || stage.height / 2;
  this.speedX = randomRange(-this.maxSpeed, this.maxSpeed);
  this.speedY = randomRange(0, -this.maxSpeed);
  this.element = document.createElement("img");
  this.element.style.width = this.width + "px";
  this.element.style.height = this.height + "px";
  this.element.style.zIndex = 1000;
  this.element.style.position = "absolute";
  var id = randomRange(1, 5) | 0;
  this.element.setAttribute("src", "./assets/egg-particle-"+id+".png");
  stage.element.appendChild(this.element);

  var requestId;
  var update = () => {
    requestId = window.requestAnimationFrame(update);
    this.update();
  }
  update();
  $(this.element).css({ opacity: 1 }).animate({ opacity: 0 }, this.fadeout);
  setTimeout(() => {
    window.cancelAnimationFrame(requestId);
    this.die();
  }, this.fadeout);

  this.index = particleList.push(this) - 1;
}

EggParticle.prototype = {
  fadeout: 1000,
  x: 0,
  y: 0,
  width: 32,
  height: 32,
  scale: 1,
  maxSpeed: 10,
  speedX: 5,
  speedY: 5,
  rotationSpeed: 2,
  gravityForce: .2,
  bounce: 0,
  allowborder: false,
  wind: 0,
  time: 0,
  color: "blue",
  opacity : 1,
  rotation : 0,
  lifeLength : 10,
  mode: "collision",

  resetParticleAttributes: function() {
    this.x = randomRange( this.x-this.size/2, this.x+this.size/2);
    this.y = randomRange( this.y-this.size/2, this.y+this.size/2);

    this.speedX = randomRange(-this.maxSpeed, this.maxSpeed);
    this.speedY = randomRange(-this.maxSpeed, this.maxSpeed);
    this.rotationSpeed = randomRange(-this.rotationSpeed, this.rotationSpeed);
  },

  die: function() {
    $(this.element).remove();
    particleList.splice(this.index, 1);
  },

  move: function() {
    var transform = "translate(" + Math.round(this.x) + "px," + 
                    Math.round(this.y) + "px) scale(" + this.scale + 
                    ") rotate(" + this.rotation + "deg)";

    this.element.style.WebkitTransform = transform;
    this.element.style.MozTransform = transform;
    this.element.style.transform = transform;
  },

  collisionBorder: function() {
    if (this.x > stage.width - this.width || this.x < 0) {
      this.resetParticleAttributes();
      this.die();
    }

    if (this.y > stage.height || this.y < 0) {
      this.resetParticleAttributes();
      this.die();
    }
  },

  update: function() {
    if (this.mode == "gravity") {
      this.speedY += this.gravityForce;

      if (this.y > (stage.height - (this.scale * this.height)) || this.y < 0) {
        if (this.bounce != 0) {
          this.speedY *= -this.bounce;
          this.time = 0;
        } else {
          this.y = this.y - (this.y/2);
          this.speedY = this.gravityForce;
        }
      }

      this.y += this.speedY;

      if (this.x >= stage.width - this.width || this.x < 0) { //|
        this.speedX *= -1;
      }

      this.x += this.speedX + this.wind;

      this.time++;

    }

    if (this.mode == "collision") {
      this.collisionBorder();
      this.x += this.speedX;
      this.y += this.speedY;
      this.speedY += this.gravityForce;
      this.rotation += this.rotationSpeed;
    }

    if (this.mode == "animating") {
      this.x = Math.floor( (stage.width/4) * Math.cos( stage.time * this.speedX ) + this.x );
      this.y = Math.floor( (stage.height/4)  * Math.sin( stage.time * this.speedY) + this.y - (stage.height/4) );
    }

    if(this.rotate) {
      this.rotation > 360 ? this.rotation = 0 : this.rotation++;
    }

    this.move();
  },
};

function EggFlake() {
  this.maxSpeed = 10;
  this.wiggle = 14;
  this.scale = 1;

  this.colors = ["ffe4e1", "fff0f5", "e6e6fa", "f0f8ff"];
  this.getRandomColor = function() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  };

  this.reset = function() {
    this.width = 4;
    this.height = 4;
    this.x = randomRange(-eggStorm.emitter[0], eggStorm.emitter[0]) + eggStorm.center[0];
    this.y = randomRange(-100, 100);

    this.gravity = 4;

    this.speeX = randomRange(-this.maxSpeed, this.maxSpeed);
    this.speeY = randomRange(-this.maxSpeed, this.maxSpeed);
    this.scale = randomRange(.2, .9);
  };

  this.append = function() {
    this.element = document.createElement("div");
    this.element.className = "eggflake";
    this.element.style.backgroundColor = this.getRandomColor();
    backstage.element.appendChild(this.element);
  };

  this.move = function() {
    var transform = 'translateX(' + Math.round(this.x) + 'px) translateY(' +
                    Math.round(this.y) + 'px) scale(' + this.scale + ')';
    this.element.style.WebkitTransform = transform;
    this.element.style.MozTransform = transform;
    this.element.style.transform = transform;
  };

  this.reset();
}

var eggStorm = {
  fps: 1000/24,
  time: 0,
  timeSpeed: .01,
  numberOfFlakes : 150,
  allFlakes: [],
  emitter: [backstage.width, 40],

  init: function() {
    this.center = [backstage.width * .5 - this.emitter[0] * .5,
    backstage.height * .5 - this.emitter[1] * .5];

    for (var i = 0; i < this.numberOfFlakes; i++) {
      var flake = new EggFlake;
      flake.append();
      eggStorm.allFlakes.push(flake);
    };

    this.play();
  },

  play: function() {
    window.requestAnimationFrame( () => this.play() );
    this.update();
  },

  update: function() {
    this.time += this.timeSpeed;

    for (var i = 0; i < this.allFlakes.length; i++) {
      var elem = this.allFlakes[i];
      var x =  2 * Math.cos( this.time * elem.speeX );
      var y =  3 * Math.sin( this.time * elem.speeY ) + elem.gravity;

      elem.x += x;
      elem.y += y;

      if ( elem.y <  0 || elem.y > backstage.height ||
           elem.x <  0 || elem.x > backstage.width) {
        elem.reset();
      }

      elem.move();
    };
  },

};

// Don't storm on mobile devices, which can be too slow to handle it.
if (!navigator.userAgent.contains("Mobi")) {
  $(document).ready(() => eggStorm.init());
}
