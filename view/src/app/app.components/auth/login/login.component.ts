import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../app.services/auth.service';
import { NavbarService } from '../../../app.services/navbar.service';
import { OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  public error: string;
  public form: FormGroup;
  public passwordControl: FormControl;
  public cpfControl: FormControl;
  public maskCpf = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]

  constructor(private authService: AuthService, public navbarService: NavbarService, private router: Router) {
    // hideToolbar()
    this.navbarService.hide();
    this.createControls();
    this.createForm();
    this.setFormDefaultValue();
  }

  setFormDefaultValue() {
    this.cpfControl.setValue("00000000001");
    this.passwordControl.setValue("000001");
  }

  createCpfControl() {
    const syncValidators = [];
    syncValidators.push(Validators.required);
    //TODO: validators is CPF
    this.cpfControl = new FormControl('', syncValidators);
  }
  createPasswordControl() {
    const syncValidators = [];
    syncValidators.push(Validators.required);
    syncValidators.push(Validators.minLength(6));
    syncValidators.push(Validators.maxLength(25));
    this.passwordControl = new FormControl('', syncValidators);
  }
  createControls() {
    this.createCpfControl();
    this.createPasswordControl();
  }
  createForm() {
    const controls = { cpf: this.cpfControl, password: this.passwordControl };
    this.form = new FormGroup(controls);
  }
  login() {
    this.error = ''
    if (!this.form.valid) return
    let data = this.form.value;
    if (typeof data.cpf === 'string')
      data.cpf = parseInt(data.cpf.replace(/[^0-9]/g, ''));

    const onLoginSuccess = () => this.router.navigateByUrl('/');
    const onLoginError = (error: any) => this.error = 'usuário e/ou senha inválidos';
    this.authService.login(data.cpf, data.password).first().subscribe(onLoginSuccess, onLoginError);
  }

  ngOnDestroy() {
    this.navbarService.show();
  }

}
