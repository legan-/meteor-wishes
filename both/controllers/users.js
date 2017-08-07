UsersController = AppController.extend({
	index: function () {
		this.render('usersIndex', {});
		Meta.setTitle('User Settings');
	},
	addSpouse: function () {
		this.render('usersAddSpouse', {});
		Meta.setTitle('Add Spouse');
	}
});

UsersController.events({
	'submit .add-spouse': function (e) {
		e.preventDefault();
		var email = e.target.email.value;
		if (email.length > 6) {
			Meteor.call('addSpouse', email, function (error, response) {
				if (error) {
					Bert.alert(error.reason, 'danger');
					e.target.email.value = '';
				}
				else {
					e.target.email.value = '';
					Router.go('usersIndex');
					Bert.alert('Spouse added', 'success');
				}
			});
		}
		else {
			Bert.alert("Email's required");
		}
		return false;
	},

	'click #agree': function () {
		Meteor.call('acceptEmail', function (error, response) {
			if (error) {
				Bert.alert(error.reason, 'danger');
			} else {
				Bert.alert('Request accepted', 'success');
			}
		});
		return false;
	},

	'click #cancel': function () {
		Meteor.call('declineEmail', function (error, response) {
			if (error) {
				Bert.alert(error.reason, 'danger');
			}
		});
		return false;
	},
});