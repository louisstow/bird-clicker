var Player = Backbone.Model.extend({
  defaults: {
    totalEggs: 0,
    eggs: 0,
    eggIncrement: 1, // per lay
    eggMultiplier: 1,
    manualClicks: 0,
    birdCount: 0,
    nestCount: 0,
    challengesCompleted: 0,
    totalTimePlayed: 0,
    rewardedAwards: 0
  },

  nests: null,
  badges: null,

  load: function({ nest }) {
    this.nests = new Nests;
    this.nests.init();
    this.nests.add(nest);

    this.on("lay", () => {
      this.performLay();
    });
  },

  inc: function (prop, diff) {
    this.set(prop, this.get(prop) + diff);
  },

  dec: function (prop, diff) {
    this.inc(prop, -diff);
  },

  lay: function() {
    this.trigger("lay");
  },

  performLay: function() {
    this.inc("totalEggs", this.get("eggIncrement") * this.get("eggMultiplier"));
    this.inc("eggs", this.get("eggIncrement") * this.get("eggMultiplier"));
  },

  buyNest: function (nest) {
    var nestObject = game.nests.findWhere({name:nest.get("name")});
    if (this.get("eggs") < nestObject.get("cost")) {
      $.notify(Math.round(this.get("eggs")) + " eggs isn't enough to buy a nest that costs " + nestObject.get("cost") + " eggs!");
      return;
    }
    this.dec("eggs", nestObject.get("cost"));
    this.addNest(nest);
  },

  addNest: function(nest) {
    this.nests.add(nest);

    var nestObject = game.nests.findWhere({name:nest.get("name")});
    nestObject.set("numberOwned", nestObject.get("numberOwned") + 1);
    nestObject.set("cost", game.getPrice(nestObject.get("baseCost"), nestObject.get("numberOwned")));
    nestObject.set("forceRender", true);
    this.trigger("forceRenderStore");
  },

  buyBird: function (bird) {

    var birdObject = game.birds.findWhere({"name":bird.get("name")});
    console.log("Try to purchase bird for", birdObject.get("cost"));
    if (this.get("eggs") < birdObject.get("cost")) {
      $.notify(Math.round(this.get("eggs")) + " eggs isn't enough to buy a bird that costs " + birdObject.get("cost") + " eggs!");
      return false;
    }

    for (var i = 0; i < this.nests.length; ++i) {
      var nest = this.nests.at(i);
      if (!nest.atCapacity()) {
        nest.addBird(bird);

        this.inc("eggIncrement", bird.get("rewardPerTick"));
        this.dec("eggs", birdObject.get("cost"));

        birdObject.set("numberOwned", birdObject.get("numberOwned") + 1);
        birdObject.set("cost", game.getPrice(birdObject.get("baseCost"), birdObject.get("numberOwned")));
        birdObject.set("forceRender", true);
        this.trigger("forceRenderStore");
        return nest;
      }
    }

    $.notify("Your nests are already full of birds!");
    return false;
  },

  sellBird: function (bird) {
    this.dec("eggIncrement", bird.get("rewardPerTick"));
    this.inc("eggs", bird.get("cost") * DEPRECIATION | 0);
    bird.nest.removeBird(bird);
  },

  manualLay: function() {
    this.inc("manualClicks", 1);
    this.lay();
  }
});
