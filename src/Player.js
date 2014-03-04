var Player = Backbone.Model.extend({
  eggs: 0,
  eggTimer: null,
  eggFrequency: 1, // per second

  nests: [],
  birds: [], // or perhaps birds only need to be referenced by nests?
  badges: [],
});
