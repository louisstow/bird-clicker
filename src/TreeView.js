var TreeView = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
    this.render();
  },

  template: _.template(''),

  nestTemplate: _.template('<img width=24 height=24 src="<%- image %>">'),
  birdTemplate: _.template('<img width=24 height=24 src="<%- image %>">'),

  render: function() {
    this.$el.html(this.template(this.model.attributes));

    this.model.nests.forEach((nest) => {
      this.$el.append(this.nestTemplate(nest.attributes));
      nest.birds.forEach((bird) => {
        this.$el.append(this.birdTemplate(bird.attributes));
      });
    });

    return this;
  },

});
