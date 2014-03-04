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

});
