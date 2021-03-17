import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../../services/transaction.service';

@Component({
  selector: 'app-toutesles-transactions',
  templateUrl: './toutesles-transactions.page.html',
  styleUrls: ['./toutesles-transactions.page.scss'],
})
export class TouteslesTransactionsPage implements OnInit {

  alltransactions: any;
  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.transactionService.touteslesTransactions().subscribe(data => {
      this.alltransactions = data;
    });
  }

}
