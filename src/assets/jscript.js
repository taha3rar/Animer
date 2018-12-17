$(function() {
  $(document).ready(function() {
    function triggerClick(elem) {
      $(elem).click();
    }

    var $progressWizard = $('.stepper'),
      $tab_active,
      $tab_prev,
      $tab_next,
      $btn_prev = $progressWizard.find('.prev-step'),
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
      console.log($btn_next);
      $tab_active = $progressWizard.find('.active');
      $tab_active.next().addClass('completed');

      $tab_active.next().removeClass('disabled');
      $tab_active.find('a[data-toggle="tab"]');

      $tab_next = $tab_active.next().find('a[data-toggle="tab"]');
      triggerClick($tab_next);
    });

    var $stepperBar = $('.step-bar'),
      $tab_next,
      $active_tab;

    $next = $('.wizard').find('.btn-next');

    $next.on('click', function() {
      $active_tab = $stepperBar.find('.active');
      $active_tab.next().addClass('completed');

      $active_tab.find('a[data-toggle="tab"]');
      $tab_next = $active_tab.next().find('a[data-toggle="tab"]');
      triggerClick($tab_next);
    });
  });
});
