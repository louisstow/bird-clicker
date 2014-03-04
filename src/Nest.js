var Nest = Backbone.Model.extend({
  defaults: {
    name: null,
    description: null,
    image: null,
    capacity: 0,
    cost: 0,
  },

  birds: null,

  initialize: function (data) {
    this.birds = new Birds;
  },

  addBird: function (bird) {
    if (this.birds.length >= this.capacity) {
      return false;
    }

    this.birds.push(bird);
    return bird;
  },

  removeBird: function (bird) {
    return this.birds.remove(bird);
  },

  atCapacity: function () {
    return this.birds.length >= this.capacity;
  }
});