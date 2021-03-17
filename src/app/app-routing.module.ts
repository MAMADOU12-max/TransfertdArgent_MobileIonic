import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'header',
    loadChildren: () => import('./header/header.module').then( m => m.HeaderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'calculator',
    loadChildren: () => import('./calculator/calculator.module').then( m => m.CalculatorPageModule)
  },
  {
    path: 'depot',
    loadChildren: () => import('./depot/depot.module').then( m => m.DepotPageModule)
  },
  {
    path: 'historique',
    loadChildren: () => import('./historique/historique.module').then( m => m.HistoriquePageModule)
  },
  {
    path: 'retrait',
    loadChildren: () => import('./retrait/retrait.module').then( m => m.RetraitPageModule)
  },
  {
    path: 'mes-transactions',
    loadChildren: () => import('./mes-transactions/mes-transactions.module').then( m => m.MesTransactionsPageModule)
  },
  {
    path: 'toutesles-transactions',
    loadChildren: () => import('./toutesles-transactions/toutesles-transactions.module').then( m => m.TouteslesTransactionsPageModule)
  },
  {
    path: 'mes-commissions',
    loadChildren: () => import('./mes-commissions/mes-commissions.module').then( m => m.MesCommissionsPageModule)
  },
  {
    path: 'touteslestransactions',
    loadChildren: () => import('./touteslestransactions/touteslestransactions.module').then( m => m.TouteslestransactionsPageModule)
  },
  {
    path: 'depot-compte',
    loadChildren: () => import('./depot-compte/depot-compte.module').then( m => m.DepotComptePageModule)
  },
  {
    path: 'homepage',
    loadChildren: () => import('./homepage/homepage.module').then( m => m.HomepagePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
