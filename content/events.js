var eventData = [{
    description: "Oh no - you have bird flu. 25 eggs are destroyed",
    probability: 0.008,

    process: function() {
      game.player.dec("eggs", 25);
    }
  }, 
  {
    description: "Batman swoops down and sleeps on one of your nests for a few hours.  You gain 100 eggs.",
    probability: 0.02,

    process: function() {
      game.player.inc("eggs", 100);
    }
  }, 
  {
    description: "Your Dad comes around and falls on one of your nests.  Loose 10 eggs.",
    probability: 0.02,

    process: function() {
      game.player.dec("eggs", 10);
    }
  }, 
  {
    description: "Tom Jones phones you one day and all your birds get excited and lay double eggs for 20 seconds.",
    probability: 0.005,

    process: function() {
      game.player.set("eggMultiplier", game.player.get("eggMultiplier") * 2);
      game.player.set("manualMultiplier", game.player.get("manualMultiplier") * 2);
	    setTimeout(() => {
        game.player.set("eggMultiplier", game.player.get("eggMultiplier") / 2);
        game.player.set("manualMultiplier", game.player.get("manualMultiplier") / 2);
	    }, 20 * 1000);
    }
  }
];