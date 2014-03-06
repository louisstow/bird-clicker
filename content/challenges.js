var challengeData = [{
    id: "collect_10_eggs_in_1_second",
    description: "Manually collect 10 eggs in 1 second.",
    probability: 0.03,
    timeout: 1,
    successMessage: "Challenge success - you win 10 eggs",
    failMessage: "Challenge failure - you lose 10 eggs",

    setup: function() {
      this.manualClicks = game.player.get("manualClicks");
    },

    verify: function() {
        var additionalClicks = game.player.get("manualClicks") - this.manualClicks;
        return additionalClicks >= 10;
    }, 

    onSuccess: function() {
      game.player.set("eggs", game.player.get("eggs") + 10);
    }, 

    onFailure: function() {
      game.player.set("eggs", game.player.get("eggs") - 10);
    }
  }, {
    id: "collect_100_eggs_in_10_second",
    description: "Manually collect 100 eggs in 10 seconds.",
    probability: 0.002,
    timeout: 10,
    successMessage: "Challenge success - you win 100 eggs",
    failMessage: "Challenge failure - you lose 100 eggs",


    setup: function() {
      this.manualClicks = game.player.get("manualClicks");
    },

    verify: function() {
        var additionalClicks = game.player.get("manualClicks") - this.manualClicks;
        return additionalClicks >= 100;
    }, 

    onSuccess: function() {
      game.player.set("eggs", game.player.get("eggs") + 100);
    }, 

    onFailure: function() {
      game.player.set("eggs", game.player.get("eggs") - 100);
    }
  }, 
  {
    id: "dont_collect_eggs",
    description: "Don't manually collect any eggs for 5 seconds",
    probability: 0.08,
    timeout: 5,
    successMessage: "You succeed.  You win nothing.",
    failMessage: "Couldn't help yourself, eh?  You fail.",
    setup: function() {
      this.manualClicks = game.player.get("manualClicks");
    },

    verify: function() {
        var additionalClicks = game.player.get("manualClicks") - this.manualClicks;
        return additionalClicks == 0;
    }, 

    onSuccess: function() {
    }, 

    onFailure: function() {
    }
  }, 
  {
    id: "dont_collect_eggs_one_minute",
    description: "Don't manually collect any eggs for 60 seconds",
    probability: 0.001,
    timeout: 60,
    successMessage: "Well done - get a free nest",
    failMessage: "Everyone is laughing at you.",
    setup: function() {
      this.manualClicks = game.player.get("manualClicks");
    },

    verify: function() {
        var additionalClicks = game.player.get("manualClicks") - this.manualClicks;
        return additionalClicks == 0;
    }, 

    onSuccess: function() {
        var nestLength = game.nests.length;
        var id = Math.round(Math.random() * nestLength-1);
        console.log("nest", id, nestLength)
        var nest = game.nests.at(id);
        game.player.addNest(nest);
    }, 

    onFailure: function() {
    }
  }, 
  {
    id: "buy_a_bird",
    description: "Go buy a bird now...QUICKLY!!",
    probability: 0.001,
    timeout: 3,
    successMessage: "You now have one more bird. Congrats!",
    failMessage: "You had one job...",
    setup: function() {
      this.birdCount = game.player.get("birdCount");
    },

    verify: function() {
        var additionBirdCount = game.player.get("birdCount") - this.birdCount;
        return additionBirdCount > 0;
    }, 

    onSuccess: function() {

    }, 

    onFailure: function() {
    }
  }, 
  {
    id: "buy_a_nest",
    description: "Go buy a nest now...QUICKLY!!",
    probability: 0.001,
    timeout: 3,
    successMessage: "You now have one more nest. Congrats!",
    failMessage: "You had one job...",
    setup: function() {
      this.nestCount = game.player.get("nestCount");
    },

    verify: function() {
        var additionNestCount = game.player.get("nestCount") - this.nestCount;
        return additionNestCount > 0;
    }, 

    onSuccess: function() {

    }, 

    onFailure: function() {
    }
  }, 
  {
    id: "buy_a_nest",
    description: "Go buy a nest now...QUICKLY!!",
    probability: 0.001,
    timeout: 3,
    successMessage: "You now have one more nest. Congrats!",
    failMessage: "You had one job...",
    setup: function() {
      this.nestCount = game.player.get("nestCount");
    },

    verify: function() {
        var additionNestCount = game.player.get("nestCount") - this.nestCount;
        return additionNestCount > 0;
    }, 

    onSuccess: function() {

    }, 

    onFailure: function() {
    }
  }
];