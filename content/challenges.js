var challengeData = [{
    id: "collect_eggs",
    description: "Manually collect 10 eggs in 10 seconds.\nSuccess : 10 eggs\nPenalty: 10 eggs",
    probability: 0.03,
    timeout: 10,

    setup: function() {
      this.manualClicks = game.player.get("manualClicks");
    },

    verify: function() {
        var additionalClicks = game.player.get("manualClicks") - this.manualClicks;
        return additionalClicks >= 10;
    }, 

    onSuccess: function() {
      alert("challenge success - you win 10 eggs");
      game.player.set("eggs", game.player.get("eggs") + 10);
    }, 

    onFailure: function() {
      alert("challenge failure - you lose 10 eggs");
      game.player.set("eggs", game.player.get("eggs") - 10);
    }
  }, 
  {
    id: "dont_collect_eggs",
    description: "Don't manually collect any eggs for 5 seconds",
    probability: 0.02,
    timeout: 5,
    setup: function() {
      this.manualClicks = game.player.get("manualClicks");
    },

    verify: function() {
        var additionalClicks = game.player.get("manualClicks") - this.manualClicks;
        return additionalClicks == 0;
    }, 

    onSuccess: function() {
      alert("You succeed.  You win nothing.");
    }, 

    onFailure: function() {
      alert("you win nothing");
    }
  }
];