var Birds = Backbone.Collection.extend({
  model: Bird,
  init: function() {
    this.on("add", () => {game.player.inc("birdCount", 1)});
    this.on("remove", () => {game.player.dec("birdCount", 1)});
  }
});
