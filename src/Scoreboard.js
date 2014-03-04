var Scoreboard = Backbone.View.extend({
  id: "scoreboard",

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    $("#scoreboard").text(
      "Eggs: " + this.model.get("eggs") + ". " +
      "Nests: " + this.model.nests.length + ". " +
      this.model.nests.map((nest) =>
        "Nest " + nest.get("name") + ": " +
        nest.birds.length + "/" + nest.get("capacity") + " birds. "
      )
    );
  },

});
