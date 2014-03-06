var Bird = Backbone.Model.extend({
  defaults: {
    'name': null,
    'description': null,
    'image': null,
    'baseCost': 1, // unit: eggs
    'cost': 1,
    'rewardPerTick': 1, // unit: eggs
    'showAfterEggCount': 1,
    'shown': false,
    'numberOwned': 0
  },

  initialize: function (data) {
    this.set("cost", this.get("baseCost"));
  },
});