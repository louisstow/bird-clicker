var Player = Backbone.Model.extend({
  defaults: {
    eggs: 0,
    eggIncrement: 1, // per lay
  },

  eggTimer: null,
  nests: null,
  birds: null, // or perhaps birds only need to be referenced by nests?
  badges: null,

  initialize: function(data) {
    this.nests = new Nests;

    this.on("performClick", () => {
      this.performClick();
    });
  },

  start: function() {
    this.eggTimer = setInterval(() => this.lay(), 1000);
  },

  lay: function() {
    this.set("eggs", this.get("eggs") + this.get("eggIncrement"));
  },

  buyBird: function (bird) {
    for (var i = 0; i < this.nests.length; ++i) {
      if (!this.nests[i].atCapacity()) {
        this.nests[i].addBird(bird);
        this.set("eggIncrement", this.get("eggIncrement") + bird.rewardPerTick);
        return this.nests[i];
      }
    }

    return false;
  },

  performClick: function() {
    this.lay();
  }
});
