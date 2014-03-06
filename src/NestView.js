var NestView = Backbone.View.extend({

  initialize: function(data) {
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model.birds, 'all', this.render);
    this.$el.addClass("nest");
  },

  template: _.template('<img height=64 src="<%- image %>">'),

  render: function() {
    this.$el.html(this.template(this.model.attributes));

    this.model.birds.each(this.renderBird, this);

    return this;
  },

  renderBird: function(bird) {
    var view = new BirdView({ model: bird });
    this.$el.append(view.render().el);
  },

});

var BuyableNestView = NestView.extend({

  events: {
    "click": "buy",
  },

  buy: function() {
    game.trigger("buyNest", this.model);
  },

});
