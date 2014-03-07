var eventData = [{
    id:"bird_flu",
    probability: 0.008,

    init: function() {
      this.eggsToDestroy = Math.round(game.player.get("eggs") * 0.05);
    },

    canProceed: function() {
      return game.player.get("eggs") > 10;
    },

    getDescription: function() {
      return "Oh no - you have bird flu. " + this.eggsToDestroy + " eggs are destroyed";
    },

    process: function() {
      game.player.dec("eggs", this.eggsToDestroy);
    }
  }, 
  {
    id:"batman",
    probability: 0.02,

    init: function() {
      this.eggsToGain = Math.round(game.player.get("eggs") * 0.05);
      this.eggsToGain = this.eggsToGain < 5 ? 10 : this.eggsToGain;
    },

    getDescription: function() {
      return "Batman swoops down and sleeps on one of your nests for a few hours.  You gain " + this.eggsToGain + " eggs.";
    },

    process: function() {
      game.player.inc("eggs", this.eggsToGain);
    }
  }, 
  {
    id:"your_dad",
    probability: 0.0015,

    init: function() {
      this.eggsToDestroy = Math.round(game.player.get("eggs") * 0.1);
    },

    canProceed: function() {
      return game.player.get("eggs") > 10;
    },

    getDescription: function() {
      return "Your Dad comes around and falls on one of your nests.  Loose " + this.eggsToDestroy + " eggs.";
    },

    process: function() {
      game.player.dec("eggs", this.eggsToDestroy);
    }
  }, 
  {
    id:"tom_jones",
    probability: 0.01,  

    init: function() {
      this.eggMultiplier = Math.round(Math.random() * 100);
      this.time = Math.round(Math.sqrt(this.eggMultiplier) * 2);
    },

    getDescription: function() {
      return "Tom Jones phones you one day and all your birds get excited and lay " + this.eggMultiplier + " times the eggs for " + this.time +" seconds.";
    },

    process: function() {
      this.multiplier = () => {
        return this.eggMultiplier;
      };
      game.player.multipliers.push(this.multiplier);
      this.setEventTimeout(() => {
        var index = game.player.multipliers.indexOf(this.multiplier);
        if (index > -1) {
          game.player.multipliers.splice(index, 1);
        }
      }, this.time * 1000);      

    }
  }, 
  {
    id:"big_bird",
    probability: 0.005,

    init: function() {
      this.eggsToGain = Math.round(game.player.get("eggs") * 0.1);
    },

    getDescription: function() {
      return "As you get up in the morning, you relise that you are big bird. Gain  " + this.eggsToGain + " eggs.";
    },
    
    process: function() {
      game.player.inc("eggs", this.eggsToGain);
    }
  }, 
  {
    id:"bird_cook",
    probability: 0.005,
    init: function() {

    },

    canProceed: function() {
      return game.player.get("birdCount") > 2;
    },

    getDescription: function() {
      return "Someone has cooked one of your birds.  Sorry.";
    },

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
      game.player.dec("eggIncrement", bird.get("rewardPerTick"));
    }
  }, 
  {

    id:"x7_cookie",
    probability: 0.005,
    init: function() {

    },
    getDescription: function() {
      return "Cookie production multiplied - x7 for 77 seconds";
    },
    process: function() {
      this.multiplier = () => {
        return 7;
      };
      game.player.multipliers.push(this.multiplier);
      this.setEventTimeout(() => {
        var index = game.player.multipliers.indexOf(this.multiplier);
        if (index > -1) {
          game.player.multipliers.splice(index, 1);
        }
      }, 7 * 1000);
    }
  }, 
  {

    id:"x777_cookie",
    probability: 0.005,
    init: function() {

    },
    getDescription: function() {
      return "Cookie production multiplied - x777 for 7 seconds";
    },
    process: function() {
      this.multiplier = () => {
        return 777;
      };
      game.player.multipliers.push(this.multiplier);
      this.setEventTimeout(() => {
        var index = game.player.multipliers.indexOf(this.multiplier);
        if (index > -1) {
          game.player.multipliers.splice(index, 1);
        }
      }, 7 * 1000);
    }
  }
];