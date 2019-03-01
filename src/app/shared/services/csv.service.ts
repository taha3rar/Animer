import { Injectable } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  constructor(private datePipe: DatePipe) {}

  generateAndDownload(objects: any[], headers: any, filename: string) {
    const today = this.datePipe.transform(Date.now(), 'dd_MM_yyyy_hh::mm');

    objects.unshift(headers);

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showTitle: false,
      title: `${filename} ${today}`,
      useTextFile: false,
      useBom: true,
      filename: `${today}_${filename}`,
      useKeysAsHeaders: false
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(objects);
  }

  getInvoicesForPayment(invoices: any) {
    const today = this.datePipe.transform(Date.now(), 'ddMMyyyy');
    let totalAmounts = 0;
    const exportedData = [
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
    for (const row of invoices) {
      if (row.total_due > 0) {
        exportedData.push({ id: 3, amount: row.total_due, number: row.seller.phone_number });
        i++;
      }
    }

    // Get total sum of amounts
    for (let n = 2; n < exportedData.length; n++) {
      totalAmounts += parseFloat(exportedData[n].amount);
    }
    // Add last information needed
    exportedData.push({ id: 9, amount: exportedData.length.toString(), number: totalAmounts.toString() });
    this.export(exportedData);
  }

  export(data: any) {
    const today = this.datePipe.transform(Date.now(), 'dd-MM-yyyy');

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
