import { AuthenticationService } from '@app/core/authentication/authentication.service';

import { Injectable } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';
import { DatePipe } from '@angular/common';
import { InvoiceService } from '@app/core';
import * as math from 'mathjs';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  constructor(
    private datePipe: DatePipe,
    private invoiceService: InvoiceService,
    private authService: AuthenticationService
  ) {}

  getInvoices(invoices: any) {
    const today = this.datePipe.transform(Date.now(), 'dd-MM-yyyy');
    let totalAmounts = 0;
    let exportedData = [
      {
        //   Required Header
        id: 1,
        amount: 'MPESA',
        number: today
      },
      {
        //   Bank account number
        id: 2,
        amount: '61569', // TODO: Get users bankaccount number
        number: ''
      }
    ];
    let i = 3;
    //   Get Total Due and mpesa phone number
    for (let row of invoices) {
      if (row.total_due > 0) {
        exportedData.push({ id: i, amount: row.total_due, number: row.seller.phone_number });
        i++;
      }
    }

    // Get total sum of amounts
    for (let n = 2; n < exportedData.length; n++) {
      totalAmounts += parseFloat(exportedData[n].amount);
    }
    // Add last information needed
    exportedData.push({ id: i, amount: exportedData.length.toString(), number: totalAmounts.toString() });
    this.export(exportedData);
  }

  export(data: any) {
    const today = this.datePipe.transform(Date.now(), 'dd-MM-yyyy');
    let exportData = [];

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showTitle: false,
      title: 'MPESA ' + today,
      useTextFile: false,
      useBom: true,
      filename: this.datePipe.transform(Date.now(), 'dd_MM_yyyy_hh::mm') + '_MPESA_Bulk_Disbursement',
      useKeysAsHeaders: false
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(data);
  }
}
