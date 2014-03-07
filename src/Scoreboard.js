var Scoreboard = Backbone.View.extend({
  id: "scoreboard",
  interval: null,

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
    this.render();
  },

  render: function() {
    var eggs = this.model.get("eggs");

    document.title = eggs.formatNumber() + " eggs - Twitcher";

    $("#increment").text("Laying " + (Math.round(game.player.calculateEggsPerSecond() * 10) / 10).formatNumber() + " eggs per second");

    if (this.interval) {
      clearInterval(this.interval);
    }

    var increment = this.model.get("eggIncrement");
    var step = 0, lastCount = eggs;
    this.interval = setInterval(() => {
      // The increment is per-second, and we update the egg counter 20 times
      // per second (i.e. every 50ms), so we divide the increment by 20 to get
      // our increment per interval.
      var count = eggs + (increment / 20) * (++step);

      // Complain about a bug in our algorithm.  This should never happen!
      if (lastCount > count) {
        console.warn("last count " + lastCount + " > " + count);
      }

      lastCount = count;

      $("#eggs").text(count.formatNumber(1));
    }, 50);
  },

});
