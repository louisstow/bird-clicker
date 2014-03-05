var Game = Backbone.Model.extend({
  DEPRECIATION: 0.5,
  EVENT_INTERVAL: 7, //in seconds
  player: null,
  scoreboard: null,
  challenges: null,
  birds: null,
  nests: null,
  eggTimer: null,

  initialize: function() {

    this.player = new Player(this);
    this.scoreboard = new Scoreboard({ model: this.player });

    this.addEventListeners();
    
    this.challenges = new Challenges();

    challengeData.forEach((data) => {
      this.challenges.add(data);
    });


    this.nests = new Nests();
    this.populate(nestData, this.nests);

    this.birds = new Birds();
    this.populate(birdData, this.birds);

    this.challenges = new Challenges();
    this.populate(challengeData, this.challenges);

    // var id = Math.floor(Math.random() * challenges.length);

    // var challenge = challenges.at(id);

    // challenge.trigger("start", player);
  },

  populate: function(list, collection) {
    list.forEach((data) => {
      collection.add(data);
    });  
  },

  addEventListeners: function() {
    this.on("performClick", () => {
      this.player.performClick();
    });

    this.on("buyNest", () => {
      this.player.buyNest(new Nest);
    });

    this.on("buyBird", () => {
      this.player.buyBird(new Bird);
    });
  },

  start: function() {
    this.eggTimer = setInterval(() => this.mainLoop(), 1000);
  },

  mainLoop: function() {
    //TODO calculate if event or challange fires 
    this.player.lay();
  },

});