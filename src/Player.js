var Player = Backbone.Model.extend({
  defaults: {
    eggs: 0,
    eggIncrement: 1, // per lay
    eggMultiplier: 1,
    manualClicks: 0,
    manualClickIncrement: 1,
    manualMultiplier: 1,
  },

  nests: null,
  badges: null,

  initialize: function({ nest }) {
    this.nests = new Nests;
    this.nests.add(nest);
  },

  inc: function (prop, diff) {
    this.set(prop, this.get(prop) + diff);
  },

  dec: function (prop, diff) {
    this.inc(prop, -diff);
  },

  lay: function() {
    this.inc("eggs", this.get("eggIncrement") * this.get("eggMultiplier"));
  },

  buyNest: function (nest) {
    if (this.get("eggs") < nest.get("cost")) {
      console.warn(this.get("eggs") + " eggs isn't enough to buy a nest for " + nest.get("cost") + ".");
      return;
    }

    this.nests.add(nest);
    this.dec("eggs", nest.get("cost"));
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

        this.inc("eggIncrement", bird.get("rewardPerTick"));
        this.dec("eggs", bird.get("cost"));

        return nest;
      }
    }

    return false;
  },

  sellBird: function (bird) {
    this.dec("eggIncrement", bird.get("rewardPerTick"));
    this.inc("eggs", bird.get("cost") * DEPRECIATION | 0);
    bird.nest.removeBird(bird);
  },

  hatch: function() {
    this.inc("manualClicks", 1);
    this.inc("eggs", this.get("manualClickIncrement") * this.get("manualMultiplier"));
  }
});
