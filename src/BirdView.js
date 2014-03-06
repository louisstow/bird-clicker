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

  template: _.template('<div class="bird <%= (eggs > model.cost) || model.shown ? "" : "hidden"  %> <%= eggs > model.cost ? "" : "disabled"  %>"><div class="profile"><img width=64 height=64 src="<%- model.image %>" title="<%- model.name %> - <%- model.description %>"></div><div class="info"><strong><%- model.name %></strong><p><%- model.description %></p></div><div class="stats"><span class="owned"><%- model.numberOwned %> owned</span><span class="cost"><%- model.cost %> eggs</span></div></div>'),

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

  buy: function() {
    if(this.model.get("cost") < game.player.get("eggs")) {
      game.trigger("buyBird", this.model);
    }
  },

});
