var ChallengeView = Backbone.View.extend({
  id: function() { return this.model.get("id") + "ChallengeView" },

  initialize: function(data) {
  	this.listenTo(this.model, "change", this.render);
    $("#notifications").append(this.render().$el);
  },

  template: _.template('<div class="challenge"><span class="description"><%- description %></span><div class="buttons"><button id="cancel_button">Cancel</button><button id="ok_button">OK</button>'),

  events: {
    "click #ok_button": "proceed",
    "click #cancel_button": "cancel",
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

  proceed: function() {
    this.model.trigger("proceed");
  },

  cancel: function() {
    this.model.trigger("cancel");

  }

});
