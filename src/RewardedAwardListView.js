var RewardedAwardListView = Backbone.View.extend({

  el: "#award-items",

  initialize: function() {
    this.render();
  },

  template: _.template(''),

  render: function() {
    this.$el.html(this.template());

    game.awards.each(this.renderAward, this);

    return this;
  },

  renderAward: function(award) {
    var view = new RewardedAwardView({ model: award });
    this.$el.append(view.render().el);
  },


});
