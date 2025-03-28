import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IUser } from 'app/shared/utils/types/models.type';
import { AuthCardComponent } from '../../ui/auth-card/auth-card.component';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { AuthService } from '../../data-access/auth.service';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, PasswordModule, CommonModule, AuthCardComponent]
})
export class AuthResetPasswordComponent {
  #token = inject(ActivatedRoute).snapshot.queryParams['token'];
  #formBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  resetPasswordForm: FormGroup;
  resetPassword$: Observable<IAPIResponse<IUser>>;

  constructor() {
    this.resetPasswordForm = this.#formBuilder.group({
      password: ['', Validators.required],
      password_confirm: ['', Validators.required]
    });
  }

  onResetPassword(): void {
    if (this.resetPasswordForm.invalid) return;
    this.resetPasswordForm.disable();
    const { password, password_confirm } = this.resetPasswordForm.value;
    const payload = { token: this.#token, password, password_confirm };
    this.resetPassword$ = this.#authService.resetPassword(payload);
    this.resetPasswordForm.enable();
  }
}
