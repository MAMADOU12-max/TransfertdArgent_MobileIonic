import {Component, OnInit} from '@angular/core';
import {TransactionService} from '../../../services/transaction.service';
import {LoadingController, ModalController} from '@ionic/angular';
import {DetailTransactionPage} from '../../IonicModal/detail-transaction/detail-transaction.page';

@Component({
  selector: 'app-toutesles-transactions',
  templateUrl: './toutesles-transactions.page.html',
  styleUrls: ['./toutesles-transactions.page.scss'],
})
export class TouteslesTransactionsPage implements OnInit {

  constructor(private transactionService: TransactionService, public modalController: ModalController,
              private loadingController: LoadingController) { }

    datapassed: any;
    alltransactions: any;
    transaction: any;
    alltrans = true;
    transactionSelected = false;
    action = false;
    sortDate = false;
    sortUser = false;
    sortType = false;
    sortMontant = false;
    sortFrais = false;
    sortKey = null;
    search: any;
    usersSearch: any;
    // pagination
    page: number | undefined = 1;
    totalUsers: number | undefined;
    key = 'username';
    reverse = false;

    ngOnInit() {
       this.listTransactions();
    }

    async listTransactions() {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'chargement ...'
      });
      await loading.present();
      this.transactionService.touteslesTransactions().subscribe(data => {
        this.alltransactions = data;
        loading.dismiss();
        this.totalUsers = this.alltransactions.length ;
        // console.log(this.alltransactions);
      });
    }

    completeAction(){ this.action = !this.action; }

    sortBy(key) {
      // console.log(key);
      if (key === 'date') {
        this.sortKey = key;
        this.sortDate  = !this.sortDate;
        // this.sortDateFunction(this.sortDate);
      } else if (key === 'type') {
         this.sortKey = key;
         this.sortType  = !this.sortType;
         this.sort(this.sortType);
      } else if (key === 'montant') {
        this.sortKey = key;
        this.sortMontant  = !this.sortMontant;
        this.sortNumber(this.sortMontant);
      } else if (key === 'frais') {
        this.sortKey = key;
        this.sortFrais  = !this.sortFrais;
        this.sortNumber(this.sortFrais);
      }
    }

    sort(valueA) {
      if (valueA) {
        this.alltransactions = this.alltransactions.sort((a, b) => {
          // console.log(a);
          const valA = a[this.sortKey];
          const valB = b[this.sortKey];
          return valA.localeCompare(valB);
        });
      } else {
        this.alltransactions = this.alltransactions.sort((a, b) => {
          // console.log(a);
          const valA = a[this.sortKey];
          const valB = b[this.sortKey];
          return valB.localeCompare(valA);
        });
      }
    }

    sortNumber(valueA) {
       const a = 2;
       // @ts-ignore
       // console.log(a.toString());
       if (valueA) {
           // tslint:disable-next-line:no-shadowed-variable
          this.alltransactions = this.alltransactions.sort((a, b) => {
              // console.log(a);
              const valA = a[this.sortKey];
              const valB = b[this.sortKey];
              return valA.toString().localeCompare(valB.toString());
          });
      } else {
          // tslint:disable-next-line:no-shadowed-variable
          this.alltransactions = this.alltransactions.sort((a, b) => {
              const valA = a[this.sortKey];
              const valB = b[this.sortKey];
              return valB.toString().localeCompare(valA.toString());
          });
      }
    }

    sortDateFunction(valueA) {
      if (valueA) {
        // tslint:disable-next-line:no-shadowed-variable
        this.alltransactions = this.alltransactions.slice().sort((a, b) =>
          // console.log(a);
             a[this.sortKey] - b[this.sortKey]
        );

        return this.alltransactions;
        console.log(this.alltransactions);
      }
      // else {
      //   // tslint:disable-next-line:no-shadowed-variable
      //   this.alltransactions = this.alltransactions.sort((a, b) => {
      //     const valA = a[this.sortKey];
      //     const valB = b[this.sortKey];
      //     return valB.toString().localeCompare(valA.toString());
      //   });
      // }
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

    // search function
     async togeDetailtransaction(){
         const loading = await this.loadingController.create({
           cssClass: 'my-custom-class',
           message: 'chargement ...'
         });
         await loading.present();
         this.transactionService.getNocontroltransaction(this.search ).subscribe( data => {
              this.transaction = data;
              this.presentModal(this.transaction);
              loading.dismiss();
              // console.log(data);
          }, error => {
              console.log(error);
              loading.dismiss();
          });
    }
    async rowselect(code: number) {
        const loading = await this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'chargement ...'
        });
        await loading.present();
        this.transactionService.getNocontroltransaction(code).subscribe( data => {
          this.transaction = data;
          this.presentModal(this.transaction);
          loading.dismiss();
          // console.log(data);
        }, error => {
          console.log(error);
          loading.dismiss();
        });
    }


}
