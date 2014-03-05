var NestView = Backbone.View.extend({
  id: function() { return this.model.get("name") + "NestView" },

  initialize: function(data) {
    this.listenTo(this.model, "change", this.render);
    $("#items").append(this.render().$el);
  },

  template: _.template('<img height=64 src="<%- image %>">'),

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

  events: {
    "click": "buy",
  },

  buy: function() {
    game.trigger("buyNest", this.model);
  },

});
