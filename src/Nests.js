var Nests = Backbone.Collection.extend({
  model: Nest,
  init: function() {
    this.on("add", () => {game.player.inc("nestCount", 1)});
    this.on("remove", () => {game.player.dec("nestCount", 1)});
  }
});
