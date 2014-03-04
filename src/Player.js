var DEPRECIATION = 0.5;

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
  },

  start: function() {
    this.eggTimer = setInterval(() => this.lay(), 1000);
  },

  lay: function() {
    this.set("eggs", this.get("eggs") + this.get("eggIncrement"));
  },

  buyBird: function (bird) {
    if (this.eggs < bird.cost) {
      return false;
    }

    for (var i = 0; i < this.nests.length; ++i) {
      if (!this.nests[i].atCapacity()) {
        this.nests[i].addBird(bird);

        this.set("eggIncrement", this.get("eggIncrement") + bird.get("rewardPerTick"));
        this.set("eggs", this.get("eggs") - bird.get("rewardPerTick"));

        return this.nests[i];
      }
    }

    return false;
  },

  sellBird: function (bird) {
    this.set("eggIncrement", this.get("eggIncrement") - bird.get("rewardPerTick"));
    this.set("eggs", this.get("eggs") + bird.get("cost") * DEPRECIATION | 0);
    bird.nest.removeBird(bird);
  }
});
