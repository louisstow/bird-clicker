Backbone.$ = $;

document.onready = function() {
  var player = new Player();
  new Scoreboard({ model: player });
  player.start();

  var challenges = new Challenges();

  challengeData.forEach((data) => {
    challenges.add(data);
  });

  var id = Math.random() * challenges.length;

  var challenge = Math.floor(challenges.at(id));

  challenge.trigger("start", player);

  $("#click_button").click(function() {player.trigger("performClick");});
  $("#buyNestButton").click(() => player.buyNest(new Nest));
  $("#buyBirdButton").click(() => player.buyBird(new Bird));
}
