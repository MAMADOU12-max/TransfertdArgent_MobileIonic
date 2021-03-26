import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListTarifsPage } from './list-tarifs.page';

const routes: Routes = [
  {
    path: '',
    component: ListTarifsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListTarifsPageRoutingModule {}
