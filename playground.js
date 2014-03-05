Backbone.$ = $;

// The global singleton representing the game as a whole.  Initializes game,
// dispatches events between views and models, just generally runs the show.
var game;

document.onready = function() {
  game = new Game();
  game.start();

  $("#hatchButton").click(() => game.trigger("hatch"));
  $("#buyNestButton").click(() => game.trigger("buyNest"));
  $("#buyBirdButton").click(() => game.trigger("buyBird"));
}
