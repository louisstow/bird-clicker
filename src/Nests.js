var Nests = Backbone.Collection.extend({
  model: Nest,
  init: function() {
    this.on("add", function () {game.player.inc("nestCount", 1)}.bind(this));
    this.on("remove", function () {game.player.dec("nestCount", 1)}.bind(this));
  }
});
