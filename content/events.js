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
    probability: 0.01,

    process: function() {
      game.player.set("eggMultiplier", game.player.get("eggMultiplier") * 2);
      setTimeout(() => {
        game.player.set("eggMultiplier", game.player.get("eggMultiplier") / 2);
      }, 20 * 1000);
    }
  }, 
  {
    description: "As you get up in the morning, you relise that you are big bird. Gain 250 eggs.",
    probability: 0.005,

    process: function() {
      game.player.inc("eggs", 250);
    }
  }, 
  {
    description: "Someone has cooked one of your birds.  Sorry.",
    probability: 0.005,

    process: function() {
      if(game.player.get("birdCount") < 1) {
        return;
      }
      var bird = null;
      var nest = null;
      var nestIndex, birdIndex;
      do {
        nestIndex = Math.round(Math.random() * (game.player.get("nestCount")-1));
        nest = game.player.nests.at(nestIndex);
        if(nest.birds.length > 0) {
          birdIndex = Math.round(Math.random() * (nest.birds.length-1));
          bird = nest.birds.at(birdIndex);
        }
      } while(bird == null);
      nest.birds.remove(bird);
      game.player.dec("birdCount", 1);
    }
  }
];