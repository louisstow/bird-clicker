var Game = Backbone.Model.extend({
  DEPRECIATION: 0.5,
  EVENT_INTERVAL: 2, //in seconds

  defaults: {
    totalTime: 0,
  },

  player: null,
  scoreboard: null,
  challenges: null,
  events: null,
  birds: null,
  nests: null,
  eggTimer: null,

  initialize: function() {

    this.nests = new Nests(nestData);
    this.nests.each((nest) => new NestView({ model: nest }));

    this.birds = new Birds(birdData);
    this.birds.each((bird) => new BirdView({ model: bird }));

    // XXX Maybe Nest and Bird should have "clone" methods.
    var nest = new Nest(_.clone(this.nests.at(0).attributes));
    var bird = new Bird(_.clone(this.birds.at(0).attributes));
    nest.addBird(bird);
    this.player = new Player({ nest: nest });

    this.scoreboard = new Scoreboard({ model: this.player });
    this.stats = new Stats({ model: this.player });
    console.log(this.player.attributes);
    this.addEventListeners();

    this.challenges = new Challenges(challengeData);

    this.events = new Events(eventData);
    
  },

  addEventListeners: function() {
    this.on("hatch", () => {
      this.player.hatch();
    });

    this.on("buyNest", (nest) => {
      this.player.buyNest(nest || new Nest);
    });

    this.on("buyBird", (bird) => {
      this.player.buyBird(bird || new Bird);
    });
  },

  start: function() {
    this.eggTimer = setInterval(() => {
      this.set("totalTime", this.get("totalTime") + 1);
      this.mainLoop()
    } , 1000);
  },

  mainLoop: function() {
    if(this.get("totalTime") % this.EVENT_INTERVAL == 0) {
      var funType = Math.random();
      if(true || (funType > 0.5 && funType <= 0.75)) {
        console.log("challenges go go ");

        var possibleChallenges = [];
        for (var i = 0; i < this.challenges.length; ++i) {
          var x = Math.random();
          var probability = this.challenges.at(i).get("probability");
          console.log(this.challenges.at(i).get("probability") + ": x = " + x + " - prob = " + this.challenges.at(i).get("probability"));
          if (probability >= x) {
            possibleChallenges.push(this.challenges.at(i));
          }
        }
        if(possibleChallenges.length > 0) {
          var id = Math.floor(Math.random() * possibleChallenges.length);
          console.log("starting challenge: " + possibleChallenges[id].get("id"));
          possibleChallenges[id].trigger("start", this);
        }
      } else if (funType > 0.75) {
        var possibleEvents = [];
        for (var i = 0; i < this.events.length; ++i) {
          var x = Math.random();
          var probability = this.events.at(i).get("probability");
          if (probability >= x) {
            possibleEvents.push(this.events.at(i));
          }
        }
        if(possibleEvents.length > 0) {
          var id = Math.floor(Math.random() * possibleEvents.length);
          possibleEvents[id].trigger("start", this.player);
        }        
      } else {
        // NO-OP
      }
    }
    this.player.lay();
  },

});
