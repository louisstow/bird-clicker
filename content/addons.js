var addonData = [
  {
    id: "robin_01",
    description: "robins get 0.1 addition eggs a second",
    cost: 10,

    process: function() {
    	game.player.extraEggs += game.birds.at(0).get("numberOwned") * 0.1;
    }
  }, 
  {
    id: "robin_02",
    description: "robins get additional 0.1 addition eggs a second",
    cost: 1000,
    canShow: function() {
      return game.player.addons.findWhere({id:"robin_01"}) != null;
    },    
    process: function() {
      game.player.extraEggs += game.birds.at(0).get("numberOwned") * 0.1;
    }
  }, 
  {
    id: "robin_03",
    description: "robins get double eggs a second",
    cost: 20000,
    canShow: function() {
      return game.player.addons.findWhere({id:"robin_02"}) != null;
    },    
    process: function() {
      game.player.extraEggs += game.birds.at(0).get("numberOwned") * 2;
    }
  },
];