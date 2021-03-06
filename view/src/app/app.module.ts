/* ANGULAR MODULES + ROUTER */
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { registerLocaleData } from "@angular/common";
import localePt from '@angular/common/locales/pt';
import { routing } from './router/routes';
registerLocaleData(localePt, 'pt')
/* END ANGULAR MODULES */

/* ~ MODULES ~ */
import { MaterialModule } from "./material.module";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { TextMaskModule } from 'angular2-text-mask';
import { MatSnackBarModule } from "@angular/material";

// import { MaterializeModule } from 'angular2-materialize';
/* ~ END MODULES ~ */

/* ~ COMPONENTS ~ */
// Root
import { AppComponent } from './app.components/root/app.component';

// Account
import { AccountComponent } from './app.components/account/account.component';

// Auth
import { LoginComponent } from './app.components/auth/login/login.component';
import { LogoutComponent } from './app.components/auth/logout/logout.component';
import { SecretkeyComponent } from './app.components/auth/secret-key/secretkey.component';

// Dashboard
import { DashboardComponent } from './app.components/dashboard/dashboard.component';

// Search
import { SearchComponent } from './app.components/search/search.component';

// Side-menu
import { SideMenuComponent } from './app.components/side-menu/side-menu.component';

// Transaction
import { TransactionCardComponent } from './app.components/transaction/transaction-card/transaction-card.component';
import { TransactionCreateComponent } from './app.components/transaction/transaction-create/transaction-create.component';
// import { TransactionListComponent } from './app.components/transaction/transaction-list/transaction-list.component';
import { TransactionViewComponent } from './app.components/transaction/transaction-view/transaction-view.component';
/* ~ END COMPONENTS ~ */

/* ~ SERVICES ~ */
import { AccountService } from '../app/app.services/account.service';
import { AuthService } from './app.services/auth.service';
import { ClientService } from './app.services/client.service';
import { NavbarService } from './app.services/navbar.service';
import { TransactionService } from './app.services/transaction.service';
import { SnackbarService } from './app.services/snackbar.service';
/* ~ END SERVICES ~ */

/* ~ INTERCEPTORS ~ */
import { TokenInterceptor } from './app.interceptors/token.interceptor';
/* ~ END INTERCEPTORS ~ */

/* ~ GUARDS ~ */
import { IsAuthenticatedGuard } from './app.guards/is-authenticated.guard';
import { IsNotAuthenticatedGuard } from './app.guards/is-not-authenticated.guard';
import { TransactionsModule } from './transactions/transactions.module';
import { TopBarComponent } from './app.components/topbar/topbar.component';
import { FiltersService } from './app.services/filters.service';
/* ~ END GUARDS ~ */

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // TransactionListComponent,
    TransactionCreateComponent,
    TransactionCardComponent,
    TransactionViewComponent,
    AccountComponent,
    LogoutComponent,
    SideMenuComponent,
    DashboardComponent,
    SearchComponent,
    SecretkeyComponent,
    TopBarComponent

  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TextMaskModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CurrencyMaskModule,
    MaterialModule,
    MatSnackBarModule
    // MaterializeModule,
    , TransactionsModule

  ],

  providers: [
    { provide: LOCALE_ID, useValue: 'pt'},
    AccountService,
    TokenInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService,
    ClientService,
    TransactionService,
    NavbarService,
    SnackbarService,
    FiltersService,
    //guards
    IsNotAuthenticatedGuard,
    IsAuthenticatedGuard,
  ],


  bootstrap: [AppComponent]
})
export class AppModule { }
