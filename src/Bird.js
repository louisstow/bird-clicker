var Bird = Backbone.Model.extend({
  name: null,
  description: null,
  image: null,
  cost: null, // unit: eggs
  rewardPerTick: null, // unit: eggs
  showAfterEggCount: 1,
});