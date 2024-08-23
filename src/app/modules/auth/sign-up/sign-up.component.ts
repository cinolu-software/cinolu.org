import { Component, inject, ViewEncapsulation } from '@angular/core';
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
import { SignUpStore } from './data-access/sign-up.store';
import { Observable } from 'rxjs';
import { ISignUpStore } from './types/sign-up-store.interface';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from '../../../core/topbar/topbar.component';
import { IAPIValidationError } from 'app/core/types/api-validation-error.interface';
import { APIValiadationError } from '../../../core/pipes/api-validation-error.pipe';
import { environment } from 'environments/environment';

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  providers: [SignUpStore],
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
    CommonModule,
    MatStepperModule,
    TopbarComponent,
    APIValiadationError
  ]
})
export class AuthSignUpComponent {
  signUpForm: FormGroup;
  state$: Observable<ISignUpStore>;
  private _formBuilder = inject(FormBuilder);
  private _signUpStore = inject(SignUpStore);
  private _apiUrl = environment.apiUrl;

  constructor() {
    this.signUpForm = this._formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone_number: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', [Validators.required]]
    });
    this.state$ = this._signUpStore.state$;
  }

  signUp(): void {
    if (!this.signUpForm.invalid) this._signUpStore.signUp(this.signUpForm.value);
  }

  signinWithGoogle(): void {
    window.location.replace(this._apiUrl + 'auth/google/redirect');
  }
}
