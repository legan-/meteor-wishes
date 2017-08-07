publishComposite('users', {
	find() {
		var id = this.userId;
		return Meteor.users.find(
			{ _id: id },
			{ fields: { spouse: 1 } }
		);
	},
	children: [
		{
			find(user) {
				if (user.spouse) {
					return Meteor.users.find(
						{ _id: user.spouse.userId },
						{ fields: { emails: 1, spouse: 1 } }
					);
				}
			}
		}
	]
});