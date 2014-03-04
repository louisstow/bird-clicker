var Player = Backbone.Model.extend({
  defaults: {
    eggs: 0,
    eggFrequency: 1, // per lay // XXX rename to eggIncrement
  },

  eggTimer: null,
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
    this.set("eggs", this.get("eggs") + this.get("eggFrequency"));
  },

});
