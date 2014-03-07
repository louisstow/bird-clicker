var Challenge = Backbone.Model.extend({
  autoHideDelaySeconds: 4,
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


    if(data.setup) {
      this.setup = data.setup;
    }
    if(data.verify) {
      this.verify = data.verify;
    }

    if(data.getDescription) {
      this.getDescription = data.getDescription;
    }
    if(data.getSuccessMessage) {
      this.getSuccessMessage = data.getSuccessMessage;
    }
    if(data.getFailureMessage) {
      this.getFailureMessage = data.getFailureMessage;
    }
    if(data.onFailure) {
      this.onFailure = data.onFailure;
    }
    if(data.onSuccess) {
      this.onSuccess = data.onSuccess;
    }    
  },

  initialize: function() {
    this.on("start", () => {
      game.inChallenge = true;
      $.notify({
        title: this.getDescription(),
      }, { 
        style: 'challenge',
        autoHide: true,
        autoHideDelay: this.autoHideDelaySeconds * 1000,
        clickToHide: false
      });

      $(document).on('click', '.notifyjs-challenge-base .yes', (data) => {
        clearTimeout(this.challengeTimer);
        $(data.target).trigger('notify-hide');
        this.trigger("proceed");
        this.removeListeners();
      });

    this.challengeTimer = setTimeout(() => {
      console.log("MISSED TIMEOUT");
      this.cancel();
    }, this.autoHideDelaySeconds * 1000);

    });

    this.on("challengeTimeout", () => {
      this.process();
    }, this);
    this.on("proceed", () => {
      console.log("proceed " + this.get("id"));
      this.proceed();
    }, this);

  },

  removeListeners: function() {
    $(document).off('click', '.notifyjs-challenge-base .yes');
  }, 

  proceed: function() {
    this.setup();
    this.start();
  },

  cancel: function() {
    game.inChallenge = false;
    this.off("challengeTimeout");
    this.off("proceed");
    
  },

  setup: function() {
    // perform setup operations here
  },
    
  getDescription: function() {
    return "";
  },

  getSuccessMessage: function() {
    return "you win!";
  },

  getFailureMessage: function() {
    return "you lose!";

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
    $.notify(this.getSuccessMessage(), "success");
    game.player.inc("challengesCompleted", 1);
    this.onSuccess();
  },

  challengeFailed: function() {
    $.notify(this.getFailureMessage(), "error");
    this.onFailure();
  },

  onSuccess: function() {
    console.log("challenge success");
  },
  
  onFailure: function() {
    console.log("challenge failure");
  }
});