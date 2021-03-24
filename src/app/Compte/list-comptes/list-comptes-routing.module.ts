import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComptesPage } from './list-comptes.page';

const routes: Routes = [
  {
    path: '',
    component: ListComptesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListComptesPageRoutingModule {}
