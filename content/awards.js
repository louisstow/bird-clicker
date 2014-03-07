var awardData = [
  {
    id: "10_eggs",
    name: "Amateur twitcher",
    description: "You've collected your first 10 eggs.  This is the first step of an adventure you'll never forget.",
    verify: function() {
    	 return game.player.get("eggs") >= 10;
    }
  }, {
    id: "10_nests",
    name: "Settling in",
    description: "You've collected your first 10 nests",
    verify: function() {
    	 return game.player.get("nestCount") >= 10;
    }
  }, {
    id: "10_birds",
    name: "Feather lover",
    description: "You've collected your first 10 birds",
    verify: function() {
         return game.player.get("birdCount") >= 10;
    }
  },{
    id: "100_birds",
    name: "Bird Collector",
    description: "You've collected your 100 birds",
    verify: function() {
         return game.player.get("birdCount") >= 100;
    }
  }, {
    id: "100_clicks",
    name: "Happy clicker",
    description: "You've clicked 100 times",
    verify: function() {
    	 return game.player.get("manualClicks") >= 100;
    }
  },{
    id: "50_clicks",
    name: "Mouse User!",
    description: "You've clicked 50 times",
    verify: function() {
         return game.player.get("manualClicks") >= 50;
    }
  },{
    id: "100_clicks",
    name: "Dedicated",
    description: "You've clicked 100 times",
    verify: function() {
         return game.player.get("manualClicks") >= 100;
    }
  },{
    id: "1000_clicks",
    name: "Mouse Abuser",
    description: "You've clicked 1000 times",
    verify: function() {
         return game.player.get("manualClicks") >= 1000;
    }
  },{
    id: "10000_clicks",
    name: "Manual Labourer",
    description: "You've clicked 10000 times",
    verify: function() {
         return game.player.get("manualClicks") >= 10000;
    }
  }, {
    id: "100_egg_inc",
    name: "Prolific Layer",
    description: "You're getting 100 eggs on each lay",
    verify: function() {
    	 return game.player.get("eggIncrement") >= 100;
    }
  }, {
    id: "one_minute",
    name: "The beginning...",
    description: "You've played for a minute",
    verify: function() {
         return game.get("totalTime") >= 60;
    }
  }, {
    id: "one_hour",
    name: "Bird lover",
    description: "You've played for an hour",
    verify: function() {
         return game.get("totalTime") >= 60 * 60;
    }
  }, {
    id: "one_day",
    name: "Energy Waster",
    description: "You've played for an entire day.  It doesn't count if you just leave your browser open!",
    verify: function() {
         return game.get("totalTime") >= 60 * 60 * 24;
    }
  }, {
    id: "one_hundred_robins",
    name: "You're still not batman",
    description: "You have one hundred robins.",
    verify: function() {
         return game.birds.at(0).get("numberOwned") >= 100;
    }
  }, {
    id: "one_hundred_blue_tit",
    name: "Many blue tits",
    description: "You have one hundred blue tits.",
    verify: function() {
         return game.birds.at(1).get("numberOwned") >= 100;
    }
  }, {
    id: "first_toucan",
    name: "Who can? Tou can!",
    description: "You bought your first toucan.",
    verify: function() {
         return game.birds.at(8).get("numberOwned") >= 1;
    }
  }, {
    id: "first_pterodactyl",
    name: "Prehistoric Player",
    description: "You bought your first Pterodactyl.",
    verify: function() {
         return game.birds.at(9).get("numberOwned") >= 1;
    }
  }

];