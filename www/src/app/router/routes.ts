
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app.components/auth/login/login.component';
import { TransactionCreateComponent } from '../app.components/transaction/transaction-create/transaction-create.component';
import { TransactionListComponent } from '../app.components/transaction/transaction-list/transaction-list.component';
import { DashboardComponent } from '../app.components/dashboard/dashboard.component';
<<<<<<< HEAD
import { SearchComponent } from '../app.components/search/search.component';
=======
import { AccountComponent } from '../app.components/account/account.component';

>>>>>>> aa9642f3956beb446c91d3d8659dc11dc31fddd5
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'transferencia', component: TransactionListComponent },
  { path: 'dashboard', component: DashboardComponent },
<<<<<<< HEAD
  { path: 'transferencia/novo', component: TransactionCreateComponent },
  { path: 'search', component: SearchComponent }
=======
  { path: 'account', component: AccountComponent },
  { path: 'transferencia/novo', component: TransactionCreateComponent }
>>>>>>> aa9642f3956beb446c91d3d8659dc11dc31fddd5
];

export const routing = RouterModule.forRoot(routes) 