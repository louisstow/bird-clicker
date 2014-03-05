var TreeView = Backbone.View.extend({

  el: "#tree",

  initialize: function() {
    this.listenTo(game.player.nests, 'all', this.render);
    this.render();
  },

  template: _.template(''),

  render: function() {
    this.$el.html(this.template());

    game.player.nests.each(this.renderNest, this);

    return this;
  },

  renderNest: function(nest) {
    var view = new NestView({ model: nest });
    this.$el.append(view.render().el);
  },

});
