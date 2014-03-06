var Award = Backbone.Model.extend({
defaults: {
    id: null,
    name: null,
    description: null,
    awarded: false
  },

  constructor: function(data) {

    Backbone.Model.apply(this, arguments);

    if(data.verify) {
      this.verify = data.verify;
    }
  },
  initialize: function() {
    this.on("start", () => {
      this.view = new AwardView({ model: this });
      setTimeout(() => {
        this.view.hide();
      }, 5 * 1000);
    });
  },
  process: function() {
    if(!this.get("awarded")) {
      if(this.verify()) {
        this.set("awarded", true);
        this.trigger("start");
      }
    }
  },
  verify: function() {},
});