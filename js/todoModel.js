/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */
var app = app || {};

(function () {
	'use strict';
	// I think this is passed in the call for model as well. 
	var Utils = app.Utils;
	// Generic "model" object. You can use whatever
	// framework you want. For this application it
	// may not even be worth separating this logic
	// out, but we do this to demonstrate one way to
	// separate out parts of your application.
	app.TodoModel = function (key) {
		this.key = key;
		this.todos = Utils.store(key);
		this.onChanges = [];
	};

	app.TodoModel.prototype.subscribe = function (onChange) {
		//console.log("cat", onChange)
		this.onChanges.push(onChange);
		//console.log("cat2", onChange)

	};
	//take a closer look 
	/**so this stores the data and then calls the render function again? strange 
	 * it is also responsible for storing the todo data modified from our functions
	 * EX: the clear all compelted sets a new todo , so we store it 
	*/
	app.TodoModel.prototype.inform = function () {
		Utils.store(this.key, this.todos);
		this.onChanges.forEach(function (cb) {
			console.log("inform", cb) 
			cb(); 

			});
	};

	//adds a new todo using concat to not manipulate the original data directly
	app.TodoModel.prototype.addTodo = function ({title, dueDate}) {
		this.todos = this.todos.concat({
			id: Utils.uuid(),
			title: title,
			completed: false,
			dueDate: dueDate
		});
		console.log(this.todos)
		this.inform();
	};
	/**toggles ALL items to be completed. checked is what to be toggled  */
	app.TodoModel.prototype.toggleAll = function (checked) {
		// Note: it's usually better to use immutable data structures since they're
		// easier to reason about and React works very well with them. That's why
		// we use map() and filter() everywhere instead of mutating the array or
		// todo items themselves.
		console.log(checked)
		this.todos = this.todos.map(function (todo) {
			return Utils.extend({}, todo, {completed: checked});
		});

		this.inform();
	};

	/**Toggles one item to be completed / not. Maps over all the todos and ternary operates on them 
	 * negates the completion if it is selected
	 */
	app.TodoModel.prototype.toggle = function (todoToToggle) {
		this.todos = this.todos.map(function (todo) {
			return todo !== todoToToggle ?
				todo :
				Utils.extend({}, todo, {completed: !todo.completed});
		});

		this.inform();
	};
	// removes the item from the todo with filter
	app.TodoModel.prototype.destroy = function (todo) {
		this.todos = this.todos.filter(function (candidate) {
			return candidate !== todo;
		});

		this.inform();
	};

	// saves edits done to it using the extend() util
	app.TodoModel.prototype.save = function (todoToSave, text) {
		this.todos = this.todos.map(function (todo) {
			return todo !== todoToSave ? todo : Utils.extend({}, todo, {title: text});
		});

		this.inform();
	};

	//deletes items that were completed with a filter and saves to the context
	app.TodoModel.prototype.clearCompleted = function () {
		this.todos = this.todos.filter(function (todo) {
			return !todo.completed;
		});

		this.inform();
	};

})();
