AccountsTemplates.configureRoute('signIn', { layoutTemplate: 'appLayout' });
AccountsTemplates.configureRoute('signUp', { layoutTemplate: 'appLayout' });
AccountsTemplates.configureRoute('ensureSignedIn', { layoutTemplate: 'appLayout' });

var checkSpouseSignIn = function (error, state) {
	if (!error) {
		if (state === 'signIn') {
			var user = Meteor.user();
			Meteor.call('checkUser', function (error, request) {
				if (request) {
					Router.go('usersIndex');
				}
			});
		}
	}
};

var checkSpouseSignUp = function () {
	Router.go('usersAddSpouse');
};

AccountsTemplates.configure({
  focusFirstInput: true,
  showForgotPasswordLink: true,
  forbidClientAccountCreation: false,
  onSubmitHook: checkSpouseSignIn,
  // preSignUpHook: checkSpouseSignUp,
});