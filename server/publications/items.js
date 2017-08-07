Meteor.publish('items', function () {
	var userId = this.userId;
	if (userId) {
		var currentUser = Meteor.users.findOne(userId)
			, ids = [];

		ids.push(userId);
		if (currentUser.spouse) {
			ids.push(currentUser.spouse.userId);
		};

		if (ids.length >= 2) {
			return Items.find( { 
				$or: [ {
					userId: ids[0] 
				}, {
					userId: ids[1]
				} ]
			} );
		} else {
			return Items.find( { 
				$or: [ {
					userId: ids[0] 
				} ]
			} );
		}

	} else {
		this.ready();
	}
});