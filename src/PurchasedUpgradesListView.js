var PurchasedUpgradesListView = Backbone.View.extend({
  el: "#purchased-upgrades",

  initialize: function() {
  	this.listenTo(game.player, "forceRenderStore", this.render);
  	this.listenTo(game, "dataRestored", this.render);
    this.render();
  },

  template: _.template(''),

  render: function() {
    this.$el.html(this.template());

    game.player.upgrades.each(this.renderUpgrade, this);

    return this;
  },

  renderUpgrade: function(upgrade) {
  	game.debug("rendering upgrade");
    var view = new UpgradeView({ model: upgrade });
    this.$el.append(view.render().el);
  },
});
