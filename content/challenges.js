var challengeData = [{
    id: "collect_15_eggs_in_3_second",
    probability: 0.03,
    timeout: 2,

    setup: function() {
      this.manualClicks = game.player.get("manualClicks");
      this.eggs = Math.round(game.player.get("eggs") * 0.05);
    },
    getDescription: function() {
      return "Manually collect 15 eggs in 3 second.";
    },

    getSuccessMessage: function() {
      return "Challenge success - you win " + this.eggs + " eggs";
    },

    getFailureMessage: function() {
      return "Challenge failure - you lose " + this.eggs + " eggs";
    },


    verify: function() {
        var additionalClicks = game.player.get("manualClicks") - this.manualClicks;
        return additionalClicks >= 10;
    }, 

    onSuccess: function() {
      game.player.set("eggs", game.player.get("eggs") + this.eggs);
    }, 

    onFailure: function() {
      game.player.set("eggs", game.player.get("eggs") - this.eggs);
    }
  }, {
    id: "collect_100_eggs_in_10_second",
    probability: 0.002,
    timeout: 10,

    setup: function() {
      this.manualClicks = game.player.get("manualClicks");
      this.eggs = Math.round(game.player.get("eggs") * 0.05);
    },

    getDescription: function() {
      return "Manually collect 100 eggs in 10 seconds.";
    },

    getSuccessMessage: function() {
      return "Challenge success - you win " + this.eggs + " eggs";
    },

    getFailureMessage: function() {
      return "Challenge failure - you lose " + this.eggs + " eggs";
    },
    verify: function() {
        var additionalClicks = game.player.get("manualClicks") - this.manualClicks;
        return additionalClicks >= 100;
    }, 

    onSuccess: function() {
      game.player.set("eggs", game.player.get("eggs") + this.eggs);
    }, 

    onFailure: function() {
      game.player.set("eggs", game.player.get("eggs") - this.eggs);
    }
  }, 
  {
    id: "dont_collect_eggs",
    probability: 0.08,
    timeout: 5,
    setup: function() {
      this.manualClicks = game.player.get("manualClicks");
    },

    getDescription: function() {
      return "Don't click the button for 5 seconds";
    },

    getSuccessMessage: function() {
      return "You succeed.  You win nothing.";
    },

    getFailureMessage: function() {
      return "Couldn't help yourself, eh?  You fail.";
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
    id: "dont_collect_eggs_fake",
    probability: 0.08,
    timeout: 5,
    setup: function() {
      this.manualClicks = game.player.get("manualClicks");
      this.eggs = Math.round(game.player.get("eggs") * 0.07);
    },

    getDescription: function() {
      return "Don't click the button for 5 seconds";
    },

    getSuccessMessage: function() {
      return "I like someone who thinks outside the box.  Gain " + this.eggs + " eggs.";
    },

    getFailureMessage: function() {
      return "Loser - why didn't you click?  Lose " + this.eggs + " eggs.";
    },
    verify: function() {
        var additionalClicks = game.player.get("manualClicks") - this.manualClicks;
        return additionalClicks != 0;
    }, 

    onSuccess: function() {
        game.player.set("eggs", game.player.get("eggs") - this.eggs);
    }, 

    onFailure: function() {
        game.player.set("eggs", game.player.get("eggs") + this.eggs);
    }
  }, 
  {
    id: "dont_collect_eggs_one_minute",
    probability: 0.001,
    timeout: 60,
    setup: function() {
      this.manualClicks = game.player.get("manualClicks");
    },

    getDescription: function() {
      return "Don't manually collect any eggs for 60 seconds";
    },

    getSuccessMessage: function() {
      return "Well done - get a free nest";
    },

    getFailureMessage: function() {
      return "Everyone is laughing at you.";
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
    probability: 0.001,
    timeout: 3,
    setup: function() {
      this.birdCount = game.player.get("birdCount");
    },
    getDescription: function() {
      return "Go buy a bird now...QUICKLY!!";
    },

    getSuccessMessage: function() {
      return "You now have one more bird. Congrats!";
    },

    getFailureMessage: function() {
      return "You had one job...";
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
    probability: 0.001,
    timeout: 3,
    setup: function() {
      this.nestCount = game.player.get("nestCount");
    },
    getDescription: function() {
      return "Go buy a nest now...QUICKLY!!";
    },

    getSuccessMessage: function() {
      return "You now have one more nest. Congrats!";
    },

    getFailureMessage: function() {
      return "You had one job...";
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
    id: "rockyou",
    probability: 0.002,
    timeout: 3,
    setup: function() {
    },
    getDescription: function() {
      return "Play We Will Rock you by clicking";
    },

    getSuccessMessage: function() {
      return "Youre a regular Freddie Mercury";
    },

    getFailureMessage: function() {
      return "You aint got the jazz";
    },
    verify: function() {
        return Math.random() > 0.5;
    }, 

    onSuccess: function() {
      game.player.set("eggs", game.player.get("eggs") * 2);
    }, 

    onFailure: function() {
      game.player.set("eggs", game.player.get("eggs") / 2 | 0);
    }
  }
];