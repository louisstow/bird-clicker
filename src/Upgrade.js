var Upgrade = Backbone.Model.extend({
defaults: {
    'id': null,
    'cost': null,
    'description': null,
    'purchased': false,
    'shown': false,
    'disabled': true,
    'hidden': true,
    'forceRender': false
  },

  constructor: function(data) {
    Backbone.Model.apply(this, arguments);

    if(data.process) {
      this.process = data.process;
    }
    if(data.canShow) {
      this.canShow = data.canShow;
    }
  },
  initialize: function() {

  },
  process: function() {

  }, 
  canShow: function() {
    // override to provide functionality as to when this upgrade can be shown in the store
    return true;
  }
});