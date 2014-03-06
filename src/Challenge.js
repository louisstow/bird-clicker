var Challenge = Backbone.Model.extend({
  defaults: {
    id: null, // unique
    description: null,
    probability: 0.00, // 0.00 - 1.00 range
    timeout: 10, //unit: seconds
    successMessage: null,
    failMessage: null
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
    this.on("start", () => {
      game.inChallenge = true;
      this.view = new ChallengeView({ model: this });
    });

    this.on("challengeTimeout", () => {
      this.process();
    });
    this.on("proceed", () => {
      this.proceed();
    });

    this.on("cancel", () => {
      this.cancel();
    });
  },

  proceed: function() {
    console.log("proceed");

    this.view.hide();
    this.setup();
    this.start();
  },

  cancel: function() {
    game.inChallenge = false;
    console.log("cancel");
    this.view.hide();
  },

  setup: function() {
    // perform setup operations here
  },

  start: function() {
    setTimeout(() => {
      this.trigger("challengeTimeout");
    }, this.get("timeout") * 1000);
  },

  process: function() {
    this.verify() ? this.challengePassed() : this.challengeFailed();
    game.inChallenge = false;
  },

  verify: function() {
    return true;
  },

  challengePassed: function() {
    // TODO Show success message once notification view coded
    alert(this.get("successMessage"));
    game.player.inc("challengesCompleted", 1);
    this.onSuccess();
  },

  challengeFailed: function() {
    // TODO Show failure message once notification view coded
    alert(this.get("failureMessage"));
    this.onFailure();
  },

  onSuccess: function() {
    console.log("challenge success");
  },
  
  onFailure: function() {
    console.log("challenge failure");
  }
});