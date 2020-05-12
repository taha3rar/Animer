import { Component, OnInit, ElementRef, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '@avenews/agt-sdk';
import { GoodsReceivedNote } from '@avenews/agt-sdk/lib/types/goods-receive-note';

export class Counter {
  documents: number;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contact: Contact;
  grnList: GoodsReceivedNote[] = [];
  documents: any[];
  counter: Counter = new Counter();
  @ViewChildren('tabs')
  tabs: ElementRef;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({ contact, grn }) => {
      this.grnList = grn;
      this.contact = contact;
      // documents
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
