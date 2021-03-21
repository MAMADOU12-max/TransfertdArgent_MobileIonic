import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TouteslesTransactionsPageRoutingModule } from './toutesles-transactions-routing.module';

import { TouteslesTransactionsPage } from './toutesles-transactions.page';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TouteslesTransactionsPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [TouteslesTransactionsPage]
})
export class TouteslesTransactionsPageModule {}
