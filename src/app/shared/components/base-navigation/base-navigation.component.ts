import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-navigation',
  template: ''
})
export class BaseNavigationComponent {
  page = 1;

  onNextPage(clientsnumber: number, itemsPerPage: number) {
    const numberOfPages = Math.ceil(clientsnumber / itemsPerPage);
    if (this.page < numberOfPages) {
      this.page++;
    }
  }

  onBackPage() {
    if (this.page > 1) {
      this.page--;
    }
  }
}
