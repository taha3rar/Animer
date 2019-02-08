import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '@app/core/models/user/client';
import { defaultValues } from '@app/shared/helpers/default_values';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  clients: Client[];
  page = 1;
  itemsPerPage = defaultValues.items_per_page;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({ clients }) => {
      this.clients = clients;
    });
  }
}
