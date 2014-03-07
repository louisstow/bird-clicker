var AddonView = Backbone.View.extend({

  initialize: function(data) {
    this.listenTo(this.model, "change", this.render);
    this.$el.addClass("addon");
  },

  template: _.template('<p><%- model.description %></p>'),

  render: function() {
    this.$el.html(this.template({model: this.model.attributes, eggs: game.player.get("eggs")}));
    return this;
  },

});

var BuyableAddonView = AddonView.extend({
  initialize: function(data) {
    this.listenTo(game.player, "lay", this.process);
    this.listenTo(game.player, "forceRenderStore", this.process);
  },

  template: _.template('<div class="addon <%= !model.hidden && (eggs > model.cost || model.shown) ? "" : "hidden"  %> <%= eggs > model.cost ? "" : "disabled"  %>">' +
    '<div class="info"><p><%- model.description %></p></div>' + 
    '<div class="stats">' +
      '<span class="cost"><%- model.cost %> eggs</span>' +
    '</div>' + 
    '<div class="clear"></div></div>'),

  process: function() {

    var render = false;
    var forceRender = this.model.get("forceRender");
    var purchased = this.model.get("purchased");
    var shown = this.model.get("shown");
    var disabled = this.model.get("disabled");
    var hidden = this.model.get("hidden");
    var canAfford = game.player.get("eggs") > this.model.get("cost");

    if(forceRender) {
      render = true;
      this.model.set("forceRender", false);      
    }
    if(!purchased && canAfford) {
    	if(disabled) {
    	  render = true;
	      this.model.set("disabled", false);
	      this.model.set("hidden", false);
	      this.model.set("shown", true);
    	} 
    } else if (purchased && !hidden) {

	      this.model.set("hidden", true);

	      render = true;
    } else if (!purchased && shown && !disabled && !canAfford) {

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
      game.trigger("buyAddon", this.model);
    }
  },

});
