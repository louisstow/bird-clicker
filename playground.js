Backbone.$ = $;

document.onready = function() {
  var game = new Game();
  game.start();

  $("#hatchButton").click(() => game.trigger("hatch"));
  $("#buyNestButton").click(() => game.trigger("buyNest"));
  $("#buyBirdButton").click(() => game.trigger("buyBird"));
}
