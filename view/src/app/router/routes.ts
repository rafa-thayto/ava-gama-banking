
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app.components/auth/login/login.component';
import { TransactionCreateComponent } from '../app.components/transaction/transaction-create/transaction-create.component';
import { TransactionListComponent } from '../app.components/transaction/transaction-list/transaction-list.component';
import { DashboardComponent } from '../app.components/dashboard/dashboard.component';
import { SnackbarComponent } from '../app.components/snackbar/snackbar.component';

import { TransitionConfirmComponent } from '../app.components/transaction/transition-confirm/transition-confirm.component';

import { SearchComponent } from '../app.components/search/search.component';
import { AccountComponent } from '../app.components/account/account.component';

import { TransactionViewComponent } from '../app.components/transaction/transaction-view/transaction-view.component';
import { IsAuthenticatedGuard } from '../app.guards/is-authenticated.guard';
import { IsNotAuthenticatedGuard } from '../app.guards/is-not-authenticated.guard';
import { LogoutComponent } from '../app.components/auth/logout/logout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardComponent,
    canActivate: [IsAuthenticatedGuard]
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [IsAuthenticatedGuard]
  }, {
    path: 'transferencias',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: TransactionListComponent,
        canActivate: [IsAuthenticatedGuard]
      }, {
        path: 'nova',
        component: TransactionCreateComponent,
        canActivate: [IsAuthenticatedGuard]
      }, {
        path: ':id',
        component: TransactionViewComponent,
        canActivate: [IsAuthenticatedGuard]
      }
    ]
  }, {
    path: 'extrato',
    component: SearchComponent,
    canActivate: [IsAuthenticatedGuard]
  }, {
    path: 'conta',
    component: AccountComponent,
    canActivate: [IsAuthenticatedGuard]
  }, {
    path: 'snackbar',
    component: SnackbarComponent
  }, {
    path: "**",
    redirectTo: ""
  }
];

export const routing = RouterModule.forRoot(routes)
