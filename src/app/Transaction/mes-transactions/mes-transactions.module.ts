import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesTransactionsPageRoutingModule } from './mes-transactions-routing.module';

import { MesTransactionsPage } from './mes-transactions.page';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesTransactionsPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [MesTransactionsPage]
})
export class MesTransactionsPageModule {}
