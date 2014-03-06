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
    this.on("start", () => {
    	$.notify(this.get("description"), "info");
      this.process();
    });
  },
  process: function() {},
});
