var DEPRECIATION = 0.5;

var Player = Backbone.Model.extend({
  eggs: 0,
  eggTimer: null,
  eggFrequency: 1, // per lay

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
    this.eggs = this.eggs + this.eggFrequency;
    console.log("eggs: " + this.eggs);
  },

  buyBird: function (bird) {
    if (this.eggs < bird.cost) {
      return false;
    }

    for (var i = 0; i < this.nests.length; ++i) {
      if (!this.nests[i].atCapacity()) {
        this.nests[i].addBird(bird);
        this.eggFrequency += bird.rewardPerTick;
        this.eggs -= bird.cost;
        return this.nests[i];
      }
    }

    return false;
  },

  sellBird: function (bird) {
    this.eggFrequency -= bird.rewardPerTick;
    this.eggs += bird.cost * DEPRECIATION | 0;
    bird.nest.removeBird(bird);
  }
});
