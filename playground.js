Backbone.$ = $;
var player = new Player();
new Scoreboard({ model: player });
player.start();


// TEST - remove if you like!
var challenge = new Challenge({description: "basic challenge"});
challenge.displayDescription = function() {
  console.log(this.get("description"));
};
challenge.trigger("start");

$("#click_button").click(player.trigger("performClick"));
