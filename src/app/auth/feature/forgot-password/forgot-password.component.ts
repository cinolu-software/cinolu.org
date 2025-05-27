import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthCardComponent } from '../../ui/auth-card/auth-card.component';
import { Observable } from 'rxjs';
import { AuthService } from '../../data-access/auth.service';
import { InputText } from 'primeng/inputtext';
import {} from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, InputText, RouterModule, CommonModule, AuthCardComponent],
})
export class AuthForgotPasswordComponent {
  #formBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  forgotPasswordForm: FormGroup;
  forgotPassword$: Observable<IAPIResponse<void>> | undefined;

  constructor() {
    this.forgotPasswordForm = this.#formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submitForgotPassword(): void {
    if (!this.forgotPasswordForm.invalid) {
      this.forgotPassword$ = this.#authService.forgotPassword(this.forgotPasswordForm.value);
    }
  }
}
