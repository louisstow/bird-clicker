var Scoreboard = Backbone.View.extend({
  id: "scoreboard",
  interval: null,

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
    this.render();
  },

  render: function() {
    var count = this.model.get("eggs");
    var increment = game.player.calculateEggsPerSecond();

    document.title = count.formatNumber() + " eggs - Twitcher";

    $("#increment").text("Laying " + (Math.round(increment * 10) / 10).formatNumber() + " eggs per second");

    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      // The increment is per-second, and we update the egg counter 20 times
      // per second (i.e. every 50ms), so we divide the increment by 20 to get
      // our increment per interval.
      count = count + (increment / 20);
      $("#eggs").text(count.formatNumber(1));
    }, 50);
  },

});
