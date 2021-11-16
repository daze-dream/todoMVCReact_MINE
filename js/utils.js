var app = app || {};

(function () {
	'use strict';

	app.Utils = {
		// generates a UUID without a library. Really cool 
		uuid: function () {
			/*jshint bitwise:false */
			var i, random;
			var uuid = '';

			for (i = 0; i < 32; i++) {
				random = Math.random() * 16 | 0;
				if (i === 8 || i === 12 || i === 16 || i === 20) {
					uuid += '-';
				}
				uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
					.toString(16);
			}

			return uuid;
		},

		// just pluralizes a word. A lot of apps would use a npm package for this, so this is neat.
		pluralize: function (count, word) {
			return count === 1 ? word : word + 's';
		},

		// stores the data with the given namespace
		store: function (namespace, data) {
			console.log(data)
			if (data) {
				return localStorage.setItem(namespace, JSON.stringify(data));
			}

			var store = localStorage.getItem(namespace);
			return (store && JSON.parse(store)) || [];
		},
		/**Really interesting function. It maps over the arguments passed in and then returns
		 * 	the item with its completion negated or not. 
		 * 	For example, in the toggleAll call, it is called for each todo.
		 * 	But in the toggle call, it is only called when there is a match. 
		 */
		extend: function () {
			console.log("extending")
			var newObj = {};
			for (var i = 0; i < arguments.length; i++) {
				console.log("all arguments", arguments)
				var obj = arguments[i];
				console.log("the argument:", obj)
				for (var key in obj) {
					// check if the object has that property
					// better to use for maybe
					if (obj.hasOwnProperty(key)) {
						newObj[key] = obj[key];
						console.log("newobj", newObj)
					}
				}
			}
			return newObj;
		}
	};
})();
