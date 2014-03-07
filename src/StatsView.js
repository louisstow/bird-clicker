var StatsView = Backbone.View.extend({
  el: "#statdata",
  template: _.template('<dl><dt>Total Eggs</dt><dd><%= Math.round(model.totalEggs).formatNumber() %></dd>' + 
    '<dt>Current Eggs</dt><dd><%= Math.round(model.eggs).formatNumber() %></dd>' + 
    '<dt>Total Clicks</dt><dd><%= model.manualClicks.formatNumber() %></dd>' + 
    '<dt>Eggs per second</dt><dd><%= (Math.round(model.eggIncrement * 10) / 10).formatNumber() %></dd>' + 
    '<dt>Challenges completed</dt><dd><%= model.challengesCompleted.formatNumber() %></dd>' + 
    '<dt>Time played</dt><dd><%= model.totalTimePlayed.formatNumber() %> seconds</dd>' +  
    '<dt>Awards</dt><dd><%= model.rewardedAwards.formatNumber() %> / <%= awards %></dd>' +  
    '<dt>Birds</dt><dd><%= model.birdCount.formatNumber() %></dd>' +  
    '<dt>Nests</dt><dd><%= model.nestCount.formatNumber() %></dd>' + 
    '</dl>'),

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    this.$el.html(this.template({model:this.model.attributes, awards:game.awards.length}));
    return this;
  },

});
