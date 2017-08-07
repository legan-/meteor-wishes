Meteor.startup (function () {

  for (var property in Template) {
    if (Blaze.isTemplate(Template[property])) {
      var template=Template[property];
      template.onRendered (function () {

        $('.table-clickable').find('tr').each (function () {
          var $tr = $(this)
            , clicked = false;

          $tr.click (function (e) {
            var elem = e.target
              , $this = $(this);

            if (!elem.classList.contains('remove-item')) {
              Router.go($this.attr('data-link'));
            }
          });
        });

        var form = $('form');
        if (form.length) {
          form.find('input').eq(0).focus();
        }

      });
    }
  }

  Bert.defaults = {
    hideDelay: 3500,
    style: 'growl-top-right',
    type: 'default'
  };
});