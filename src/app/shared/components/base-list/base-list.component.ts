import { Component, OnInit } from '@angular/core';
import { BaseService } from '@app/core/api/base.service';
import { Router } from '@angular/router';
import { defaultValues } from '@app/shared/helpers/default_values';
import { AuthenticationService } from '@app/core';
import swal from 'sweetalert';

export class ListOptions {
  deleteText: string;
}

@Component({
  selector: 'app-base-list',
  template: ''
})
export class BaseListComponent implements OnInit {
  itemsPerPage = defaultValues.items_per_page;
  usersWhiteList = ['bendemoseller@gmail.com', 'ishai@avenews-gt.com', 'javier@avenews-gt.com'];

  constructor(private service: BaseService, protected router: Router, private options: ListOptions) {}

  ngOnInit() {}

  delete(id: string) {
    this.service.delete(id).subscribe(
      () => {
        this.router.navigate([this.router.url]);
      },
      err => {
        console.log(err);
      }
    );
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
}
