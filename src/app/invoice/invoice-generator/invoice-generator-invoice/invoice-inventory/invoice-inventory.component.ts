import { Component, OnInit, Input, destroyPlatform } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@app/core/models/product';
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
  productList: Product[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.products = this.route.snapshot.data['products'];
    this.products.forEach(product => {
      product['quantityMax'] = product.quantity;
      product.quantity = 0;
      product.total_price = 0;
    });
    console.log(this.products);
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
    this.ngOnInit();
  }
}
