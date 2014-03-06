var RewardedAwardView = Backbone.View.extend({
  id: function() { return this.model.get("id") + "RewardedAwardsView" },

  initialize: function(data) {
  	this.listenTo(this.model, "change", this.render);
  },

  template: _.template('<dt class="name"><%- name %></dt>' +
  	'<dd class="description"><%- description %></dd>'),

  render: function() {
    if(this.model.get("awarded")) {
      this.$el.html(this.template(this.model.attributes));
    }
    return this;
  },
});