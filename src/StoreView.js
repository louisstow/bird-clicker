var StoreView = Backbone.View.extend({

  el: "#items",

  initialize: function() {
    this.render();

  },

  template: _.template('<span id="addoncontainer"><h3>Addons</h3><ul id="addonitems"></ul></span>' +
    '<span id="nestcontainer"><h3>Nests</h3><ul id="nestitems"></ul></span>' +
    '<span id="birdcontainer"><h3>Birds</h3><ul id="birditems"></ul></span>'),

  render: function() {
    this.$el.html(this.template());

    game.addons.each(this.renderAddon, this);
    game.nests.each(this.renderNest, this);
    game.birds.each(this.renderBird, this);

    this.toggleSectionVisibility();

    return this;
  },

  toggleSectionVisibility: function() {

    var displayAddons = false;
    game.addons.each((addon) => {
      game.debug("addon", addon.get("id"), addon.get("hidden"), addon.get("shown"));
      if(!addon.get("hidden") && addon.get("shown")) {
        displayAddons = true;
      }
    });
    if(!displayAddons) {
      $("#addoncontainer").hide();
    } else {
      $("#addoncontainer").show();
    }
  },

  renderNest: function(nest) {
    var view = new BuyableNestView({ model: nest });
    $("#nestitems").append(view.render().el);
  },

  renderBird: function(bird) {
    var view = new BuyableBirdView({ model: bird });
    $("#birditems").append(view.render().el);
  },

  renderAddon: function(addon) {
    var view = new BuyableAddonView({ model: addon });
    $("#addonitems").append(view.render().el);

    this.listenTo(addon, "change", this.toggleSectionVisibility);
  },

});
