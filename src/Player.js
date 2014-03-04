var Player = Backbone.Model.extend({
  eggs: 0,
  eggTimer: null,
  eggFrequency: 1, // per second

  nests: null,
  birds: null, // or perhaps birds only need to be referenced by nests?
  badges: null,

  initialize: function(data) {
    this.nests = new Nests;
  }
});
