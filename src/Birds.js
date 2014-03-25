var Birds = Backbone.Collection.extend({
  model: Bird,
  init: function() {
    this.on("add", function () {game.player.inc("birdCount", 1)}.bind(this));
    this.on("remove", function () {game.player.dec("birdCount", 1)}.bind(this));
  }
});
