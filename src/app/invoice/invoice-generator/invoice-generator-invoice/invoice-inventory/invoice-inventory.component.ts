import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@app/core/models/product';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AuthenticationService, ProductService } from '@app/core';
import { EcosystemAddClientComponent } from '@app/ecosystem/ecosystem-add-client/ecosystem-add-client.component';

@Component({
  selector: 'app-invoice-inventory',
  templateUrl: './invoice-inventory.component.html',
  styleUrls: ['./invoice-inventory.component.scss']
})
export class InvoiceInventoryComponent implements OnInit {
  products: Product[];
  productChoice: Product[] = [];
  @Input()
  form: FormGroup;
  @Input()
  productList: any[];

  constructor(
    private authenticationService: AuthenticationService,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<InvoiceInventoryComponent>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.products = this.route.snapshot.data['products'];
    // this.productService.getByUser(this.authenticationService.currentUserId)
    //   .subscribe(data => {
    //     this.products = data;
    //     console.log(data);
    //   })
    // console.log(this.products);
    this.products.forEach(product => {
      product['quantityMax'] = product.quantity;
      product.quantity = 0;
      product.total_price = 0;
    });
  }

  incrementQ(product: any) {
    if (product.quantity === 0) {
      this.productChoice.push(product);
    }
    if (product.quantity <= product.quantityMax) {
      product.quantity += 1;
    } else {
      product.quantity = product.quantityMax;
    }
  }
  decrementQ(product: any) {
    if (product.quantity > 0) {
      product.quantity -= 1;
    } else {
      product.quantity = 0;
    }
    if (product.quantity === 0) {
      this.productChoice.splice(this.productList.indexOf(product), 1);
    }
  }

  existenceProduct() {
    return this.productChoice.length < 1;
  }

  addProducts() {
    this.productList = this.productList.concat(this.productChoice);
    console.log(this.productList);
    this.ngOnInit();
  }
}
