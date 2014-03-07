var UpgradeView = Backbone.View.extend({

  initialize: function(data) {
    this.listenTo(this.model, "change", this.render);
    this.$el.addClass("upgrade");
  },

  template: _.template('<li><%- model.description %></li>'),

  render: function() {
    this.$el.html(this.template({model: this.model.attributes, eggs: game.player.get("eggs")}));
    return this;
  },

});

var BuyableUpgradeView = UpgradeView.extend({
  initialize: function(data) {
    this.listenTo(game.player, "lay", this.process);
    this.listenTo(game.player, "forceRenderStore", this.process);
  },

  template: _.template('<div class="upgrade <%= !model.hidden && (eggs > model.cost || model.shown) ? "" : "hidden"  %> <%= eggs > model.cost ? "" : "disabled"  %>">' +
    '<div class="info"><p><%- model.description %></p></div>' + 
    '<div class="stats">' +
    '<span class="cost"><%- model.cost %> eggs</span>' +
    '</div>' + 
    '<div class="clear"></div></div>'),

  process: function() {

    var render = false;
    var forceRender = this.model.get("forceRender");
    var purchased = this.model.get("purchased");  //has this upgrade been purchased?  if so it should not be displayed in the store
    var shown = this.model.get("shown"); // has
    var disabled = this.model.get("disabled");
    var hidden = this.model.get("hidden");
    var canAfford = game.player.get("eggs") > this.model.get("cost");

    if(forceRender) {
      render = true;
      this.model.set("forceRender", false);      
    }
    if(!purchased && canAfford) {
      if(disabled && this.model.canShow()) {
        // probably the user has just got enough money or fulfilled other requirements to show this upgrade
        // set it to show in the store page
        render = true;
        this.model.set("disabled", false);
        this.model.set("hidden", false);
        this.model.set("shown", true);
      } 
    } else if (purchased && !hidden) {
      // the user has just purchased this add on 
      // hide it.
      this.model.set("hidden", true);

      render = true;
    } else if (!purchased && shown && !disabled && !canAfford) {
      // user has probably just spent some cash and now we need to set the display on this upgrade to show they cant afford it
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
    if(!this.model.get("purchased") && this.model.get("cost") < game.player.get("eggs")) {
      game.trigger("buyUpgrade", this.model);
    }
  },

});
