var Nest = Backbone.Model.extend({
  name: null,
  description: null,
  image: null,
  capacity: 0,
  cost: 0,

  birds: null,

  initialize: function (data) {
    this.name = data.name;
    this.image = data.image;
    this.description = data.description;
    this.capacity = data.capacity;
    this.cost = data.cost;

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
  }
});