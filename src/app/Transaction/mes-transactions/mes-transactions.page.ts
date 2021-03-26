import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../../../services/transaction.service';
import {LoadingController, ModalController} from '@ionic/angular';
import {DetailTransactionPage} from '../../IonicModal/detail-transaction/detail-transaction.page';

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
  perpage = 0;
  resultsCount = 10;
  totalData = 0;
  totalPages = 0;
  transData: any;
  // pagination
  page: number | undefined = 1;
  totalTransactions: number | undefined;
  constructor(private transactionService: TransactionService, private loadingController: LoadingController,
              private modalController: ModalController) { }

    ngOnInit() {
        this.getmesTransactins();
    }
    async getmesTransactins() {
        const loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'chargement ...'
        });
        await loading.present();
        this.transactionService.mesTransactions().subscribe(data => {
          this.mestransactions = data;
          this.totalTransactions = this.mestransactions.length;
          loading.dismiss();
          // console.log(this.mestransactions);

          // this.perpage = this.mestransactions.perpage;
          // console.log(this.perpage);
          // this.totalData = this.mestransactions.total;
          // this.totalPages = this.mestransactions.totalPages;
          // console.log(this.transData);
          // this.sort(valueA);
      }, error => {
          loading.dismiss();
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

    async presentModal(data: any) {
      const modal = await this.modalController.create({
        component: DetailTransactionPage,
        cssClass: 'my-custom-class',
        componentProps: {
          datapassed: data,
        }
      });
      return await modal.present();
    }

    async rowselect(code: number) {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'chargement ...'
      });
      await loading.present();
      this.transactionService.getNocontroltransaction(code).subscribe( data => {
        const transaction = data;
        this.presentModal(transaction);
        loading.dismiss();
        // console.log(data);
      }, error => {
        console.log(error);
        loading.dismiss();
      });
    }

}
