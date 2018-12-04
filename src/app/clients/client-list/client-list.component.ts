import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/core/models/user/user';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  clients: User[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({ clients }) => {
      this.clients = clients;
    });
  }
}
