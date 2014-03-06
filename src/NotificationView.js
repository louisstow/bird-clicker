var NotificationView = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
    this.view = $("#notifications").append(this.render().$el);
    this.view.css({opacity: 0, bottom: "-75px"}).animate({bottom: "0", opacity: 1}, 500);
    setTimeout(() => this.hide(), 5 * 1000);
  },

  template: _.template('<div class="notification">' +
    '<p class="description"><%- description %></p>' +
    '</div>'),

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },

  hide: function() {
    this.view.animate({bottom: "-75px", opacity: 0}, () => {
      this.remove();
    });
  },

});
