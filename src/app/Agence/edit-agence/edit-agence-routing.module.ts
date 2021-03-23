import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAgencePage } from './edit-agence.page';

const routes: Routes = [
  {
    path: '',
    component: EditAgencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAgencePageRoutingModule {}
