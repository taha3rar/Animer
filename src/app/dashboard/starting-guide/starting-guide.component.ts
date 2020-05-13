import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-starting-guide',
  templateUrl: './starting-guide.component.html',
  styleUrls: ['./starting-guide.component.scss']
})
export class StartingGuideComponent implements OnInit {
  userProgress: any;
  currentUser: any;

  swalWithStyledButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-primary'
    },
    buttonsStyling: false
  });

  progressCompleted = false;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(({ currentUser, progress }) => {
      this.userProgress = progress;
      this.currentUser = currentUser;
      this.checkCurrentStep();
    });
  }

  checkCurrentStep() {
    $(function() {
      $('#startingGuideTab')
        .find('.current-step')
        .removeClass('current-step');
      $('#startingGuideTab li').each(function() {
        if (
          $(this).hasClass('completed') &&
          !$(this)
            .next()
            .hasClass('completed')
        ) {
          $(this)
            .next()
            .addClass('current-step');
          $(this)
            .next()
            .trigger('click');
          return false;
        }
      });
    });
  }

  nextStep(tabName: string) {
    $('#startingGuideTab li[href="#' + tabName + '"]').tab('show');
  }
}
