var awardData = [
  {
    id: "10_eggs",
    description: "You've collected your first 10 eggs - well done",
    verify: function() {
    	 return game.player.get("eggs") >= 10;
    }
  }, {
    id: "10_nests",
    description: "You've collected your first 10 nests - well done",
    verify: function() {
    	 return game.player.get("nestCount") >= 10;
    }
  }, {
    id: "10_birds",
    description: "You've collected your first 10 birds - well done",
    verify: function() {
    	 return game.player.get("birdCount") >= 10;
    }
  }, {
    id: "100_clicks",
    description: "You've clicked 100 times - well done",
    verify: function() {
    	 return game.player.get("manualClicks") >= 100;
    }
  }, {
    id: "100_egg_inc",
    description: "You're getting 100 eggs on each hatch times - well done",
    verify: function() {
    	 return game.player.get("eggIncrement") >= 100;
    }
  }, {
    id: "one_minute",
    description: "You've played for a minute - well done",
    verify: function() {
    	 return game.get("totalTime") >= 60;
    }
  }
];