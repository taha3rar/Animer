import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from './../../shared/customization/ngb-date-parser-il-format';
import { AlertsService } from './../../core/alerts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateGoodsReceivedNoteDTO } from '@avenews/agt-sdk/lib/types/goods-receive-note';
import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '@avenews/agt-sdk';
import swal from 'sweetalert';
import { CanComponentDeactivate } from '@app/shared/guards/confirmation.guard';

@Component({
  selector: 'app-grn-generator',
  templateUrl: './grn-generator.component.html',
  styleUrls: ['./grn-generator.component.scss'],
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }],
})
export class GrnGeneratorComponent implements OnInit, CanComponentDeactivate {
  formDirty: boolean;
  formSubmitted: boolean;

  grn: CreateGoodsReceivedNoteDTO = {
    currency: undefined,
    issueDate: undefined,
    notes: undefined,
    paymentStatus: undefined,
    products: [],
    receivedBy: {
      businessName: undefined,
      name: undefined,
      phoneNumber: undefined,
      countryPhoneCode: undefined,
    },
    referenceCode: undefined,
    supplier: undefined,
    total: undefined,
  };

  constructor(private router: Router) {}

  ngOnInit() {}
  back() {
    this.router.navigate(['grn']);
  }

  confirm() {
    if (!this.formDirty || this.formSubmitted) {
      return true;
    }
    return swal({
      text: 'Are you sure you want to leave this page? All information will be lost!',
      buttons: ['Cancel', 'Yes'],
      icon: 'warning',
    }).then((value) => {
      if (value) {
        return true;
      } else {
        return false;
      }
    });
  }
}
