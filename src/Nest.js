var Nest = Backbone.Model.extend({
	name: null,
	description: null,
	image: null,
	capacity: 0,
	cost: 0,

	birds: [],

	initialize: function (data) {
		this.name = data.name;
		this.image = data.image;
		this.description = data.description;
		this.capacity = data.capacity;
		this.cost = data.cost;
	},

	addBird: function (bird) {
		if (this.birds.length >= this.capacity) {
			return false;
		}

		this.birds.push(bird);
		return bird;
	},

	removeBird: function (bird) {
		for (var i = 0; i < this.birds.length; ++i) {
			if (this.birds[i] == bird) {
				this.birds.splice(i, 1);
				return bird;
			}
		}

		return false;
	}
});