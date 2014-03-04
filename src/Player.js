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
    this.nests.add(new Nest);

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

  buyNest: function (nest) {
    if (this.get("eggs") < nest.get("cost")) {
      console.warn(this.get("eggs") + " eggs isn't enough to buy a nest for " + nest.get("cost") + ".");
      return;
    }

    this.nests.add(nest);
    this.set("eggs", this.get("eggs") - nest.get("cost"));
  },

  buyBird: function (bird) {
    if (this.get("eggs") < bird.get("cost")) {
      console.warn(this.get("eggs") + " eggs isn't enough to buy a bird for " + bird.get("cost") + ".");
      return false;
    }

    for (var i = 0; i < this.nests.length; ++i) {
      var nest = this.nests.at(i);
      if (!nest.atCapacity()) {
        nest.addBird(bird);

        this.set("eggIncrement", this.get("eggIncrement") + bird.get("rewardPerTick"));
        this.set("eggs", this.get("eggs") - bird.get("cost"));

        return nest;
      }
    }

    return false;
  },

  sellBird: function (bird) {
    this.set("eggIncrement", this.get("eggIncrement") - bird.get("rewardPerTick"));
    this.set("eggs", this.get("eggs") + bird.get("cost") * DEPRECIATION | 0);
    bird.nest.removeBird(bird);
  },
  
  performClick: function() {
    this.lay();
  }
});
