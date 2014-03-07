var upgradeData = [
  {
    id: "intro",
    description: "Get one egg per second",
    cost: 20,

    process: function() {
    	game.player.extraEggs += 1;
    }
  }, 
  {
    id: "robin_02",
    description: "Robins get additional 0.1 addition eggs a second",
    cost: 1000,
    canShow: function() {
      return game.player.upgrades.findWhere({id:"robin_01"}) != null;
    },    
    process: function() {
      game.player.extraEggs += game.birds.at(0).get("numberOwned") * 0.1;
    }
  }, 
  {
    id: "robin_03",
    description: "Robins get double eggs a second",
    cost: 20000,
    canShow: function() {
      return game.player.upgrades.findWhere({id:"robin_02"}) != null;
    },    
    process: function() {
      game.player.extraEggs += game.birds.at(0).get("numberOwned") * 2;
    }
  },
  {
    id: "nest_01",
    description: "Get one more egg per second for each nest you have",
    cost: 150,
    process: function() {
      game.player.extraEggs += game.player.get("nestCount");
    }
  },

  {
    id: "bird_01",
    description: "Get one more egg per second for each bird you have",
    cost: 1000,
    process: function() {
      game.player.extraEggs += game.player.get("birdCount");
    }
  },
];