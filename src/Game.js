Number.prototype.formatNumber = function(c, d, t){
  if(this == 0) {
    return "0";
  }
  if (this < 1) {
    return this.toFixed(1);
  }
  if(this - Math.floor(this) != 0) {
    c = 1;
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
  EVENT_INTERVAL: 8, //in seconds
  PURCHASE_COST_MULTIPLIER: 1.15,
  REALISTIC_MANUAL_CLICK_COUNT_THRESHOLD: 25,
  
  DEBUG: false,
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
  upgrades: null,
  eggTimer: null,

  initialize: function() {
    this.player = new Player();
    this.DEBUG = this.DEBUG || this.DEBUG_FORCE_CHALLENGES || this.DEBUG_FORCE_EVENTS;
    this.debug("IN DEBUG MODE");
  },

  debug: function() {
    if(this.DEBUG) {
      var i = -1, l = arguments.length, args = [], fn = 'console.log(args)';
      while(++i<l){
          args.push('args['+i+']');
      };
      fn = new Function('args',fn.replace(/args/,args.join(',')));
      fn(arguments);
    }
  },

  load: function() {
    this.nests = new Nests(nestData);
    this.nests.each(function (nest) { new NestView({ model: nest }); });

    this.birds = new Birds(birdData);
    this.birds.each(function (bird) { new BirdView({ model: bird }); });

    this.upgrades = new Upgrades(upgradeData);
    this.upgrades.each(function (upgrade) { new UpgradeView({ model: upgrade }); });  

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
    this.on("layButtonClick", function (event) {
      this.player.manualLay(event);
    }.bind(this));

    this.on("buyNest", function (nest) {
      this.player.buyNest(nest ? new Nest(_.clone(nest.attributes)) : new Nest);
    }.bind(this));

    this.on("buyBird", function (bird) {
      this.player.buyBird(bird ? new Bird(_.clone(bird.attributes)) : new Bird);
    }.bind(this));

    this.on("buyUpgrade", function (upgrade) {
      this.player.buyUpgrade(upgrade ? new Upgrade(_.clone(upgrade.attributes)) : new Upgrade);
    }.bind(this));
  },

  start: function() {
    this.eggTimer = setInterval(function () {
      this.player.inc("totalTimePlayed", 1);
      this.mainLoop();
    }.bind(this), 1000);
  },

  mainLoop: function() {
    this.debug("Manual click count", this.player.manualClickCount);
    if(this.player.manualClickCount > this.REALISTIC_MANUAL_CLICK_COUNT_THRESHOLD) {
      alert("You're cheating!");
      window.location.href = "http://www.youtube.com/watch?v=oHg5SJYRHA0";
    }
    if(((this.DEBUG) && this.player.get("totalTimePlayed") % this.DEBUG_EVENT_INTERVAL == 0) || 
       (this.player.get("totalTimePlayed") % this.EVENT_INTERVAL == 0)) {

      this.debug("force occurance");
      var type = Math.random();

      if(((!this.DEBUG_FORCE_EVENTS && this.DEBUG_FORCE_CHALLENGES) || (type > 0.5 && type <= 0.75)) && !game.inChallenge) {
        this.debug("force challenge");

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
          var challengeInstance = new Challenge(_.clone(possibleChallenges[id].attributes))
          challengeInstance.trigger("start", this);
        }

      } else if (((this.DEBUG_FORCE_EVENTS && !this.DEBUG_FORCE_CHALLENGES) || (type > 0.75)) && !game.ongoingEvent) {
        this.debug("force event");

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
          var eventInstance = new Event(_.clone(possibleEvents[id].attributes))
          eventInstance.trigger("start", this.player);       
        }        
      }
    }
    
    this.awards.each(function (award) { award.process(); });
    this.player.lay();
    this.player.manualClickCount = 0;
  },

  toJSON: function () {
    var obj = {};
    _.extend(obj, this.attributes);
    obj.player = _.extend({}, this.player.attributes);
    obj.player.nests = [];
    obj.player.upgrades = [];
    obj.awards = [];
    obj.game = {};
    obj.game.nests = [];
    obj.game.birds = [];


    game.player.upgrades.each(function (u) {
      obj.player.upgrades.push({id: u.attributes.id});
    }.bind(this)); 

    game.nests.each(function (n) {
      obj.game.nests.push({name: n.attributes.name, cost: n.attributes.cost, numberOwned: n.attributes.numberOwned});
    }.bind(this));    


    game.birds.each(function (b) {
      obj.game.birds.push({name: b.attributes.name, cost: b.attributes.cost, numberOwned: b.attributes.numberOwned});
    }.bind(this));

    this.player.nests.each(function (n) {
      var i = obj.player.nests.push({name: n.attributes.name}) - 1;
      obj.player.nests[i].birds = [];

      n.birds.each(function (b) {
        obj.player.nests[i].birds.push({name: b.attributes.name});
      }.bind(this));
    }.bind(this));

    this.awards.each(function (a) {
      if (a.attributes.awarded) {
        obj.awards.push({id: a.attributes.id});
      }
    }.bind(this));

    return obj
  },

  parse: function (obj) {

    for (i = 0; i < obj.awards.length; ++i) {
      var id = obj.awards[i].id;
      this.awards.each(function (a) {
        if (a.attributes.id == id) {
          a.set("awarded", true); 
        }
      }.bind(this));
    }

    delete obj.awards;

    if ("upgrades" in obj.player) {
      for (i = 0; i < obj.player.upgrades.length; ++i) {
        var id = obj.player.upgrades[i].id;
        this.upgrades.each(function (a) {
          if (a.attributes.id == id) {
            game.player.upgrades.push(new Upgrade(_.clone(a.attributes)));
            a.set("purchased", true);
            a.set("hidden", true);
          }
        }.bind(this));
      }
    }

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
