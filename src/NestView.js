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
    var render = false;
    var shown = this.model.get("shown");
    var disabled = this.model.get("disabled");
    var canAfford = game.player.get("eggs") > this.model.get("cost");

    if(canAfford) {
      if(!shown) {
        this.model.set("shown", true);
        render = true;
      }
      if(shown && disabled) {
        this.model.set("disabled", false);
        render = true;
      }
    } else if (shown && !disabled) {
      render = true;
      this.model.set("disabled", true);
    }
    if(render) {
      this.render();
    }
  },

  events: {
    "click": "buy",
  },

  template: _.template('<div class="<%= (eggs > model.cost) || model.shown ? "" : "hidden"  %> <%= eggs > model.cost ? "" : "disabled" %>"><img height=64 src="<%- model.image %>" title="<%- model.name %> - <%- model.description %>"> - <span clss="owned"><%- model.numberOwned %> owned</span><span clss="cost"><%- model.cost %> eggs</span></div>'),

  buy: function() {
    if(this.model.get("cost") < game.player.get("eggs")) {
      game.trigger("buyNest", this.model);
    }    
  },

});
