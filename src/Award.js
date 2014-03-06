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
      console.log("award rewarded: " + this.get("name"));
      $.notify({
        name: this.get("name"),
        description: this.get("description")
      }, { 
        style: 'award',
        autoHide: true,
        clickToHide: false
      });    
      game.player.inc("rewardedAwards", 1);
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