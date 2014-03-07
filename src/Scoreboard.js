var Scoreboard = Backbone.View.extend({
  id: "scoreboard",

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
    var increment = this.model.get("eggIncrement");
    var step = 0;

    var interval = setInterval(() => {
    	var n = this.model.get("eggs") + (increment / 20) * (++step);
    	
    	if (step == 20) {
    		step = 0;
    		increment = this.model.get("eggIncrement");
    	}

    	$("#eggs").text(n.formatNumber(1));
    }, 50);
  },

  render: function() {
    document.title = this.model.get("eggs").formatNumber() + " eggs - Twitcher";
    
    $("#increment").text("Laying " + (Math.round(game.player.calculateEggsPerSecond() * 10) / 10).formatNumber() + " eggs per second");
  },

});