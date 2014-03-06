var NestView = Backbone.View.extend({

  initialize: function(data) {
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model.birds, 'all', this.render);
    this.$el.addClass("nest");
  },

  template: _.template('<img height=64 src="<%- model.image %>">'),

  render: function() {
    this.$el.html(this.template({model: this.model.attributes, eggs: game.player.get("eggs")}));

    this.model.birds.each(this.renderBird, this);

    return this;
  },

  renderBird: function(bird) {
    var view = new BirdView({ model: bird });
    this.$el.append(view.render().el);
  },

});

var BuyableNestView = NestView.extend({

 initialize: function(data) {
    this.listenTo(game.player, "lay", this.process);
  },

  process: function() {
    if(game.player.get("eggs") > this.model.get("cost")) {
      this.model.set("shown", true);
    }
    this.render();
  },

  events: {
    "click": "buy",
  },

  template: _.template('<div class="<%= (eggs > model.cost) || model.shown ? "" : "hidden"  %> <%= eggs > model.cost ? "" : "disabled" %>"><img height=64 src="<%- model.image %>" title="<%- model.name %> - <%- model.description %>"> - <%- model.cost %> eggs</div>'),

  buy: function() {
    if(this.model.get("cost") < game.player.get("eggs")) {
      game.trigger("buyNest", this.model);
    }    
  },

});
