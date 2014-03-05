var Event = Backbone.Model.extend({
defaults: {
    description: null,
    probability: 0.00, // 0.00 - 1.00 range
  },

  constructor: function(data) {

    Backbone.Model.apply(this, arguments);

    if(data.process) {
      this.process = data.process;
    }
  },
  initialize: function() {
    this.on("start", (playerObject) => {
    	  alert(this.get("description"));
        this.process(playerObject);
    });
  },
  process: function(playerObj) {},
});