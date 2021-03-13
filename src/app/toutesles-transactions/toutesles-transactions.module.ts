import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TouteslesTransactionsPageRoutingModule } from './toutesles-transactions-routing.module';

import { TouteslesTransactionsPage } from './toutesles-transactions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TouteslesTransactionsPageRoutingModule
  ],
  declarations: [TouteslesTransactionsPage]
})
export class TouteslesTransactionsPageModule {}
