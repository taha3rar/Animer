import { Injectable } from '@angular/core';
import { AuthenticationService, ProductService } from '@app/core';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve } from '@angular/router';
import { Product } from '@app/core/models/product';

@Injectable()
export class ProductCurrentUserResolver implements Resolve<Product[]> {
  constructor(private authService: AuthenticationService, private productService: ProductService) {}

  resolve(): Observable<Product[]> {
    const currentUserId = this.authService.currentUserId;
    console.log(currentUserId);
    console.log(this.productService.getByUser(currentUserId));

    return this.productService.getByUser(currentUserId).pipe(
      catchError(err => {
        console.error(err);
        return EMPTY.pipe();
      })
    );
  }
}
