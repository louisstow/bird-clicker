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

    this.player = new Player();
    this.scoreboard = new Scoreboard({ model: this.player });
    this.stats = new Stats({ model: this.player });
    console.log(this.player.attributes)
    this.addEventListeners();

    this.nests = new Nests(nestData);
    this.nests.each((nest) => new NestView({ model: nest, player: this.player }));

    this.birds = new Birds();
    this.populate(birdData, this.birds);

    this.challenges = new Challenges();
    this.populate(challengeData, this.challenges);

    this.events = new Events();
    this.populate(eventData, this.events);

    console.log("events: " + this.events.length);
    console.log("challenges: " + this.challenges.length);


  },

  populate: function(list, collection) {
    list.forEach((data) => {
      collection.add(data);
    });  
  },

  addEventListeners: function() {
    this.on("hatch", () => {
      this.player.hatch();
    });

    this.on("buyNest", () => {
      this.player.buyNest(new Nest);
    });

    this.on("buyBird", () => {
      this.player.buyBird(new Bird);
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
      console.log("check for events & challanges");
      var funType = Math.random();
      if(funType > 0.5 && funType <= 0.75) {
        console.log("challenge type");
        var possibleChallenges = [];
        for (var i = 0; i < this.challenges.length; ++i) {
          var x = Math.random();
          var probability = this.challenges.at(i).get("probability");
          console.log("x:" + x + " >= " + probability);
          if (probability >= x) {
            possibleChallenges.push(this.challenges.at(i));
            console.log("add possible challenge ");
          }
        }
        if(possibleChallenges.length > 0) {
          var id = Math.floor(Math.random() * possibleChallenges.length);
          console.log("challenges: " + id);
          possibleChallenges[id].trigger("start", this.player);
        }
      } else if (funType > 0.75) {
        console.log("event type");
        var possibleEvents = [];
        for (var i = 0; i < this.events.length; ++i) {
          var x = Math.random();

          var probability = this.events.at(i).get("probability");
          if (probability >= x) {
            possibleEvents.push(this.events.at(i));

            console.log("add possible event ");
          }
        }
        if(possibleEvents.length > 0) {
          var id = Math.floor(Math.random() * possibleEvents.length);
          console.log("event: " + id);
          possibleEvents[id].trigger("start", this.player);
        }        
      } else {
        console.log("no fun this time");
      }
    }
    this.player.lay();
  },

});