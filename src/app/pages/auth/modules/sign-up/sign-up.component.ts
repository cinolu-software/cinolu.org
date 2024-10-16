import { Component, inject, OnInit } from '@angular/core';
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
import { environment } from 'environments/environment';
import { team } from 'app/pages/landing/utils/data/team';
import { AuthService } from '../../auth.service';

@Component({
  standalone: true,
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  animations: fuseAnimations,
  imports: [
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
    CommonModule
  ]
})
export class AuthSignUpComponent implements OnInit {
  #formBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  team = team;
  signUpForm: FormGroup;
  signUp = this.#authService.signUp();

  ngOnInit(): void {
    this.signUpForm = this.#formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone_number: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', [Validators.required]]
    });
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
