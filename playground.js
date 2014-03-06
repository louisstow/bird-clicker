Backbone.$ = $;

// The global singleton representing the game as a whole.  Initializes game,
// dispatches events between views and models, just generally runs the show.
var game;
var nestDataMap = {};
var birdDataMap = {};

document.onready = function() {
  for (var i = 0; i < birdData.length; ++i) {
    birdDataMap[birdData[i].name] = birdData[i];
  }

  for (i = 0; i < nestData.length; ++i) {
    nestDataMap[nestData[i].name] = nestData[i];
  }

  game = new Game();
  game.load();
  
  new TreeView();
  new StoreView();

  game.start();

  $("#layButton").click(() => game.trigger("layButtonClick"));
  $("#buyNestButton").click(() => game.trigger("buyNest"));
  $("#buyBirdButton").click(() => game.trigger("buyBird"));
}
