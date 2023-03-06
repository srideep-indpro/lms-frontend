import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  visible!: boolean;
  loginBtnVisible !: boolean;

  constructor() {
    this.visible = true;
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  toggle() {
    this.visible = !this.visible;
  }
}
