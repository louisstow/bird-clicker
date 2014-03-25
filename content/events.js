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
      this.multiplier = function () {
        return this.eggMultiplier;
      }.bind(this);
      game.player.multipliers.push(this.multiplier);
      this.setEventTimeout(function () {
        var index = game.player.multipliers.indexOf(this.multiplier);
        if (index > -1) {
          game.player.multipliers.splice(index, 1);
        }
      }.bind(this), this.time * 1000);      

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
      this.multiplier = function () {
        return 7;
      }.bind(this);
      game.player.multipliers.push(this.multiplier);
      this.setEventTimeout(function () {
        var index = game.player.multipliers.indexOf(this.multiplier);
        if (index > -1) {
          game.player.multipliers.splice(index, 1);
        }
      }.bind(this), 7 * 1000);
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
      this.multiplier = function () {
        return 777;
      }.bind(this);
      game.player.multipliers.push(this.multiplier);
      this.setEventTimeout(function () {
        var index = game.player.multipliers.indexOf(this.multiplier);
        if (index > -1) {
          game.player.multipliers.splice(index, 1);
        }
      }.bind(this), 7 * 1000);
    }
  }, 
  {
    id:"john_travolta",
    probability: 0.005,
    init: function() {

    },
    getDescription: function() {
      return "John Travolta smooth talks your birds and they stop producing for 10 seconds";
    },
    process: function() {
      this.multiplier = function () {
        return 0;
      }.bind(this);
      game.player.multipliers.push(this.multiplier);
      this.setEventTimeout(function () {
        var index = game.player.multipliers.indexOf(this.multiplier);
        if (index > -1) {
          game.player.multipliers.splice(index, 1);
        }
      }.bind(this), 10 * 1000);
    }
  }, 
  {
    id:"brendan_eich",
    probability: 0.008,
    init: function() {
       this.seconds = Math.round(Math.random() * 60);
    },
    getDescription: function() {
      return "One of your birds looks a lot like Brendan Eich and implements an egg based scripting language which gives you a 50% more eggs for a while";
    },
    process: function() {
      this.multiplier = function () {
        return 2;
      }.bind(this);
      game.player.multipliers.push(this.multiplier);
      this.setEventTimeout(function () {
        var index = game.player.multipliers.indexOf(this.multiplier);
        if (index > -1) {
          game.player.multipliers.splice(index, 1);
        }
      }.bind(this), this.seconds * 1000);
    }
  }, 
  {
    id:"quantuum",
    probability: 0.008,
    init: function() {
       this.eggs = Math.round(game.player.get("eggs") * (Math.random() * 0.1));
    },
    getDescription: function() {
      return "One of your birds has come to rest in a quantuum super position. The eggs it laid somehow have never existed. Lose " + this.eggs + " eggs.";
    },
    process: function() {
      game.player.dec("eggs", this.eggs);
    }
  }, 
  {
    id:"single_celled",
    probability: 0.008,
    init: function() {
      this.nestToAddTo = null;
      for (var i = 0; i < game.player.nests.length; ++i) {
        var nest = game.player.nests.at(i);
        if (!nest.atCapacity()) {
          this.nestToAddTo = nest;
        }
      }

      this.birdToDuplicate = null;
      var birdIndex, nestIndex;
      do {
        nestIndex = Math.round(Math.random() * (game.player.get("nestCount")-1));
        nest = game.player.nests.at(nestIndex);
        if(nest.birds.length > 0) {
          birdIndex = Math.round(Math.random() * (nest.birds.length-1));
          this.birdToDuplicate = nest.birds.at(birdIndex);
        }
      } while(this.birdToDuplicate == null);
    },
    getDescription: function() {
      var birdName = this.birdToDuplicate.get("name");
      var description = "One of your " + birdName + "'s briefly turns in to a single celled amoeba, splits in two and then both sides turn back in to birds again.";
      if(!this.nestToAddTo) {
        this.nestToAddTo = game.player.addNest(game.nests.at(0));
        description += " You also get a free nest for your new " + birdName + ". Lucky!";
      }
      return description;
    },
    process: function() {
      game.player.addBird(this.nestToAddTo, new Bird(_.clone(this.birdToDuplicate.attributes)));
    }
  }
];