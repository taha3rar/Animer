$(function() {
  $(document).ready(function() {
    function triggerClick(elem, target) {
      $('#' + target).addClass('animate');
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
      $tab_active = $progressWizard.find('.active');
      $tab_active.next().addClass('completed');

      $tab_active.next().removeClass('disabled');
      $tab_active.find('a[data-toggle="tab"]');

      $tab_next = $tab_active.next().find('a[data-toggle="tab"]');
      $tab_target = $tab_next.attr('href').substr(1);
      triggerClick($tab_next, $tab_target);
    });
  });
});
