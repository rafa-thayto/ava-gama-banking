import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { routing } from './router/routes';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.components/root/app.component';
import { LoginComponent } from './app.components/auth/login/login.component';
import { TransactionListComponent } from './app.components/transaction/transaction-list/transaction-list.component';
import { TransactionCreateComponent } from './app.components/transaction/transaction-create/transaction-create.component';
import { TransactionCardComponent } from './app.components/transaction/transaction-card/transaction-card.component';
import { TransactionViewComponent } from './app.components/transaction/transaction-view/transaction-view.component';
import { BalanceComponent } from './app.components/balance/balance.component';
import { AccountComponent } from './app.components/account/account.component';
import { LogoutComponent } from './app.components/auth/logout/logout.component';
import { HeaderMenuComponent } from './app.components/header-menu/header-menu.component';
import { DashboardComponent } from './app.components/dashboard/dashboard.component';

import { SearchComponent } from './app.components/search/search.component';

import { TransitionConfirmComponent} from './app.components/transaction/transition-confirm/transition-confirm.component';
import { TextMaskModule } from 'angular2-text-mask';
/*import { MaterializeModule} from 'angular2-materialize';*/

import { AccountService } from '../app/app.services/account.service';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TransactionListComponent,
    TransactionCreateComponent,
    TransactionCardComponent,
    TransactionViewComponent,
    BalanceComponent,
    AccountComponent,
    LogoutComponent,
    HeaderMenuComponent,
    DashboardComponent,
    SearchComponent,
    TransitionConfirmComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    TextMaskModule,
  /*  MaterializeModule*/

  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
