import { Component } from '@angular/core';

@Component({
  selector: 'app-base-navigation',
  template: ''
})
export class BaseNavigationComponent {
  page = 1;
  page2 = 1;

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

  onNextPage2(clientsnumber: number, itemsPerPage: number) {
    const numberOfPages = Math.ceil(clientsnumber / itemsPerPage);
    if (this.page2 < numberOfPages) {
      this.page2++;
    }
  }

  onBackPage2() {
    if (this.page2 > 1) {
      this.page2--;
    }
  }
}
