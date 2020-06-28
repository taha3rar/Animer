import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { defaultValues } from '@app/shared/helpers/default_values';
import swal from 'sweetalert';
import { FilterPipe } from '@app/shared/pipes/filter.pipe';

export class ListOptions {
  deleteText?: string;
  pageName?: string;
}

@Component({
  selector: 'app-base-list',
  template: '',
  providers: [FilterPipe]
})
export class BaseListComponent implements OnInit {
  itemsPerPage = defaultValues.items_per_page;
  currentPage = 1;
  pageName: string;

  constructor(protected router?: Router, private options?: ListOptions) {
    this.pageName = options ? options.pageName : '';
    this.currentPage = this.getCurrentPage(this.pageName);
  }

  ngOnInit() {}

  delete(id: string) {
    throw new Error('Not implemented method');
  }

  warning(id: string) {
    swal({
      title: 'Are you sure?',
      text: this.options.deleteText,
      icon: 'warning',
      buttons: ['Cancel', 'OK']
    }).then((willDelete: boolean) => {
      if (willDelete) {
        this.delete(id);
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    if (!a) {
      return 1;
    } else if (!b) {
      return -1;
    } else {
      return typeof a === 'number' && typeof b === 'number'
        ? (a < b ? -1 : 1) * (isAsc ? 1 : -1)
        : (a.toString().toLowerCase() < b.toString().toLowerCase() ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }

  getCurrentPage(pageName: string): number {
    const actualPage = localStorage.getItem(`${this.pageName}-current-page`);

    if (actualPage) {
      return parseInt(actualPage, 10);
    }

    return 1;
  }

  pageChanged(page: number) {
    this.currentPage = page;
    localStorage.setItem(`${this.pageName}-current-page`, page.toString());
  }
}
