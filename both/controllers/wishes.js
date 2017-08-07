WishesController = AppController.extend({
	waitOn: function () {
		return [
			Meteor.subscribe('items')
		];
	},
	index: function () {
		this.render('wishesIndex', {});
		Meta.setTitle('My Wishes');
	},
	add: function () {
		this.render('wishesAdd', {});
		Meta.setTitle('Add new wish');
	},
	show: function () {
		var id = this.params._id
			, item = Items.findOne({ _id: id });
		this.render('wishesShow', {
			data: function () {
				return item
			}
		});
		Meta.setTitle(item.name);
	},
	edit: function () {
		var id = this.params._id
			, item = Items.findOne({ _id: id });
		this.render('wishesEdit', {
			data: function () {
				return item
			}
		});
		Meta.setTitle('Edit ', item.name);		
	},
	data: function () {
		templateData = {
			wishes: Items.find( { private: false }, { sort: { createdAt: -1 } } )
		}
		return templateData;
	}
});

WishesController.events({
	'submit .add-wish': function (e) {
		var wish = {
			name: 				e.target.name.value,
			description: 	e.target.description.value,
			location: 		e.target.location.value,
			userId: 			Meteor.userId(),
			private: 			false
		};
		if (wish.name.length > 2 && wish.description.length > 4) {
			Meteor.call('addItem', wish, function (error, result) {
				if (error) {
					Bert.alert(error.reason, 'danger');
				} else {
					e.target.name.value = '';
					e.target.description.value = '';
					e.target.location.value = '';
					Router.go('wishesIndex');
					Bert.alert( 'Wish "' + wish.name + '" added', 'success');
				}
			});
		}
		else {
			Bert.alert('Name and Description are required', 'danger');
		}
		return false;
	},
	'submit .edit-wish': function (e) {
		var id = this.params._id
			, wish = {
			name: 				e.target.name.value,
			description: 	e.target.description.value,
			location: 		e.target.location.value,
			userId: 			Meteor.userId(),
			private: 			false
		};
		if (wish.name.length > 2 && wish.description.length > 4) {
			Meteor.call('editItem', id, wish, function (error, result) {
				if (error) {
					Bert.alert(error.reason, 'danger');
				} else {
					Router.go('wishesIndex');
					Bert.alert('Wish "' + wish.name + '" updated', 'success');
				}
			});
		}
		return false;
	},
});