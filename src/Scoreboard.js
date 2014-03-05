var Scoreboard = Backbone.View.extend({
  id: "scoreboard",

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    $("#eggs").text(this.model.get("eggs"));
    $("#increment").text(this.model.get("eggIncrement") + " per second");
  },

});
