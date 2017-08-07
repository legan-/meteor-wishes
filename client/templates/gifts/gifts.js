Template.giftsIndex.onRendered( function () {

});

Template.giftsIndex.onCreated( function () {

});

Template.giftsIndex.helpers({

});

Template.giftsIndex.events({
	'click .remove-item': function () {
		if (confirm('Do you really would like to remove this?')) {
			var id = this._id;
			Meteor.call('removeItem', id);
		}
		return false;
	}
});

Template.giftsShow.events({
	'click .remove-item': function () {
		if (confirm('Do you really would like to remove this?')) {
			var id = this._id;
			Router.go(Session.get('previousPath'));
			Meteor.call('removeItem', id);
		}
		return false;
	}
});