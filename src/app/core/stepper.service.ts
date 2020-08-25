import { Injectable } from '@angular/core';

declare const $: any;

@Injectable({
  providedIn: 'root',
})
export class StepperService {
  stepperInit() {
    $(function () {
      const $progressStepper = $('.stepper');
      let $tab_active: any;
      let $tab_next: any;
      let $tab_prev: any;
      const $btn_next = $progressStepper.find('.next-step');
      const $btn_prev = $progressStepper.find('.prev-step');
      const $tab_toggle = $progressStepper.find('[data-toggle="tab"]');
      $tab_toggle.on('show.bs.tab', function (e: any) {
        const $target = $(e.target);

        if (!$target.parent().hasClass('active, disabled')) {
          $target.parent().removeClass('active');
        }
        if ($target.parent().hasClass('disabled')) {
          return false;
        }
      });

      $btn_next.on('click', function () {
        $tab_active = $progressStepper.find('.active');
        $tab_active.next().addClass('completed');
        $tab_active.addClass('completed');

        $tab_active.next().removeClass('disabled');

        $tab_next = $tab_active.next().children('a[data-toggle="tab"]');
        $($tab_next).trigger('click');
      });

      $btn_prev.on('click', function () {
        $tab_active = $progressStepper.find('.active');
        $tab_active.prev().addClass('completed');
        $tab_active.addClass('completed');

        $tab_active.prev().removeClass('disabled');

        $tab_prev = $tab_active.prev().children('a[data-toggle="tab"]');
        $($tab_prev).trigger('click');
      });
    });
  }
}