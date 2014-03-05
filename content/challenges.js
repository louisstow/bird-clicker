var challengeData = [{
    description: "Manually collect 10 eggs in 10 seconds.\nSuccess : 10 eggs\nPenalty: 10 eggs",
    probability: 0.01,
    timeout: 10,

    setup: function(playerObject) {
      this.manualClicks = playerObject.get("manualClicks");
    },

    verify: function(playerObject) {
        var additionalClicks = playerObject.get("manualClicks") - this.manualClicks;
        return additionalClicks >= 10;
    }, 

    onSuccess: function(playerObject) {
      alert("challenge success - you win 10 eggs");
      playerObject.set("eggs", playerObject.get("eggs") + 10);
    }, 

    onFailure: function(playerObject) {
      alert("challenge failure - you lose 10 eggs");
      playerObject.set("eggs", playerObject.get("eggs") - 10);
    }
  }, 
  {
    description: "Don't manually collect any eggs for 5 seconds",
    probability: 0.01,
    timeout: 5,
    setup: function(playerObject) {
      this.manualClicks = playerObject.get("manualClicks");
    },

    verify: function(playerObject) {
        var additionalClicks = playerObject.get("manualClicks") - this.manualClicks;
        return additionalClicks == 0;
    }, 

    onSuccess: function(playerObject) {
      alert("You succeed.  You win nothing.");
    }, 

    onFailure: function(playerObject) {
      alert("you win nothing");
    }
  }
];