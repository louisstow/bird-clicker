Backbone.$ = $;

// The global singleton representing the game as a whole.  Initializes game,
// dispatches events between views and models, just generally runs the show.
var game;

document.onready = function() {
  game = new Game();
  game.load();
  
  new TreeView();
  new StoreView();

  game.start();

  $("#layButton").click(() => game.trigger("layButtonClick"));
  $("#buyNestButton").click(() => game.trigger("buyNest"));
  $("#buyBirdButton").click(() => game.trigger("buyBird"));
}
