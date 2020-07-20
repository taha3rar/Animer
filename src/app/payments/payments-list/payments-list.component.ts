import { DPOAccount, DPOWallet, DPOTransaction, GoodsReceivedNote } from '@avenews/agt-sdk';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { defaultValues } from '@app/shared/helpers/default_values';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.scss'],
})
export class PaymentsListComponent implements OnInit {
  availablePayments = true;
  dpoAccount: DPOAccount;
  wallet: DPOWallet;
  transactions: DPOTransaction[];
  topUpApproved = false;
  currentPage = [1, 1];
  grns: GoodsReceivedNote[];
  itemsPerPage = [defaultValues.items_per_page, defaultValues.items_per_page];
  searchTerm: string;
  searchPlaceholder = 'Search payments...';
  payments: DPOTransaction[];
  topups: DPOTransaction[];
  listTitle = 'Payments History';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.data.subscribe(({ account, wallet, transactions, grns }) => {
      this.dpoAccount = account;
      this.wallet = wallet;
      this.transactions = transactions;
      this.grns = grns;
      if (
        this.dpoAccount &&
        this.dpoAccount.status === 'approved' &&
        this.wallet &&
        this.wallet.firstTopUpStatus === 'approved'
      ) {
        this.topUpApproved = true;
      }

      if (this.transactions.length > 0) {
        this.topups = transactions.filter((t: DPOTransaction) => {
          return t.type === 'topup';
        });
        this.payments = transactions.filter((t: DPOTransaction) => {
          return t.type === 'payment';
        });
      }
    });
  }

  topup(e: any) {
    this.router.navigateByUrl('payments');
  }

  getTxContact(tx: DPOTransaction) {
    if (tx.type === 'payment') {
      const contact = tx.contact || (tx.goodsReceivedNote && tx.goodsReceivedNote.supplier);

      if (contact && contact.fullName) {
        return contact.fullName;
      } else {
        const index = this.grns.findIndex((grn: any) => {
          return tx.goodsReceivedNote === grn._id; // temporary fix
        });
        return this.grns[index].supplier.fullName;
      }
    }

    return 'N/A';
  }

  toggleTitle(event: any) {
    if (event === 0) {
      this.listTitle = 'Payments History';
      this.searchPlaceholder = 'Search payments...';
    } else {
      this.listTitle = 'Top-ups History';
      this.searchPlaceholder = 'Search top-up...';
    }
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
  pageChanged(page: number, i: number) {
    this.currentPage[i] = page;
  }
  paymentView(id: string) {
    this.router.navigate(['/payments/payment', id]);
  }
}
