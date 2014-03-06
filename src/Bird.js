var Bird = Backbone.Model.extend({
  defaults: {
    'name': null,
    'description': null,
    'image': null,
    'baseCost': -1, // unit: eggs
    'cost': 0,
    'rewardPerTick': 1, // unit: eggs
    'showAfterEggCount': 1,
    'shown': false,
    'disabled': true,
    'numberOwned': 0
  },

  initialize: function (data) {
    this.set("cost", this.get("baseCost"));
  },
});