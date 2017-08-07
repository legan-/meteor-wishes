AppController = RouteController.extend({
  layoutTemplate: 'appLayout',
	waitOn: function () {
		return [
			Meteor.subscribe('users')
		]
	},
	onStop: function () {
		var path = this.route.getName();
		if (path == 'giftsIndex' || path == 'wishesIndex' || path == 'dashboard') {
			Session.set('previousPath', path);
		}
	}
});

AppController.events({
  'click [data-action=logout]': function () {
    AccountsTemplates.logout();
  },
});