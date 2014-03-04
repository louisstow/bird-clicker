var Challenge = Backbone.Model.extend({
  defaults: {
    name: null,
    description: null,
    probability: 0.00, // 0.00 - 1.00 range
    timeout: 10, //unit: seconds
  },

  constructor: function(data) {

    Backbone.Model.apply(this, arguments);

    if(data.onSuccess) {
      this.onSuccess = data.onSuccess;
    }
    if(data.setup) {
      this.setup = data.setup;
    }
    if(data.verify) {
      this.verify = data.verify;
    }
    if(data.onFailure) {
      this.onFailure = data.onFailure;
    }
  },

  initialize: function() {
    this.on("start", (playerObject) => {
      if(this.challengeUser()) {
        this.setup(playerObject);
        this.start(playerObject);
      }
    });

    this.on("challengeTimeout", (playerObj) => {
      this.process(playerObj);
    });
  },

  challengeUser: function() {
    return confirm(this.get("description"));
  },

  setup: function(playerObj) {
    // perform setup operations here
  },

  start: function(playerObj) {
    setTimeout(() => {
      this.trigger("challengeTimeout", playerObj);
    }, this.get("timeout") * 1000);
  },

  process: function(playerObj) {
    this.verify(playerObj) ? this.onSuccess(playerObj) : this.onFailure(playerObj);
  },

  verify: function(playerObj) {
    return true;
  },

  onSuccess: function(playerObj) {
    console.log("challenge success");
  },
  
  onFailure: function(playerObj) {
    console.log("challenge failure");
  }
});