var challengeData = [{
    description: "Manually collect 10 eggs in 10 seconds.\nSuccess : 10 eggs\nPenalty: 10 eggs",
    probability: 1,
    timeout: 10,

    setup: function(playerObject) {
      this.manualClicks = playerObject.get("manualClicks");
    },

    verify: function(playerObject) {
        var additionalClicks = playerObject.get("manualClicks") - this.manualClicks;
        return additionalClicks > 10;
    }, 

    onSuccess: function(playerObject) {
      playerObject.set("eggs", playerObject.get("eggs") + 10);
    }, 

    onFailure: function(playerObject) {
      playerObject.set("eggs", playerObject.get("eggs") - 10);
    }
  }, 
  {
    description: "Don't manually collect any eggs",
    probability: 1,
    timeout: 10,
    setup: function(playerObject) {
      this.manualClicks = playerObject.get("manualClicks");
    },

    verify: function(playerObject) {
        var additionalClicks = playerObject.get("manualClicks") - this.manualClicks;
        return additionalClicks == 0;
    }, 

    onSuccess: function(playerObject) {
      alert("well done");
    }, 

    onFailure: function(playerObject) {
      alert("you win nothing");
    }
  }
];