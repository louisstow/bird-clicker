var NestView = Backbone.View.extend({
  id: function() { return this.model.get("name") + "NestView" },

  initialize: function(data) {
    this.player = data.player;
    this.listenTo(this.model, "change", this.render);
    $("#items").append(this.render().$el);
  },

  template: _.template('<img width=24 height=24 src="<%- image %>">'),

  events: {
    "click": "buy",
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

  buy: function() {
    this.player.buyNest(this.model);
  },

});
