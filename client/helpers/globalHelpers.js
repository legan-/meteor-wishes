Template.registerHelper('email', function () {
	return Meteor.user().emails[0].address;
});

Template.registerHelper('previousPath', function () {
	if (Session.get('previousPath') == null) {
		return 'dashboard';
	}
	else {
		return Session.get('previousPath');
	}
});

Template.registerHelper('verifiedEmail', function () {
	var spouse = Meteor.user().spouse;
	if (spouse) {
		var spouseId = spouse.userId
			, verified = spouse.verified
			, user = Meteor.users.findOne(spouseId);
		if (verified) {
			return user.emails[0].address;
		}
	}
});

Template.registerHelper('requestedEmail', function () {
	var spouse = Meteor.user().spouse;
	if (spouse) {
		var spouseId = spouse.userId
			, requested = spouse.request
			, user = Meteor.users.findOne(spouseId);
		if (requested) {
			return user.emails[0].address;
		}
	}
});

Template.registerHelper('pendingEmail', function () {
	var spouse = Meteor.user().spouse;

	if (spouse) {
		var spouseId = spouse.userId
			, verified = spouse.verified;

		if (spouseId && !verified) {
			var user = Meteor.users.findOne(spouseId);
			if (user) {
				return user.emails[0].address;
			}
		}
	}
});

Template.registerHelper('isPrivateGift', function () {
	return this.private;
});

Template.registerHelper('isPrivateWish', function () {
	return Meteor.userId() == this.userId;
})