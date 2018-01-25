
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app.components/auth/login/login.component';
import { TransactionCreateComponent } from '../app.components/transaction/transaction-create/transaction-create.component';
import { TransactionListComponent } from '../app.components/transaction/transaction-list/transaction-list.component';
import { DashboardComponent } from '../app.components/dashboard/dashboard.component';

import { TransitionConfirmComponent } from '../app.components/transaction/transition-confirm/transition-confirm.component';

import { SearchComponent } from '../app.components/search/search.component';
import { AccountComponent } from '../app.components/account/account.component';

import { TransactionViewComponent } from '../app.components/transaction/transaction-view/transaction-view.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'transferencia', component: TransactionListComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transferencia/novo/confirmacao', component: TransitionConfirmComponent},
  { path: 'pesquisa', component: SearchComponent },
  { path: 'conta', component: AccountComponent },
  { path: 'transferencia/novo', component: TransactionCreateComponent },
  { path: 'transferencia/visualizar/:idTransf', component: TransactionViewComponent}

];

export const routing = RouterModule.forRoot(routes) 