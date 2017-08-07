GiftsController = AppController.extend({
  waitOn: function () {
    return [
      Meteor.subscribe('items')
    ];
  },
	index: function () {
		this.render('giftsIndex', {});
		Meta.setTitle('Gifts');
	},
	add: function () {
		this.render('giftsAdd', {});
		Meta.setTitle('Add new gift');
	},
	show: function () {
		var id = this.params._id
			, item = Items.findOne( { _id: id } );
		this.render('giftsShow', {
			data: function () {
				return item
			}
		});
		Meta.setTitle(item.name);
	},
	edit: function () {
		var id = this.params._id
			, item = Items.findOne( { _id: id } );
		this.render('giftsEdit', {
			data: function () {
				return item
			}
		});
		Meta.setTitle('Edit ', item.name);		
	},
	data: function () {
		templateData = {
			gifts: Items.find( { userId: Meteor.userId(), private: true }, { sort: { createdAt: -1 } } )
		}
		return templateData;
	}
});

GiftsController.events({
	'submit .add-gift': function (e) {
		e.preventDefault();
		var gift = {
			name: 				e.target.name.value,
			description: 	e.target.description.value,
			location: 		e.target.location.value,
			userId: 			Meteor.userId(),
			private: 			true
		};
		if (gift.name.length > 2 && gift.description.length > 4) {
			Meteor.call('addItem', gift);
			e.target.name.value = '';
			e.target.description.value = '';
			e.target.location.value = '';
			Router.go('dashboard');
			Bert.alert('Gift "' + gift.name + '" added', 'success');
		}
		else {
			Bert.alert('Name and Description are required', 'danger');
		}
		return false;
	},
	'submit .edit-gift': function (e) {
		var id = this.params._id
			, gift = {
			name: 				e.target.name.value,
			description: 	e.target.description.value,
			location: 		e.target.location.value,
			userId: 			Meteor.userId(),
			private: 			true
		};
		if (gift.name.length > 2 && gift.description.length > 4) {
			Meteor.call('editItem', id, gift, function (error, result) {
				if (error) {
					Bert.alert(error.reason, 'danger');
				} else {
					Router.go('dashboard');
					Bert.alert('Gift "' + gift.name + '" updated', 'success');
				}
			});
		}
		return false;
	},
});