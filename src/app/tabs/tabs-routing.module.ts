import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'home',
    // pathMatch: 'full',
    component: TabsPage,
    children: [
      // {
      //   path: '',
      //   loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      // },
      // {
      //   path: 'home',
      //   loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      // },
      {
        path: 'historique',
        loadChildren: () => import('../historique/historique.module').then(m => m.HistoriquePageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'calculator',
        loadChildren: () => import('../calculator/calculator.module').then(m => m.CalculatorPageModule)
      },
      {
        path: 'depot',
        loadChildren: () => import('../Transaction/depot/depot.module').then(m => m.DepotPageModule)
      },
      {
        path: 'retrait',
        loadChildren: () => import('../Transaction/retrait/retrait.module').then(m => m.RetraitPageModule)
      },
      {
        path: 'mes-transactions',
        loadChildren: () => import('../Transaction/mes-transactions/mes-transactions.module').then(m => m.MesTransactionsPageModule)
      },
      {
        path: 'toutesles-transactions',
        // tslint:disable-next-line:max-line-length
        loadChildren: () => import('../Transaction/toutesles-transactions/toutesles-transactions.module').then(m => m.TouteslesTransactionsPageModule)
      },
      {
        path: 'mes-commissions',
        loadChildren: () => import('../mes-commissions/mes-commissions.module').then( m => m.MesCommissionsPageModule)
      },
      // ,
      // {
      //   path: 'touteslestransactions',
      //   loadChildren: () => import('../touteslestransactions/touteslestransactions.module').then( m => m.TouteslestransactionsPageModule)
      // },
      {
        path: 'depot-compte',
        loadChildren: () => import('../depot-compte/depot-compte.module').then( m => m.DepotComptePageModule)
      },
      {
        path: 'add-user',
        loadChildren: () => import('../add-user/add-user.module').then( m => m.AddUserPageModule)
      },
      {
        path: 'detail-user/:id',
        loadChildren: () => import('../detail-user/detail-user.module').then( m => m.DetailUserPageModule)
      },
      {
        path: 'list-user',
        loadChildren: () => import('../list-user/list-user.module').then( m => m.ListUserPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
