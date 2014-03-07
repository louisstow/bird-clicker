Number.prototype.formatNumber = function(c, d, t){
  if (this < 1) {
    return this.toFixed(1);
  }
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 0 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

var Game = Backbone.Model.extend({
  DEPRECIATION: 0.5,
  EVENT_INTERVAL: 14, //in seconds
  PURCHASE_COST_MULTIPLIER: 1.15,

  DEBUG_FORCE_CHALLENGES: false,
  DEBUG_FORCE_EVENTS: false,
  DEBUG_EVENT_INTERVAL: 2, //in seconds

  player: null,
  scoreboard: null,
  challenges: null,
  awards: null,
  events: null,
  birds: null,
  nests: null,
  addons: null,
  eggTimer: null,

  initialize: function() {
    this.player = new Player();
  },

  load: function() {
    this.nests = new Nests(nestData);
    this.nests.each((nest) => new NestView({ model: nest }));

    this.birds = new Birds(birdData);
    this.birds.each((bird) => new BirdView({ model: bird }));

    this.addons = new Addons(addonData);
    this.addons.each((addon) => new AddonView({ model: addon }));  

    this.challenges = new Challenges(challengeData);
    this.events = new Events(eventData);
    this.awards = new Awards(awardData);

    // XXX Maybe Nest and Bird should have "clone" methods.
    var nest = new Nest(_.clone(this.nests.at(0).attributes));
    var bird = new Bird(_.clone(this.birds.at(0).attributes));
    this.birds.at(0).set("numberOwned", 1);
    this.nests.at(0).set("numberOwned", 1);
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
              "<button class='yes'>Accept Challenge</button>" +
            "</div>" +
            "</div></div>" 
    });
    $.notify.addStyle('award', {
      html: "<div><div class='clearfix'><div data-notify-text='name'/><br /><div data-notify-text='description'/></div></div>"
    });


  },

  addEventListeners: function() {
    this.on("layButtonClick", (event) => {
      this.player.manualLay(event);
    });

    this.on("buyNest", (nest) => {
      this.player.buyNest(nest ? new Nest(_.clone(nest.attributes)) : new Nest);
    });

    this.on("buyBird", (bird) => {
      this.player.buyBird(bird ? new Bird(_.clone(bird.attributes)) : new Bird);
    });

    this.on("buyAddon", (addon) => {
      this.player.buyAddon(addon ? new Addon(_.clone(addon.attributes)) : new Addon);
    });
  },

  start: function() {
    this.eggTimer = setInterval(() => {
      this.player.inc("totalTimePlayed", 1);
      this.mainLoop();
    }, 1000);
  },

  mainLoop: function() {
    if(((this.DEBUG_FORCE_CHALLENGES || this.DEBUG_FORCE_EVENTS) && this.player.get("totalTimePlayed") % this.DEBUG_EVENT_INTERVAL == 0) || 
       (this.player.get("totalTimePlayed") % this.EVENT_INTERVAL == 0)) {
      var type = Math.random();
      if(this.FORCE_CHALLENGES || (type > 0.5 && type <= 0.75) && !game.inChallenge) {
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
      } else if (this.FORCE_EVENTS || type > 0.75) {
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
    obj.awards = [];
    obj.game = {};
    obj.game.nests = [];
    obj.game.birds = [];


    game.nests.each((n) => {
      console.log("nest:", n.attributes.name, n.attributes.cost, n.attributes.numberOwned);
      obj.game.nests.push({name: n.attributes.name, cost: n.attributes.cost, numberOwned: n.attributes.numberOwned});
    });    


    game.birds.each((b) => {
      console.log("bird:", b.attributes.name, b.attributes.cost, b.attributes.numberOwned);
      obj.game.birds.push({name: b.attributes.name, cost: b.attributes.cost, numberOwned: b.attributes.numberOwned});
    });

    this.player.nests.each((n) => {
      var i = obj.player.nests.push({name: n.attributes.name}) - 1;
      obj.player.nests[i].birds = [];

      n.birds.each((b) => {
        obj.player.nests[i].birds.push({name: b.attributes.name});
      });
    });

    this.awards.each((a) => {
      if (a.attributes.awarded) {
        obj.awards.push({id: a.attributes.id});
      }
    });

    return obj
  },

  parse: function (obj) {

    for (i = 0; i < obj.awards.length; ++i) {
      var id = obj.awards[i].id;
      this.awards.each((a) => {
        if (a.attributes.id == id) {
          a.set("awarded", true); 
        }
      });
    }

    delete obj.awards;

    // Build an array of nests and then reset the player's nests collection
    // all at once to trigger one change event instead of one per nest/bird.
    var nests = [];

    for (var i = 0; i < obj.player.nests.length; ++i) {
      var content = nestDataMap[obj.player.nests[i].name];
      // console.log(obj.player.nests[i].name, content);
      var n = new Nest(content);

      for (var j = 0; j < obj.player.nests[i].birds.length; ++j) {
        content = birdDataMap[obj.player.nests[i].birds[j].name];
        var b = new Bird(content);
        n.birds.push(b);
      }

      nests.push(n);
    }
    this.player.nests.reset(nests);

    for (var i = 0; i < obj.game.nests.length; ++i) {
      var name = obj.game.nests[i].name;
      var nest = game.nests.findWhere({name:name});
      nest.attributes.cost = obj.game.nests[i].cost;
      nest.attributes.numberOwned = obj.game.nests[i].numberOwned;
    }
    delete obj.game.nests;

    for (var i = 0; i < obj.game.birds.length; ++i) {
      var name = obj.game.birds[i].name;
      var bird = game.birds.findWhere({name:name});
      if (bird) {
        bird.attributes.cost = obj.game.birds[i].cost;
        bird.attributes.numberOwned = obj.game.birds[i].numberOwned;
      } else {
        console.warn("couldn't restore bird " + name);
      }
    }
    delete obj.game.birds;

    delete obj.player.nests;
    this.player.set(obj.player);

    delete obj.player;
    this.set(obj);


  },

  notify: function(description) {
    new NotificationView({ model: new Backbone.Model({ description: description }) });
  },

  getPrice: function(basePrice, amount) {
    return Math.ceil(basePrice * Math.pow(game.PURCHASE_COST_MULTIPLIER, amount));
  }

});
