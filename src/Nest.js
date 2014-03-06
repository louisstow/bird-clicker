var Nest = Backbone.Model.extend({
  defaults: {
    'name': null,
    'description': null,
    'image': null,
    'capacity': 1,
    'baseCost': -1,
    'cost': 0,
    'shown': false,
    'disabled': true,
    'numberOwned': 0
  },

  birds: null,

  initialize: function (data) {
    this.birds = new Birds;
    this.set("cost", this.get("baseCost"));
    this.birds.init();
  },

  addBird: function (bird) {
    if (this.birds.length >= this.capacity) {
      return false;
    }

    this.birds.push(bird);
    bird.nest = this;
    return bird;
  },

  removeBird: function (bird) {
    bird.nest = null;
    return this.birds.remove(bird);
  },

  atCapacity: function () {
    return this.birds.length >= this.get("capacity");
  }
});
