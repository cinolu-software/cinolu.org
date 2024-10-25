import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent } from '@fuse/components/alert';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AuthService } from '../../auth.service';
import { AuthCardComponent } from '../../slots/auth-card/auth-card.component';
import { environment } from '../../../../../environments/environment';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  standalone: true,
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  animations: fuseAnimations,
  imports: [
    MatProgressBar,
    RouterLink,
    FuseAlertComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    NgOptimizedImage,
    CommonModule,
    AuthCardComponent
  ]
})
export class AuthSignUpComponent {
  #formBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  currentStep = 1;
  signUpForm: FormGroup;
  signUp = this.#authService.signUp();

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

  goToStep(step: number): void {
    this.currentStep = step;
  }

  goToNextStep(): void {
    if (this.currentStep === 3) return;
    this.goToStep(this.currentStep + 1);
  }

  goToPreviousStep(): void {
    if (this.currentStep === 1) return;
    this.goToStep(this.currentStep - 1);
  }

  onSignUp(): void {
    if (this.signUpForm.invalid) return;
    this.signUpForm.disable();
    this.signUp.mutate(this.signUpForm.value);
    this.signUpForm.enable();
  }

  signUpWithGoogle(): void {
    window.location.replace(environment.apiUrl + 'auth/sign-up');
  }
}
