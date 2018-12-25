$(function() {
  $(document).ready(function() {
    function triggerClick(elem) {
      $(elem).click();
    }

    handleStepper();

    $(document).on('click', '[data-toggle="wizard"]', function(e) {
      $targetModal = $(this).data('target');
      $($targetModal).show();
      $($targetModal)
        .find('[data-dismiss="modal"]')
        .on('click', function() {
          $($targetModal).hide();
        });
      handleStepper();
    });

    $(document).on('click', '[data-toggle="stepper"]', function(e) {
      handleStepper();
    });

    function handleStepper() {
      var $progressStepper = $('.stepper'),
        $tab_active,
        $tab_next,
        $btn_next = $progressStepper.find('.next-step'),
        $tab_toggle = $progressStepper.find('[data-toggle="tab"]');

      $tab_toggle.on('show.bs.tab', function(e) {
        var $target = $(e.target);

        if (!$target.parent().hasClass('active, disabled')) {
          $target.parent().removeClass('active');
        }
        if ($target.parent().hasClass('disabled')) {
          return false;
        }
      });

      $btn_next.on('click', function() {
        $tab_active = $progressStepper.find('.active');
        $tab_active.next().addClass('completed');
        $tab_active.addClass('completed');

        $tab_active.next().removeClass('disabled');

        $tab_next = $tab_active.next().find('a[data-toggle="tab"]');
        triggerClick($tab_next);
      });
    }
  });
});
