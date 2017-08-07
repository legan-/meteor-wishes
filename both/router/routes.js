Router.route('/', {
  name: 'dashboard',
  controller: 'DashboardController'
});

Router.route('/wishes', {
	name: 'wishesIndex',
	controller: 'WishesController',
	action: 'index'
});

Router.route('/wishes/add', {
	name: 'wishesAdd',
	controller: 'WishesController',
	action: 'add'
});

Router.route('/wishes/:_id', {
	name: 'wishesShow',
	controller: 'WishesController',
	action: 'show'
});

Router.route('/wishes/:_id/edit', {
	name: 'wishesEdit',
	controller: 'WishesController',
	action: 'edit'
});

Router.route('/gifts', {
	name: 'giftsIndex',
	controller: 'GiftsController',
	action: 'index'
});

Router.route('/gifts/add', {
	name: 'giftsAdd',
	controller: 'GiftsController',
	action: 'add'
});

Router.route('/gifts/:_id', {
	name: 'giftsShow',
	controller: 'GiftsController',
	action: 'show'
});

Router.route('/gifts/:_id/edit', {
	name: 'giftsEdit',
	controller: 'GiftsController',
	action: 'edit'
});

Router.route('/users', {
	name: 'usersIndex',
	controller: 'UsersController',
	action: 'index'
});

Router.route('/users/add-spouse', {
	name: 'usersAddSpouse',
	controller: 'UsersController',
	action: 'addSpouse'
});