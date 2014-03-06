var Scoreboard = Backbone.View.extend({
  id: "scoreboard",

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    $("#eggs").text(Math.round(this.model.get("eggs")));
    $("#increment").text("Laying " + Math.round(this.model.get("eggIncrement") * this.model.get("eggMultiplier") * 1000) / 1000 + " eggs per second");
  },

});
