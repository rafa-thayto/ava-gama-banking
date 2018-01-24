
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app.components/auth/login/login.component';
import { TransactionCreateComponent } from '../app.components/transaction/transaction-create/transaction-create.component';
import { TransactionListComponent } from '../app.components/transaction/transaction-list/transaction-list.component';
import { DashboardComponent } from '../app.components/dashboard/dashboard.component';
import { SearchComponent } from '../app.components/search/search.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'transferencia', component: TransactionListComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transferencia/novo', component: TransactionCreateComponent },
  { path: 'search', component: SearchComponent }
];

export const routing = RouterModule.forRoot(routes) 