import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Animations } from '@core/animations';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthService } from '@core/auth/auth.service';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { environment } from 'environments/environment';
import { IAPIResponse } from '@core/services/api/types/api-response.type';
import { Observable } from 'rxjs';
import { IUser } from 'app/common/types/models.type';
import { AlertComponent } from '@core/components/alert/alert.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  animations: Animations,
  imports: [
    AlertComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    CommonModule,
    AuthCardComponent,
    NgOptimizedImage
  ]
})
export class AuthSignUpComponent {
  #formBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  currentStep = 1;
  signUpForm: FormGroup;
  signUp$: Observable<IAPIResponse<IUser>>;

  constructor() {
    this.signUpForm = this.#formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      phone_number: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', [Validators.required]]
    });
  }

  onSignUp(): void {
    if (this.signUpForm.invalid) return;
    this.signUpForm.disable();
    this.signUp$ = this.#authService.signUp(this.signUpForm.value);
    this.signUpForm.enable();
  }

  signUpWithGoogle(): void {
    window.location.replace(environment.apiUrl + 'auth/sign-in');
  }
}
