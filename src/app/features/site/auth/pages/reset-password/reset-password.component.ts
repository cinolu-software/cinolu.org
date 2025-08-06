import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { ResetPasswordStore } from '../../store/reset-password.store';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  providers: [ResetPasswordStore],
  imports: [FormsModule, RouterLink, ReactiveFormsModule, ButtonModule, PasswordModule, CommonModule, AuthCardComponent]
})
export class AuthResetPasswordComponent {
  #token = inject(ActivatedRoute).snapshot.queryParams['token'];
  #formBuilder = inject(FormBuilder);
  form: FormGroup;
  store = inject(ResetPasswordStore);

  constructor() {
    this.form = this.#formBuilder.group({
      password: ['', Validators.required],
      password_confirm: ['', Validators.required]
    });
  }

  onResetPassword(): void {
    if (this.form.invalid) return;
    this.form.disable();
    const { password, password_confirm } = this.form.value;
    const payload = { token: this.#token, password, password_confirm };
    this.store.resetPassword(payload);
    this.form.enable();
  }
}
