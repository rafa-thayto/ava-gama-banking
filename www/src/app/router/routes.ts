
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app.components/auth/login/login.component';
import { TransactionCreateComponent } from '../app.components/transaction/transaction-create/transaction-create.component';
import { DashboardComponent } from '../app.components/dashboard/dashboard.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'transferencia', component: TransactionCreateComponent },
  { path: 'dashboard', component: DashboardComponent }
];

export const routing = RouterModule.forRoot(routes) 