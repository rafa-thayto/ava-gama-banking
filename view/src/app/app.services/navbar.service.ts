import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {

  _show: boolean;
  // _showAutocomplete: boolean;
  // _title: string;
  // _subtitle: string;

  get isVisible(): boolean {
    return this._show;
  }
  get isHidden(): boolean {
    return !this.isVisible;
  }
  // get autocompleteIsVisible(): boolean {
  //   return this._showAutocomplete;
  // }
  // get autocompleteIsHidden(): boolean {
  //   return !this.autocompleteIsVisible;
  // }
  // get title(): string {
  //   return this._title;
  // }
  // set title(title: string) {
  //   if (this.title !== title) this._title = title;
  // }
  // get subtitle(): string {
  //   return this._subtitle;
  // }
  // set subtitle(subtitle: string) {
  //   if (this.subtitle !== subtitle) this._subtitle = subtitle;
  // }

  constructor() {
    this._show = true;
    // this._showAutocomplete = true;
    // this._title = null;
  }
  hide() {
    this._show = false;
  }
  show() {
    this._show = true;
  }
  toggle() {
    if (this.isVisible) this.show();
    else this.hide();
  }

  // showAutocomplete(): void {
  //   this._showAutocomplete = true;
  // }
  // hideAutocomplete(): void {
  //   this._showAutocomplete = false;
  // }

}
