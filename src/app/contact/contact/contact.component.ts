import { Component, OnInit, ElementRef, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultValues } from '@app/shared/helpers/default_values';
import { User } from '@avenews/agt-sdk';

export class Counter {
  documents: number;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  user: User;
  documents: any[];
  counter: Counter = new Counter();
  @ViewChildren('tabs')
  tabs: ElementRef;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({ contact }) => {
      // documents
      this.user = contact;
      // this.documents = documents;
      // this.counter = {
      //   documents: this.documents.length
      // };
    });
  }

  back() {
    this.router.navigateByUrl('/contact');
  }
}
