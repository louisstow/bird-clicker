var StoreView = Backbone.View.extend({

  el: "#items",

  initialize: function() {
    this.render();

  },

  template: _.template('<span id="upgradecontainer"><h3>Upgrades</h3><ul id="upgradeitems"></ul></span>' +
    '<span id="nestcontainer"><h3>Nests</h3><ul id="nestitems"></ul></span>' +
    '<span id="birdcontainer"><h3>Birds</h3><ul id="birditems"></ul></span>'),

  render: function() {
    this.$el.html(this.template());

    game.upgrades.each(this.renderUpgrade, this);
    game.nests.each(this.renderNest, this);
    game.birds.each(this.renderBird, this);

    this.toggleSectionVisibility();

    return this;
  },

  toggleSectionVisibility: function() {

    var displayUpgrades = false;
    game.upgrades.each((upgrade) => {
      game.debug("upgrade", upgrade.get("id"), upgrade.get("hidden"), upgrade.get("shown"));
      if(!upgrade.get("hidden") && upgrade.get("shown")) {
        displayUpgrades = true;
      }
    });
    if(!displayUpgrades) {
      $("#upgradecontainer").hide();
    } else {
      $("#upgradecontainer").show();
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

  renderUpgrade: function(upgrade) {
    var view = new BuyableUpgradeView({ model: upgrade });
    $("#upgradeitems").append(view.render().el);

    this.listenTo(upgrade, "change", this.toggleSectionVisibility);
  },

});
