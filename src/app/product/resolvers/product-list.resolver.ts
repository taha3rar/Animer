import { Injectable } from '@angular/core';
import { AuthenticationService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '@app/core/models/user/user';
import { ProductService } from '@app/core/api/product.service';
import { Resolve } from '@angular/router';

@Injectable()
export class ProductListResolver implements Resolve<User[]> {
  constructor(private authService: AuthenticationService, private productService: ProductService) {}

  resolve(): Observable<User[]> {
    const currentUserId = this.authService.currentUserId;

    return this.productService.getByUser(currentUserId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
