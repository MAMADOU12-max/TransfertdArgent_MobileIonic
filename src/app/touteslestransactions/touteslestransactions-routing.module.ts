import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TouteslestransactionsPage } from './touteslestransactions.page';

const routes: Routes = [
  {
    path: '',
    component: TouteslestransactionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TouteslestransactionsPageRoutingModule {}
