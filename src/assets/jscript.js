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
        console.log('true');
        $('.sidebar-wrapper').show();
      }
    });

    function triggerClick(elem) {
      $(elem).click();
    }

    $(document).on('click', '[data-toggle="popup"]', function(e) {
      $targetModal = $(this).data('target');
      $($targetModal).show();
      $($targetModal)
        .find('[data-dismiss="modal"]')
        .on('click', function() {
          $($targetModal).fadeOut('fast');
        });
    });

    handleStepper();

    $(document).on('click', '[data-toggle="wizard"]', function() {
      $targetModal = $(this).data('target');
      $($targetModal).show();
      $($targetModal)
        .find('[data-dismiss="modal"]')
        .on('click', function() {
          $($targetModal).fadeOut('fast');
        });
      handleStepper();
    });

    $(document).on('click', '[data-toggle="stepper"]', function() {
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
        console.log('clicked');
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
