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
    this.listenTo(game.player, "lay", this.process);
  },

  template: _.template('<div class="<%= (eggs > model.cost) || model.shown ? "" : "hidden"  %> <%= eggs > model.cost ? "" : "disabled"  %>"><img width=64 height=64 src="<%- model.image %>" title="<%- model.name %> - <%- model.description %>"> - <%- model.cost %> eggs</div>'),

  process: function() {
    if(game.player.get("eggs") > this.model.get("cost")) {
      this.model.set("shown", true);
    }
    this.render();
  },

  events: {
    "click": "buy",
  },

  buy: function() {
    if(this.model.get("cost") < game.player.get("eggs")) {
      game.trigger("buyBird", this.model);
    }
  },

});
