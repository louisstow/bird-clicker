var StoreView = Backbone.View.extend({

  el: "#items",

  initialize: function() {
    this.render();
  },

  template: _.template(''),

  render: function() {
    this.$el.html(this.template());

    game.addons.each(this.renderAddon, this);
    game.nests.each(this.renderNest, this);
    game.birds.each(this.renderBird, this);

    return this;
  },

  renderNest: function(nest) {
    var view = new BuyableNestView({ model: nest });
    this.$el.append(view.render().el);
  },

  renderBird: function(bird) {
    var view = new BuyableBirdView({ model: bird });
    this.$el.append(view.render().el);
  },

  renderAddon: function(addon) {
    var view = new BuyableAddonView({ model: addon });
    this.$el.append(view.render().el);
  },

});
