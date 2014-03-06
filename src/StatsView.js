var StatsView = Backbone.View.extend({
  el: "#statdata",
  template: _.template('<dl><dt>Total Eggs</dt><dd><%= Math.round(model.totalEggs) %></dd>' + 
    '<dt>Current Eggs</dt><dd><%= Math.round(model.eggs) %></dd>' + 
    '<dt>Total Clicks</dt><dd><%= model.manualClicks %></dd>' + 
    '<dt>Eggs per second</dt><dd><%= Math.round(model.eggIncrement * 10) / 10 %></dd>' + 
    '<dt>Challenges completed</dt><dd><%= model.challengesCompleted %></dd>' + 
    '<dt>Time played</dt><dd><%= model.totalTimePlayed %> seconds</dd>' +  
    '<dt>Awards</dt><dd><%= model.rewardedAwards %> / <%= awards %></dd>' +  
    '<dt>Birds</dt><dd><%= model.birdCount %></dd>' +  
    '<dt>Nests</dt><dd><%= model.nestCount %></dd>' + 
    '</dl>'),

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    this.$el.html(this.template({model:this.model.attributes, awards:game.awards.length}));
    return this;
  },

});
