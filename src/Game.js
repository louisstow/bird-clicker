var Game = Backbone.Model.extend({
  DEPRECIATION: 0.5,
  EVENT_INTERVAL: 10, //in seconds

  player: null,
  scoreboard: null,
  challenges: null,
  awards: null,
  events: null,
  birds: null,
  nests: null,
  eggTimer: null,

  initialize: function() {
    this.player = new Player();
  },

  load: function() {
    this.nests = new Nests(nestData);
    this.nests.each((nest) => new NestView({ model: nest }));

    this.birds = new Birds(birdData);
    this.birds.each((bird) => new BirdView({ model: bird }));


    this.challenges = new Challenges(challengeData);
    this.events = new Events(eventData);
    this.awards = new Awards(awardData);

    // XXX Maybe Nest and Bird should have "clone" methods.
    var nest = new Nest(_.clone(this.nests.at(0).attributes));
    var bird = new Bird(_.clone(this.birds.at(0).attributes));
    nest.addBird(bird);
    this.player.load({ nest: nest });

    this.scoreboard = new Scoreboard({ model: this.player });
    this.stats = new StatsView({ model: this.player });
    this.receivedAwards = new AwardListView({model: this.awards });
    console.log(this.player.attributes);
    this.addEventListeners();

  },

  addEventListeners: function() {
    this.on("hatch", () => {
      this.player.hatch();
    });

    this.on("buyNest", (nest) => {
      this.player.buyNest(nest ? new Nest(_.clone(nest.attributes)) : new Nest);
    });

    this.on("buyBird", (bird) => {
      this.player.buyBird(bird ? new Bird(_.clone(bird.attributes)) : new Bird);
    });
  },

  start: function() {
    this.eggTimer = setInterval(() => {
      this.player.inc("totalTimePlayed", 1);
      this.mainLoop()
    } , 1000);
  },

  mainLoop: function() {
    if(this.player.get("totalTimePlayed") % this.EVENT_INTERVAL == 0) {
      var funType = Math.random();
      if((funType > 0.5 && funType <= 0.75) && !game.inChallenge) {
        var possibleChallenges = [];
        for (var i = 0; i < this.challenges.length; ++i) {
          var x = Math.random();
          var probability = this.challenges.at(i).get("probability");
          if (probability >= x) {
            possibleChallenges.push(this.challenges.at(i));
          }
        }
        if(possibleChallenges.length > 0) {
          var id = Math.floor(Math.random() * possibleChallenges.length);
          possibleChallenges[id].trigger("start", this);
        }
      } else if (true || funType > 0.75) {
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
    this.awards.each((award) => award.process());
    this.player.lay();
  },

  toJSON: function () {
    var obj = {};
    _.extend(obj, this.attributes);
    obj.player = _.extend({}, this.player.attributes);
    obj.player.nests = [];

    this.player.nests.each((n) => {
      var i = obj.player.nests.push({name: n.attributes.name}) - 1;
      obj.player.nests[i].birds = [];

      n.birds.each((b) => {
        obj.player.nests[i].birds.push({name: b.attributes.name});
      });
    });

    return obj
  },

  parse: function (obj) {

    this.player.nests.reset();

    for (var i = 0; i < obj.player.nests.length; ++i) {
      var content = nestDataMap[obj.player.nests[i].name];
      console.log(obj.player.nests[i].name, content)
      var n = new Nest(content);

      for (var j = 0; j < obj.player.nests[i].birds.length; ++j) {
        content = birdDataMap[obj.player.nests[i].birds[j].name];
        var b = new Bird(content);
        n.birds.push(b);
      }

      this.player.nests.push(n);
    }

    delete obj.player.nests;
    this.player.set(obj.player);

    delete obj.player;

    this.set(obj);
  },

  notify: function(description) {
    new NotificationView({ model: new Backbone.Model({ description: description }) });
  },

});
