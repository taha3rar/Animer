import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultValues } from '@app/shared/helpers/default_values';
import { AuthenticationService } from '@app/core';
import { BaseListComponent } from '@app/shared/components/base-list/base-list.component';
import { Sort } from '@angular/material/sort';
import { FilterPipe } from '@app/shared/pipes/filter.pipe';
import { tooltips } from '@app/shared/helpers/tooltips/tootltips';
import { Contact } from '@avenews/agt-sdk';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  providers: [FilterPipe]
})
export class ContactListComponent extends BaseListComponent implements OnInit {
  contacts: Contact[];
  hasContacts: boolean;
  itemsPerPage = defaultValues.items_per_page;
  searchTerm: string;
  tooltips = tooltips.contacts.contacts_list;
  contact: Contact;
  edit = false;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    protected router: Router
  ) {
    super(undefined, {
      pageName: 'contacts'
    });
  }

  ngOnInit() {
    this.route.data.subscribe(({ contacts }) => {
      this.hasContacts = contacts.length > 0;
      this.contacts = contacts.slice();
    });
  }

  sortData(sort: Sort) {
    const data = this.contacts.slice();
    if (!sort.active || sort.direction === '') {
      this.contacts = data;
      return;
    }

    this.contacts = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return super.compare(a.numericId, b.numericId, isAsc);
        case 'contact':
          return super.compare(a.fullName, b.fullName, isAsc);
        case 'details':
          return super.compare(a.email, b.email, isAsc);
        case 'country':
          return super.compare(a.country, b.country, isAsc);
        default:
          return 0;
      }
    });
  }
  editContact(i: number) {
    this.edit = true;
    this.contact = this.contacts[i];
  }
  addContact() {
    this.edit = false;
  }
}