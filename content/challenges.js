var challengeData = [{
    id: "collect_eggs",
    description: "Manually collect 10 eggs in 10 seconds.\nSuccess : 10 eggs\nPenalty: 10 eggs",
    probability: 0.02,
    timeout: 10,
    successMessage: "challenge success - you win 10 eggs",
    failMessage: "challenge failure - you lose 10 eggs",


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
  }, 
  {
    id: "dont_collect_eggs",
    description: "Don't manually collect any eggs for 5 seconds",
    probability: 0.02,
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
  }
];