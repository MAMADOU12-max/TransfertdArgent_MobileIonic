import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../../../services/transaction.service';

@Component({
  selector: 'app-mes-transactions',
  templateUrl: './mes-transactions.page.html',
  styleUrls: ['./mes-transactions.page.scss'],
})
export class MesTransactionsPage implements OnInit {

  mestransactions: any;
  bulkEdit = false;
  sortDirection = false;
  sortDate = false;
  sortMontant = false;
  sortKey = null;
  edit = {};
  page = 1;
  perpage = 0;
  resultsCount = 10;
  totalData = 0;
  totalPages = 0;
  transData: any;
  constructor(private transactionService: TransactionService) { }

    ngOnInit() {
        this.getmesTransactins();
    }
    getmesTransactins() {
          this.transactionService.mesTransactions().subscribe(data => {
            this.mestransactions = data;
            // console.log(this.mestransactions);

            // this.perpage = this.mestransactions.perpage;
            // console.log(this.perpage);
            // this.totalData = this.mestransactions.total;
            // this.totalPages = this.mestransactions.totalPages;
            // console.log(this.transData);
            // this.sort(valueA);
        });
    }

    sortBy(key) {
        // console.log(key);
        if (key === 'type') {
            this.sortKey = key;
            this.sortDirection  = !this.sortDirection;
            this.sort(this.sortDirection);
        } else if (key === 'date') {
            this.sortKey = key;
            this.sortDate  = !this.sortDate;
            this.sort(this.sortDate);
        } else if (key === 'montant') {
            // console.log(key);
            this.sortKey = key;
            this.sortMontant  = !this.sortMontant;
            // this.sort(this.sortMontant);
        }
    }

    sort(valueA) {
       if (valueA) {
          this.mestransactions = this.mestransactions.sort((a, b) => {
              // console.log(a);
              const valA = a[this.sortKey];
              const valB = b[this.sortKey];
              return valA.localeCompare(valB);
          });
       } else {
            // if (this.sortDirection === 2)
           this.mestransactions = this.mestransactions.sort((a, b) => {
               // console.log(a);
               const valA = a[this.sortKey];
               const valB = b[this.sortKey];
               return valB.localeCompare(valA);
           });
       }
    }

    // toggleBulkEdit() {
    //     this.bulkEdit = !this.bulkEdit;
    //     this.edit = {};
    // }
    //
    // bulkDelete() {
    //   console.log(this.edit);
    // }
    //
    // removeRow(i: number) {
    //     this.mestransactions.splice(i, 1);
    // }

    // @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;


    loadData(event) {
        setTimeout(() => {
          console.log('Done');
          event.target.complete();

          // App logic to determine if all data is loaded
          // and disable the infinite scroll
          // if (data.length == 1000) {
          //   event.target.disabled = true;
          // }
        }, 500);
    }

  // toggleInfiniteScroll() {
  //   this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  // }

}
