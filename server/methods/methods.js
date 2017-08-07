Meteor.methods({
	addItem: function (item) {
		ItemsSchema.validate(item);
		Items.insert(item);
	},
	editItem: function (id, item) {
		ItemsSchema.validate(item);
		Items.update(
			{ _id: id },
			{ $set: item }
		);
	},
	removeItem: function (id) {
		Items.remove(id);
	},
	addSpouse: function (email) {
		var user = Accounts.findUserByEmail(email)
			, currentUserId = Meteor.userId();
		if (user) {
			var spouseId = user._id;
			if (spouseId != currentUserId) {
				var spouse = user.spouse;
				if (!spouse) {
					Meteor.users.update(currentUserId, {
						$set: {
							spouse: {
								userId: spouseId,
								verified: false
							}
						}
		      });
		      Meteor.users.update(spouseId, {
		      	$set: {
		      		spouse : {
			      		request: true,
								userId: currentUserId,
								verified: false
		      		}
		      	}
		      });
					return true
				} else {
					if (spouse.request) {
						throw new Meteor.Error(500, "User already have got someone's request.")
					} else if (spouse.verified) {
						throw new Meteor.Error(500, "User already have added by someone.")
					} else {
						throw new Meteor.Error(500, "User's waiting someone's accept.")
					}
				}
			} else {
				throw new Meteor.Error(500, "You can't connet with yourself.")
			}
		} else {
			throw new Meteor.Error(500, "User doesn't exist.")
		}
	},
	acceptEmail: function () {
		var currentUser = Meteor.user();
		if (currentUser) {
			var spouseId = currentUser.spouse.userId;
			Meteor.users.update(currentUser._id, {
				$unset: {
					'spouse.request': ''
				}
			});
			Meteor.users.update(currentUser._id, {
				$set: {
					'spouse.verified': true
				}
			});
			Meteor.users.update(spouseId, {
				$set: {
					'spouse.verified': true
				}
			});
			return true;
		}
	},
	declineEmail: function () {
		var currentUser = Meteor.user();
		if (currentUser) {
			var spouseId = currentUser.spouse.userId;
			Meteor.users.update(currentUser._id, {
				$unset: {
					'spouse': ''
				}
			});
			if (spouseId) {
				Meteor.users.update(spouseId, {
					$unset: {
						'spouse': ''
					}
				});
			}
			return true;
		}		
	},
	checkUser: function () {
		if (!Meteor.user().spouse || Meteor.user().spouse.request) {
			return true;
		} else {
			return false;
		}
	},
});