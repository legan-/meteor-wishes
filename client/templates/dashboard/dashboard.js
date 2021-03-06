Template.dashboard.onRendered( function () {
	// the same source as at wishes
	var table = $('.table-wishes')
		, tableRows = $('.table-wishes').find('tr')
		, alert = $('.alert-manual')
		, alertForSpouse = alert.find('.for-spouse')
		, btns = $('.btn-sort')
		, a = $('#a')
		, h = $('#h')
		, m = $('#m');

	refreshTable = function (id) {
		btns.removeClass('active');
		btns.filter('#' + id).addClass('active');
		alert.addClass('hidden');
		alertForSpouse.addClass('hidden');
		tableRows.removeClass('hidden');

		switch (id) {
			case 'h':
				tableRows.each( function () {
					var $this = $(this)
						, userId = $this.data('user');
					if (userId == Meteor.userId()) {
						$this.addClass('hidden');
					}
				});
				var length = tableRows.not('.hidden').length;
				if (length == 0) {
					alertForSpouse.removeClass('hidden');
					alert.removeClass('hidden');
				}
				break;
			case 'm':
				tableRows.each( function () {
					var $this = $(this)
						, userId = $this.data('user');
					if (userId != Meteor.userId()) {
						$this.addClass('hidden');
					}
				});
				var length = tableRows.not('.hidden').length;
				if (length == 0) {
					alert.removeClass('hidden');
				}
				break;
			case 'a':
				break;
		}
	}

	btns.click( function () {
		refreshTable($(this).attr('id'));
	});

	refreshTable('h');
});

Template.dashboard.onCreated( function () {

});

Template.dashboard.helpers({
	'verifiedClass': function (verified) {
		var className = '';
		if (!verified) {
			className = 'col-md-offset-3'
		}
		return className;
	}
});

Template.dashboard.events({
  'click .remove-item': function () {
    if (confirm('Do you really would like to remove this?')) {
      var id = this._id;
      Meteor.call('removeItem', id);
    }
    return false;
  }
});