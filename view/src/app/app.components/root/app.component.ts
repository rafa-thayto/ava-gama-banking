import { Component, AfterViewInit } from '@angular/core';
import { HeaderMenuComponent } from './../header-menu/header-menu.component';
import { AuthService } from '../../app.services/auth.service';
import 'rxjs/add/operator/delay';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  mainLoading: Element;
  constructor(private authService: AuthService) {
    this.mainLoading = document.querySelector('.loading');
  }
  ngAfterViewInit() {
    this.authService.token.first()
      .delay(1000)
      .do(() => this.hideMainLoading())
      .delay(500)
      .do(() => this.removeMainLoading())
      .subscribe(data => true);

  }
  private isMainsLoadingVisible = (): boolean => this.mainLoading.classList.contains('hide');
  private hideMainLoading = () => this.isMainsLoadingVisible() ? null : this.mainLoading.classList.add('hide');
  private showMainLoading = () => this.isMainsLoadingVisible() ? this.mainLoading.classList.remove('hide') : null;
  private removeMainLoading = () => this.mainLoading.remove();
}
