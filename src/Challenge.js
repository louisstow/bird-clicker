var Challenge = Backbone.Model.extend({
  description: null,
  probability: 0.00, // 0.00 - 1.00 range
  timeout: 10, //unit: seconds
  initilize: function() {
		on("process", function(playerObj) {
		  this.process(playerObj);
		});
  },
  displayDescription: function() {
    // code to show description to user
  },
  start: function(playerObj) {
  	setTimeout(function(){
  		           this.trigger("process", playerObj);
               },timeout * 1000);
  },
  process: function(playerObj) {
  	this.verify(playerObj) ? this.onSuccess(playerObj) : this.onFailure(playerObj);
  },
  verify: function(playerObj) {
    return true;
  },
  onSucess: function(playerObj) {

  },
  onFailure: function(playerObj) {

  }
});