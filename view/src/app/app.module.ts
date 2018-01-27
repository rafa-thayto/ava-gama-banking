import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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




import { CurrencyMaskModule } from "ng2-currency-mask";
import { SearchComponent } from './app.components/search/search.component';
// import { MaterializeModule } from 'angular2-materialize';
import { TransitionConfirmComponent } from './app.components/transaction/transition-confirm/transition-confirm.component';
import { TextMaskModule } from 'angular2-text-mask';

import { AccountService } from '../app/app.services/account.service';
import { SecretkeyComponent } from './app.components/auth/secret-key/secretkey.component';

import { TransactionService } from './app.services/transaction.service';
import { AuthService } from './app.services/auth.service';
import { ClientService } from './app.services/client.service';
import { TokenInterceptor } from './app.interceptors/token.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IsAuthenticatedGuard } from './app.guards/is-authenticated.guard';
import { NavbarService } from './app.services/navbar.service';

import { FlexLayoutModule } from '@angular/flex-layout'

/**
 * material components
 *
 */
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IsNotAuthenticatedGuard } from './app.guards/is-not-authenticated.guard';

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
    TransitionConfirmComponent,
    SecretkeyComponent,

  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TextMaskModule,
    // MaterializeModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatDatepickerModule,
    CurrencyMaskModule

  ],

  providers: [

    AccountService,
    TokenInterceptor, //TODO: not working
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService,
    ClientService,
    TransactionService,
    NavbarService,
    //guards
    IsNotAuthenticatedGuard,
    IsAuthenticatedGuard,
  ],


  bootstrap: [AppComponent]
})
export class AppModule { }
