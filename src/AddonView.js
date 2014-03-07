var AddonView = Backbone.View.extend({

  initialize: function(data) {
    this.listenTo(this.model, "change", this.process);
    this.listenTo(game.player, "lay", this.process);
    this.listenTo(game.player, "forceRenderStore", this.process);
    this.$el.addClass("addon");
  },

  render: function() {
  	console.log("hidden", this.model.get("hidden"), this.model.attributes.hidden);
    this.$el.html(this.template({model: this.model.attributes, eggs: game.player.get("eggs")}));
    return this;
  },

  template: _.template('<div class="addon <%= !model.hidden && (eggs > model.cost || model.shown) ? "" : "hidden"  %> <%= eggs > model.cost ? "" : "disabled"  %>">' +
    '<div class="info"><%- model.hidden %><p><%- model.description %></p></div>' + 
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
    console.log("addon force:" + forceRender + " - purchased:" + purchased + " - shown:" + shown + " - disabled:" + disabled + " - hidden:" + hidden + " - canAfford:" + canAfford);

    if(forceRender) {
      render = true;
      this.model.set("forceRender", false);      
    }
    if(!purchased && canAfford) {
    	if(disabled) {
    		console.log("1");
    	  render = true;
	      this.model.set("disabled", false);
	      this.model.set("hidden", false);
	      this.model.set("shown", true);
    	} else {

    		console.log("2");
	    	//render = true;
	    }
    } else if (purchased && !hidden) {

    		console.log("3");
	      this.model.attributes.hidden = true;
	      this.model.set("hidden", true);

	      render = true;
    } else if (!purchased && shown && !disabled && !canAfford) {

    		console.log("4");
    	  render = true;
	      this.model.set("disabled", true);    	
    } else {
    	console.log("25");
    }

    if(render) {
    	console.log("render addon");
      this.render();
    }
  },

  events: {
    "click": "buy",
  },

  buy: function() {
    if(this.model.get("cost") < game.player.get("eggs")) {
      game.trigger("buyAddon", this.model);
    }
  },

});
