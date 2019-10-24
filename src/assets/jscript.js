$(function() {
  $(document).ready(function() {
    function triggerClick(elem) {
      $(elem).click();
    }

    $(document).on('click', '[data-toggle="wizard"]', function() {
      $targetModal = $(this).data('target');
      $($targetModal).show();
      $($targetModal)
        .find('[data-dismiss="modal"]')
        .on('click', function() {
          $($targetModal).fadeOut('fast');
        });
    });
  });
});
