$(function() {
  $(document).ready(function() {
    function triggerClick(elem) {
      $(elem).click();
    }

    handleStepper();
    $(document).on('click', '[data-toggle="wizard"]', function() {
      $('.modal-box').show();
      handleStepper();
    });

    function handleStepper() {
      var $progressWizard = $('.stepper'),
        $tab_active,
        $tab_next,
        $btn_next = $progressWizard.find('.next-step'),
        $tab_toggle = $progressWizard.find('[data-toggle="tab"]');

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
        $tab_active = $progressWizard.find('.active');
        $tab_active.next().addClass('completed');
        $tab_active.addClass('completed');

        $tab_active.next().removeClass('disabled');
        $tab_active.find('a[data-toggle="tab"]');

        $tab_next = $tab_active.next().find('a[data-toggle="tab"]');
        triggerClick($tab_next);
      });
    }
  });
});
