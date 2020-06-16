import { DPOAccount, DPOWallet, DPOTransaction } from '@avenews/agt-sdk';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { defaultValues } from '@app/shared/helpers/default_values';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.scss']
})
export class PaymentsListComponent implements OnInit {
  availablePayments = true;
  dpoAccount: DPOAccount;
  wallet: DPOWallet;
  transactions: DPOTransaction[];
  topUpApproved = false;
  itemsPerPage = defaultValues.items_per_page;
  searchTerm: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(({ account, wallet, transactions }) => {
      this.dpoAccount = account;
      this.wallet = wallet;
      this.transactions = transactions;

      if (
        this.dpoAccount &&
        this.dpoAccount.status === 'approved' &&
        this.wallet &&
        this.wallet.firstTopUpStatus === 'approved'
      ) {
        this.topUpApproved = true;
      }
    });
  }

  topup(e: any) {
    this.router.navigateByUrl('payments');
  }

  getTxContact(tx: DPOTransaction) {
    if (tx.type === 'payment') {
      const contact = tx.contact || (tx.goodsReceivedNote && tx.goodsReceivedNote.supplier);

      if (contact) {
        return contact.fullName;
      }
    }

    return 'N/A';
  }

  getTxType(tx: DPOTransaction) {
    if (tx.type === 'payment') {
      if (tx.contact) {
        return 'Contact';
      } else if (tx.goodsReceivedNote) {
        return 'Trade Document';
      }
    } else if (tx.type === 'topup') {
      return 'Topup';
    }

    return 'N/A';
  }
}
