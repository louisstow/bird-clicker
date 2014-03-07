var randomColor = function(){
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

var randomRange = function (min, max) {
    return Math.random() * (max - min) + min;
}

var stage = {
    width: window.innerWidth,
    height: window.innerHeight,
    time: 0,
    backgroundColor: "transparent",
    init: function() {
      this.element = document.createElement("div");
      this.element.style.position = "absolute";
      this.element.style.left = "0";
      this.element.style.top = "0";
      this.element.style.backgroundColor = this.backgroundColor;
      this.element.style.zIndex = "1";
      this.element.setAttribute("id", "stage");
      document.body.appendChild(this.element);
      this.updateSize();
    },
    updateSize : function(){
      this.element.style.width = this.width + "px";
      this.element.style.height = this.height + "px";
    }
};

window.addEventListener("load", function() {
    stage.init();
});

window.addEventListener("resize", function() {
    stage.width = window.innerWidth,
    stage.height = window.innerHeight;
    stage.updateSize();
});

function EggParticle(x, y) {
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
        $(this.element).remove();
    }, this.fadeout);
}

EggParticle.prototype = {
    fadeout: 3000,
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

    resetParticleAttributes : function(){
      this.x = randomRange( this.x-this.size/2, this.x+this.size/2);
        this.y = randomRange( this.y-this.size/2, this.y+this.size/2);
        //this.forceWidth ? this.width = this.forceWidth : false;
        //this.forceHeight ? this.height = this.forceHeight : false;
        this.speedX = randomRange(-this.maxSpeed, this.maxSpeed);
        this.speedY = randomRange(-this.maxSpeed, this.maxSpeed);
        this.rotationSpeed = randomRange(-this.rotationSpeed, this.rotationSpeed);

      //this.lifeLength = randomRange(0, this.maxLife);
      //this.opacity = 1;
        // this.width = 4;
        // this.height = 4;
        //this.scale = randomRange(1, 3);
    },

    move: function () {
        var transform = "translate(" + Math.round(this.x) + "px," + Math.round(this.y) + "px) scale(" + this.scale + ") rotate("+this.rotation+"deg)";

        this.element.style.WebkitTransform = transform;
        this.element.style.MozTransform = transform;
        //this.element.style.OTransform = transform;
        this.element.style.transform = transform;
        // this.element.style.opacity = this.opacity.toFixed(2);

    },

    collisionBorder: function () {

        if (this.x > stage.width-this.width || this.x < 0) {
            //this.speedX = this.speedX * -1;
            this.resetParticleAttributes();
            $(this.element).remove();
        }
        if (this.y > stage.height || this.y < 0) {
            //this.speedY = this.speedY * -1;
            this.resetParticleAttributes();
            $(this.element).remove();
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
            //console.log( this.mode)
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedY += this.gravityForce;
            this.rotation += this.rotationSpeed;
        }

        if (this.mode == "animating") {
            this.x = Math.floor( (stage.width/4) * Math.cos( stage.time * this.speedX ) + this.x );
            this.y = Math.floor( (stage.height/4)  * Math.sin( stage.time * this.speedY) + this.y - (stage.height/4) );
        }
        if(this.rotate){
          this.rotation > 360 ? this.rotation = 0 : this.rotation++;
        }

        this.move();
    },
};
