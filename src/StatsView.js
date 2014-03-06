var StatsView = Backbone.View.extend({
  el: "#statdata",
  template: _.template('<dl><dt>Total Eggs</dt><dd><%= totalEggs %></dd>' + 
    '<dt>Current Eggs</dt><dd><%= eggs %></dd>' + 
    '<dt>Total Clicks</dt><dd><%= manualClicks %></dd>' + 
    '<dt>Eggs per second</dt><dd><%= eggIncrement %></dd>' + 
    '<dt>Challenges completed</dt><dd><%= challengesCompleted %></dd>' + 
    '<dt>Time played</dt><dd><%= totalTimePlayed %> seconds</dd>' + 
    '</dl>'),

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

});
