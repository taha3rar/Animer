import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Invoice } from '@app/core/models/order/invoice';
import { ActivatedRoute } from '@angular/router';
import * as BigUser from '@app/core/models/user/user';
import * as SmallUser from '@app/core/models/order/user';

@Component({
  selector: 'app-invoice-generator',
  templateUrl: './invoice-generator.component.html',
  styleUrls: ['./invoice-generator.component.scss']
})
export class InvoiceGeneratorComponent implements OnInit {
  invoice: Invoice;
  constructor(private location: Location, private route: ActivatedRoute) {}

  ngOnInit() {
    this.invoice = new Invoice();
    this.route.data.subscribe(({ seller }) => {
      this.invoice.seller = this.getSmallSeller(seller);
    });
  }

  getSmallSeller(seller: BigUser.User): SmallUser.User {
    return {
      _id: seller._id,
      numericId: seller.numericId,
      first_name: seller.personal_information.first_name,
      last_name: seller.personal_information.last_name,
      email: seller.email,
      company_name: seller.company_information.company_name,
      company_number: seller.company_information.company_registered_number,
      address: seller.company_information.street,
      city: seller.company_information.city,
      zipcode: seller.company_information.zipcode,
      phone_number: seller.personal_information.phone_number,
      contact_by: seller.contact_by
    };
  }

  back() {
    this.location.back();
  }
}
