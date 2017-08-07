DashboardController = AppController.extend({
  waitOn: function () {
    return [
      Meteor.subscribe('items')
    ];
  },
  data: function () {
    templateData = {
      wishes: Items.find( { private: false }, { sort: { createdAt: -1 } } ),
      gifts: Items.find( { userId: Meteor.userId(), private: true }, { sort: { createdAt: -1 } } )
    }
    return templateData;
  }
});

DashboardController.events({

});