import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TouteslestransactionsPageRoutingModule } from './touteslestransactions-routing.module';

import { TouteslestransactionsPage } from './touteslestransactions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TouteslestransactionsPageRoutingModule
  ],
  declarations: [TouteslestransactionsPage]
})
export class TouteslestransactionsPageModule {}
