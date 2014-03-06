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

  template: _.template('<div class="<%= (eggs > model.cost) || model.shown ? "" : "hidden"  %> <%= eggs > model.cost ? "" : "disabled"  %>"><img width=64 height=64 src="<%- model.image %>" title="<%- model.name %> - <%- model.description %>"> - <span clss="owned"><%- model.numberOwned %> owned</span><span clss="cost"><%- model.cost %> eggs</span></div>'),

  process: function() {
    var render = false;
    var numberOwned = this.model.get("numberOwned");
    var shown = this.model.get("shown");
    var disabled = this.model.get("disabled");
    var canAfford = game.player.get("eggs") > this.model.get("cost");
    if(numberOwned > 0 && !shown && disabled) {
      render = true;
      this.model.set("shown", true);
      shown = true;
    }
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
