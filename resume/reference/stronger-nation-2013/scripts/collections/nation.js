/*global define*/
define([
	'underscore',
	'backbone',
	'models/state'
], function (_, Backbone, State) {
	var Nation = Backbone.Collection.extend({
	  model: State
	});

	return Nation;
});