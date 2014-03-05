var Stats = Backbone.View.extend({
  id: "stats",

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    $("#stats").html(JSON.stringify(this.model.toJSON()))
    console.log(this.model.toJSON())
  },

});
