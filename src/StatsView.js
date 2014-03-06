var StatsView = Backbone.View.extend({
  el: "#statdata",
  template: _.template('<dl><dt>Total Eggs</dt><dd><%= Math.round(totalEggs) %></dd>' + 
    '<dt>Current Eggs</dt><dd><%= Math.round(eggs) %></dd>' + 
    '<dt>Total Clicks</dt><dd><%= manualClicks %></dd>' + 
    '<dt>Eggs per second</dt><dd><%= Math.round(eggIncrement * 10) / 10 %></dd>' + 
    '<dt>Challenges completed</dt><dd><%= challengesCompleted %></dd>' + 
    '<dt>Time played</dt><dd><%= totalTimePlayed %> seconds</dd>' +  
    '<dt>Awards</dt><dd><%= rewardedAwards %></dd>' +  
    '<dt>Birds</dt><dd><%= birdCount %></dd>' +  
    '<dt>Nests</dt><dd><%= nestCount %></dd>' + 
    '</dl>'),

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

});
