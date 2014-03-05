var BirdView = Backbone.View.extend({
  id: function() { return this.model.get("name") + "BirdView" },

  initialize: function(data) {
    this.listenTo(this.model, "change", this.render);
    $("#items").append(this.render().$el);
  },

  template: _.template('<img width=24 height=24 src="<%- image %>">'),

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

  events: {
    "click": "buy",
  },

  buy: function() {
    game.trigger("buyBird", this.model);
  },

});
