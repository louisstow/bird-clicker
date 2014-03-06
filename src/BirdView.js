var BirdView = Backbone.View.extend({

  initialize: function(data) {
    this.listenTo(this.model, "change", this.render);
    this.$el.addClass("bird");
  },

  template: _.template('<img width=64 height=64 src="<%- model.image %>">'),

  render: function() {
    this.$el.html(this.template({model: this.model.attributes, eggs: game.player.get("eggs")}));
    return this;
  },

});

var BuyableBirdView = BirdView.extend({

  initialize: function(data) {
    this.listenTo(game.player, "lay", this.render);
  },

  template: _.template('<div class="<%= eggs > model.cost ? "" : "disabled"  %>"><img width=64 height=64 src="<%- model.image %>" alt="<%- model.description %>"> - <%- model.cost %> eggs</div>'),

  events: {
    "click": "buy",
  },

  buy: function() {
    game.trigger("buyBird", this.model);
  },

});
