import { ProductQuantityPipe } from './../../../shared/pipes/product-quantity.pipe';
import { MultiProductPipe } from './../../../shared/pipes/multi-products.pipe';
import { BaseListComponent } from '@app/shared/components/base-list/base-list.component';
import { GoodsReceivedNote } from '@avenews/agt-sdk';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { defaultValues } from '@app/shared/helpers/default_values';
import { Sort } from '@angular/material';
declare const $: any;

@Component({
  selector: 'app-document-payment-documents',
  templateUrl: './document-payment-documents.component.html',
  styleUrls: ['./document-payment-documents.component.scss'],
})
export class DocumentPaymentDocumentsComponent extends BaseListComponent implements OnInit {
  itemsPerPage = defaultValues.items_per_page;
  searchTerm: string;
  grn: GoodsReceivedNote;
  index = 0;
  @Output() grnEmit = new EventEmitter<GoodsReceivedNote>();
  grns: GoodsReceivedNote[] = [];
  constructor(
    private route: ActivatedRoute,
    private multiProducts: MultiProductPipe,
    private quant: ProductQuantityPipe
  ) {
    super();
  }
  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.grns = data['grn'];
    });
  }

  onChooseDocument(id: number) {
    $('.mobile-list-wrapper #doc-row' + id).trigger('click');
  }
  sortData(sort: Sort) {
    const data = this.grns.slice();
    if (!sort.active || sort.direction === '') {
      this.grns = data;
      return;
    }

    this.grns = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return super.compare(a.numericId, b.numericId, isAsc);
        case 'contact':
          return super.compare(a.supplier.fullName, b.supplier.fullName, isAsc);
        case 'date':
          return super.compare(new Date(a.issueDate).getTime(), new Date(b.issueDate).getTime(), isAsc);
        case 'product':
          return super.compare(
            this.multiProducts.transform(a.products),
            this.multiProducts.transform(b.products),
            isAsc
          );
        case 'quantity':
          return super.compare(this.quant.transform(a.products), this.quant.transform(b.products), isAsc);
        case 'price':
          return super.compare(a.total, b.total, isAsc);
        case 'status':
          return super.compare(a.paymentStatus, b.paymentStatus, isAsc);
        default:
          return 0;
      }
    });
  }
  isPicked() {
    $('.form_radio').each((a: any, b: any) => {
      if ($(b).is(':checked')) {
        const grns = this.grns.filter((grn) => {
          return grn.paymentStatus !== 'paid';
        });
        this.grnEmit.emit(grns[a]);
        $('#next').click();
      }
    });
  }
  selected(e: boolean) {
    if (e) {
      this.onChooseDocument(this.index);
      $('#doc-row' + this.index).trigger('click');
    }
  }
  viewGrn(grn: GoodsReceivedNote, i: number) {
    this.index = i;
    this.grn = grn;
    $('#grnClick').trigger('click');
  }
}
