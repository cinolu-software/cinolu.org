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
import { team } from 'app/pages/landing/data/team';
import { SignupStore } from './sign-up.store';
import { Observable } from 'rxjs';
import { ISignupStore } from './types/sign-up-store.type';

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
  signUpForm: FormGroup;
  team = team;
  state$: Observable<ISignupStore>;
  private _formBuilder = inject(FormBuilder);
  private _store = inject(SignupStore);

  ngOnInit(): void {
    this.signUpForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone_number: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', [Validators.required]]
    });
    this.state$ = this._store.state$;
  }

  signUp(): void {
    if (this.signUpForm.invalid) return;
    this.signUpForm.disable();
    const payload = { ...this.signUpForm.get('firstStep').value, ...this.signUpForm.get('secondStep').value };
    this._store.signUp(payload);
    this.signUpForm.enable();
  }

  signUpWithGoogle(): void {
    window.location.replace(environment.apiUrl + 'auth/sign-up');
  }
}
