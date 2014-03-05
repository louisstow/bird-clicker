var Stats = Backbone.View.extend({
  el: "#statdata",
  template: _.template('<dl><dt>Total Eggs</dt><dd><%= eggs %></dd><dt>Total Clicks</dt><dd><%= manualClicks %></dd><dt>Eggs per second</dt><dd><%= eggIncrement %></dd></dl>'),

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    console.log(this.model.attributes)
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

});
