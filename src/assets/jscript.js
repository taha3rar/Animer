$(function() {
  $(document).ready(function() {
    $('#toggle').change(function() {
      if ($(this).is(':checked')) {
        $('.sidebar-wrapper').animate({
          width: 'toggle'
        });
      } else {
        $('.sidebar-wrapper').animate({
          width: 'hide'
        });
      }
    });

    $(window).resize(function() {
      if ($(window).width() > 580) {
        $('.sidebar-wrapper').show();
      }
    });

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
