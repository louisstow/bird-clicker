var Game = Backbone.Model.extend({
  DEPRECIATION: 0.5,
  EVENT_INTERVAL: 2, //in seconds

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
    this.rewardedAwards = new RewardedAwardListView({model: this.awards });
    console.log(this.player.attributes);
    this.addEventListeners();
    this.setupNotifyStyles();

  },

  setupNotifyStyles: function() {

    $.notify.addStyle('challenge', {
      html: "<div>" +
            "<div class='clearfix'>" +
            "<div class='title' data-notify-html='title'/>" +
            "<div class='buttons'>" +
              "<button class='no'>Cancel</button>" +
              "<button class='yes'>Accept Challenge</button>" +
            "</div>" +
            "</div></div>" 
    });
    $.notify.addStyle('award', {
      html: "<div><div class='clearfix'><div data-notify-text='name'/><br /><div data-notify-text='description'/></div></div>"
    });


  },

  addEventListeners: function() {
    this.on("layButtonClick", () => {
      this.player.manualLay();
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
      if((funType > 0.0 && funType <= 0.75) && !game.inChallenge) {
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

  notify: function(description) {
    new NotificationView({ model: new Backbone.Model({ description: description }) });
  },

});
