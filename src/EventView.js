var EventView = Backbone.View.extend({
  id: function() { return this.model.get("id") + "EventView" },

  initialize: function(data) {
  	this.listenTo(this.model, "change", this.render);
    this.view = $("#notifications").append(this.render().$el);
    this.view.css({opacity: 0, bottom: "-75px"}).animate({bottom: "0", opacity: 1}, 500);
  },

  template: _.template('<div class="event">' + 
  	'<p class="description"><%- description %></p>' +
  	'</div>'),

  events: {
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },
  
  hide: function() {
    this.view.animate({bottom: "-75px", opacity: 0}, () => {
    	this.remove();
    });

  } 

});
