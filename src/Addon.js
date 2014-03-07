var Addon = Backbone.Model.extend({
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
  },
  initialize: function() {

  },
  calculate: function() {
  	//if(this.purchased) {
      this.process();
  	//}

  },
  process: function() {

  }
});