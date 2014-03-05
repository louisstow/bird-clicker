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
  }
];