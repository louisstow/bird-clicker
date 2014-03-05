var ChallengeView = Backbone.View.extend({
  id: function() { return this.model.get("id") + "ChallengeView" },

  initialize: function(data) {
  	this.listenTo(this.model, "change", this.render);
    this.view = $("#notifications").append(this.render().$el);
    this.view.css({opacity: 0, bottom: "-75px"}).animate({bottom: "0", opacity: 1}, 500);
  },

  template: _.template('<div class="challenge">' + 
  	'<p class="description"><%- description %></p>' +
  	'<button id="cancel_button">Cancel</button>' + 
  	'<button id="ok_button">OK</button>' + 
  	'</div>'),

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
  },
  
  hide: function() {
    this.view.animate({bottom: "-75px", opacity: 0}, () => {
    	this.remove();
    });

  } 

});
