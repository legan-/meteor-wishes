Template.appLayout.rendered = function () {
  // Disable iOS 10 Safari zooming.
  document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
  });
};