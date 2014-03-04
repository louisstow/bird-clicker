var Challenge = Backbone.Model.extend({
  defaults: {
    description: null,
    probability: 0.00, // 0.00 - 1.00 range
    timeout: 10, //unit: seconds
  },

  initialize: function() {
    this.on("start", function() {
      this.displayDescription();
      console.log("starting");
      this.start();
    }, this);

    this.on("process", function(playerObj) {
      this.process(playerObj);
    }, this);
  },

  displayDescription: function() {
    console.log("description : " + this.get("description"));
  },

  start: function(playerObj) {
    console.log("timeout: " + this.get("timeout"));
    
    setTimeout(() => {
      this.trigger("process", playerObj);
    }, this.get("timeout") * 1000);
  },

  process: function(playerObj) {
    this.verify(playerObj) ? this.onSuccess(playerObj) : this.onFailure(playerObj);
  },

  verify: function(playerObj) {
    return true;
  },

  onSuccess: function(playerObj) {
    console.log("Success");

  },
  
  onFailure: function(playerObj) {
    console.log("Failure");
  }
});