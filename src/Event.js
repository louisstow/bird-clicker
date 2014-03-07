var Event = Backbone.Model.extend({
  defaults: {
    'id': null,
    'probability': 0.00, // 0.00 - 1.00 range
  },

  constructor: function(data) {

    Backbone.Model.apply(this, arguments);

    if(data.init) {
      this.init = data.init;
    }
    if(data.canProceed) {
      this.canProceed = data.canProceed;
    }
    if(data.process) {
      this.process = data.process;
    }
    if(data.getDescription) {
      this.getDescription = data.getDescription;
    }
  },
  initialize: function() {
    this.on("start", () => {
      this.init();
      if(this.canProceed()) {

        game.debug("starting event: ", this.get("id"));
      	$.notify(this.getDescription(), "info");
        this.process();
      } else {
        game.debug("event launch criteria not met - aborting", this.get("id"));
      }
    });
  },
  setEventTimeout: function(func, time) {
    game.debug("starting event timeout", this.get("id"), time);
    game.ongoingEvent = true;
    setTimeout(() => {
      game.debug("finishing event timeout", this.get("id"));
      func();
      game.ongoingEvent = false;
    }, time);
  },
  init: function() {},
  process: function() {},    
  canProceed: function() {
    return true;
  },
});
