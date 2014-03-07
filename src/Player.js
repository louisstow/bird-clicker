var Player = Backbone.Model.extend({
  defaults: {
    totalEggs: 0,
    eggs: 0,
    eggIncrement: 0.1, // per lay
    eggMultiplier: 1,
    manualClicks: 0,
    birdCount: 0,
    nestCount: 0,
    challengesCompleted: 0,
    totalTimePlayed: 0,
    rewardedAwards: 0,
    purchasedUpgrades: 0,
    extraEggs: 0 //how many extra eggs are awarded per second - calculated per second
  },
  manualClickCount: 0,
  nests: null,
  badges: null,
  upgrades: null,

  // array of functions which return a multiplier value, the product of these with the eggMultiplier attribute make
  // the final multiplier.  See x777_cookie event for demo
  // use this for short lived, non saved mutators
  multipliers: [],

  load: function({ nest }) {
    this.upgrades = new Upgrades;

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
    var eps = this.calculateEggsPerSecond();

    //game.debug("adding " + eps + " eggs");  
    this.inc("totalEggs", eps);
    this.inc("eggs", eps);
  },

  buyNest: function (nest) {
    var nestObject = game.nests.findWhere({name:nest.get("name")});
    if (this.get("eggs") < nestObject.get("cost")) {
      $.notify(Math.round(this.get("eggs")) + " eggs isn't enough to buy a nest that costs " + nestObject.get("cost") + " eggs!");
      return;
    }
    this.dec("eggs", nestObject.get("cost"));
    return this.addNest(nest);
  },

  addNest: function(nest) {
    this.nests.add(nest);

    var nestObject = game.nests.findWhere({name:nest.get("name")});
    nestObject.set("numberOwned", nestObject.get("numberOwned") + 1);
    nestObject.set("cost", game.getPrice(nestObject.get("baseCost"), nestObject.get("numberOwned")));
    nestObject.set("forceRender", true);
    this.trigger("forceRenderStore");
    return nest;
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

        this.dec("eggs", birdObject.get("cost"));
        this.addBird(nest, bird);

        return nest;
      }
    }

    $.notify("Your nests are already full of birds!");
    return false;
  },
  addBird: function(nest, bird) {

    var birdObject = game.birds.findWhere({"name":bird.get("name")});

    nest.addBird(bird);
    this.inc("eggIncrement", bird.get("rewardPerTick"));

    birdObject.set("numberOwned", birdObject.get("numberOwned") + 1);
    birdObject.set("cost", game.getPrice(birdObject.get("baseCost"), birdObject.get("numberOwned")));
    birdObject.set("forceRender", true);
    this.trigger("forceRenderStore");
  },
  buyUpgrade: function (upgrade) {

    var upgradeObject = game.upgrades.findWhere({"id":upgrade.get("id")});
    console.log("Try to purchase upgrade for", upgradeObject.get("cost"));
    if (this.get("eggs") < upgradeObject.get("cost")) {
      $.notify(Math.round(this.get("eggs")) + " eggs isn't enough to buy as upgrade that costs " + upgradeObject.get("cost") + " eggs!");
      return false;
    }

    this.upgrades.add(upgrade);

    this.dec("eggs", upgradeObject.get("cost"));
    upgradeObject.set("purchased", true);
    upgradeObject.set("forceRender", true);
    this.inc("purchasedUpgrades", 1);
    this.trigger("forceRenderStore");
  },

  sellBird: function (bird) {
    this.dec("eggIncrement", bird.get("rewardPerTick"));
    this.inc("eggs", bird.get("cost") * DEPRECIATION | 0);
    bird.nest.removeBird(bird);
  },

  manualLay: function(event) {

    this.manualClickCount++;

    this.inc("manualClicks", 1);
    this.lay();

    new EggParticle(event.clientX, event.clientY);
  },

  calculateEggsPerSecond: function() {

    //calculate upgrade effects, they will normally add to the extraEggs var
    this.upgrades.each((upgrade) => {
      upgrade.process();
    });

    var totalMultiplier = this.get("eggMultiplier");
    _.each(this.multipliers, (func) => {
      totalMultiplier *= func();
    });
    game.debug("total multiplier", totalMultiplier);

    var eggsToAdd = (this.extraEggs + this.get("eggIncrement")) * totalMultiplier;

    //reset extra eggs as this is calculated per second
    this.extraEggs = 0;
    return eggsToAdd;
  }
});
