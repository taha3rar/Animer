import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from './../../shared/customization/ngb-date-parser-il-format';
import { AlertsService } from './../../core/alerts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateGoodsReceivedNoteDTO } from '@avenews/agt-sdk/lib/types/goods-receive-note';
import { Component, OnInit } from '@angular/core';
import { Contact } from '@avenews/agt-sdk';

@Component({
  selector: 'app-grn-generator',
  templateUrl: './grn-generator.component.html',
  styleUrls: ['./grn-generator.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }]
})
export class GrnGeneratorComponent implements OnInit {
  canGoBack = true;
  grn: CreateGoodsReceivedNoteDTO = {
    currency: undefined,
    issueDate: undefined,
    notes: undefined,
    paymentStatus: undefined,
    products: [],
    receivedBy: {
      businessName: undefined,
      name: undefined,
      phoneNumber: undefined
    },
    referenceCode: undefined,
    supplier: undefined,
    total: undefined
  };

  constructor(private alerts: AlertsService, private router: Router) {}

  ngOnInit() {}
  back() {
    if (!this.canGoBack) {
      this.alerts.showAlertBack().then(val => {
        if (val) {
          this.router.navigate(['grn']);
        }
      });
    } else {
      this.router.navigate(['grn']);
    }
  }
}
