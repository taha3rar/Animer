import { Component, OnInit, ElementRef, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/core/models/user/user';
import { defaultValues } from '@app/shared/helpers/default_values';

export class Counter {
  documents: number;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  user: User;
  documents: any[];
  counter: Counter = new Counter();
  @ViewChildren('tabs')
  tabs: ElementRef;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({ user, documents }) => {
      this.user = user;
      this.documents = documents;

      this.counter = {
        documents: this.documents.length
      };
    });
  }

  product_image() {
    return this.user.personal_information.profile_picture || defaultValues.profile_picture;
  }

  back() {
    this.router.navigateByUrl('/client');
  }
}
