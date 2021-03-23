import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAgencePage } from './add-agence.page';

const routes: Routes = [
  {
    path: '',
    component: AddAgencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAgencePageRoutingModule {}
