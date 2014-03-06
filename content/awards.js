var awardData = [
  {
    id: "10_eggs",
    name: "Amateur twitcher",
    description: "You've collected your first 10 eggs - well done",
    verify: function() {
    	 return game.player.get("eggs") >= 10;
    }
  }, {
    id: "10_nests",
    name: "Settling in",
    description: "You've collected your first 10 nests - well done",
    verify: function() {
    	 return game.player.get("nestCount") >= 10;
    }
  }, {
    id: "10_birds",
    name: "Feather lover",
    description: "You've collected your first 10 birds - well done",
    verify: function() {
    	 return game.player.get("birdCount") >= 10;
    }
  }, {
    id: "100_clicks",
    name: "Happy clicker",
    description: "You've clicked 100 times - well done",
    verify: function() {
    	 return game.player.get("manualClicks") >= 100;
    }
  }, {
    id: "100_egg_inc",
    name: "Prolific Layer",
    description: "You're getting 100 eggs on each lay - well done",
    verify: function() {
    	 return game.player.get("eggIncrement") >= 100;
    }
  }, {
    id: "one_minute",
    name: "The beginning...",
    description: "You've played for a minute - well done",
    verify: function() {
    	 return game.get("totalTime") >= 60;
    }
  }
];