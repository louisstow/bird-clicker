var BirdView = Backbone.View.extend({

  initialize: function(data) {
    this.listenTo(this.model, "change", this.render);
  },

  template: _.template('<img width=24 height=24 src="<%- image %>">'),

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

});

var BuyableBirdView = BirdView.extend({

  events: {
    "click": "buy",
  },

  buy: function() {
    game.trigger("buyBird", this.model);
  },

});
