App = Ember.Application.create({});

// Store
App.Store = DS.Store.extend({
	revision: 12,
	adapter: DS.LSAdapter.create()
});

//Routes
App.Router.map(function() {
	this.resource('grades')
});

App.GradesRoute = Ember.Route.extend({
	model: function() {
		return App.Grade.find();
	}
});

var attr = DS.attr;

// Model
App.Grade = DS.Model.extend({
	module: attr('string'),
	grade: attr('number')
});

// Controller
App.GradesController = Ember.ArrayController.extend({
	createGrade: function () {
		// Get the grade title set by the "New Todo" text field
		var module = this.get('newModule');
		var grade = this.get('newGrade');
		// if (!grade.trim() || grade > 100 || grade < 0)) { return; }
		if (!module.trim()) {
			alert("You must be forgeting something...");
			return;
		}
		var re = new RegExp('^[0-9][0-9]?$|^100$');
		if (!grade.match(re)) {
			alert("Grade must be between 0-100");
			return;
		}

		// Create the new Todo model
		var saveGrade = App.Grade.createRecord({
			module: module,
			grade: Math.round(grade)
		});

		// Clear the "New Todo" text field
		this.set('newModule', '');
		this.set('newGrade', '');

		// Save the new model
		saveGrade.get('store').commit()
		// saveGrade.save();
	},

	removeGrade: function (id) {
		this.get('store').deleteRecord(App.Grade.find(id));
		this.get('store').commit();
	},

	average: function() {
		if(this.get('length')<1){
			return "No grades yet."
		}
		var arr = this.forEach(function(item) {
			return item.get('grade');
		});
		var total = 0;
		arr.forEach(function (item){
			total += parseInt(item.get('grade'));
		});
		var average = Math.round(total/arr.get('length'));
		if(average <40)
			return average + "% - Come on, bro."
		if(average <50)
			return average + "% - That's a pass, yo."
		if(average <60)
			return average + "% - That's a 2:2, yo."
		if(average <70)
			return average + "% - That's a 2:1, yo."
		else
			return average + "% - That's a first, yo."
	}.property('@each.grade')
});
