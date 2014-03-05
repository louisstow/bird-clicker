var DEPRECIATION = 0.5;

var Player = Backbone.Model.extend({
  defaults: {
    eggs: 0,
    eggIncrement: 1, // per lay
    manualClicks: 0,
    manualClickIncrement: 1,
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

  inc: function (prop, diff) {
    this.set(prop, this.get(prop) + diff);
  },

  dec: function (prop, diff) {
    this.inc(prop, -diff);
  },

  start: function() {
    this.eggTimer = setInterval(() => this.mainLoop(), 1000);
  },

  mainLoop: function() {
    //TODO calculate if event or challange fires 
    this.lay();
  },

  lay: function() {
    this.inc("eggs", this.get("eggIncrement"));
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
  
  performClick: function() {
    this.inc("manualClicks", 1);
    this.inc("eggs", this.get("manualClickIncrement"));
  }
});
