import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../../services/transaction.service';

@Component({
  selector: 'app-mes-transactions',
  templateUrl: './mes-transactions.page.html',
  styleUrls: ['./mes-transactions.page.scss'],
})
export class MesTransactionsPage implements OnInit {

  mestransactions: any;
  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.transactionService.mesTransactions().subscribe(data => {
      this.mestransactions = data;
    });
  }

}
