import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { environment } from '../../../../../environments/environment';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { SignUpStore } from '../../store/sign-up.store';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  providers: [SignUpStore],
  imports: [
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AuthCardComponent
  ]
})
export class AuthSignUpComponent {
  #formBuilder: FormBuilder = inject(FormBuilder);
  form: FormGroup;
  store = inject(SignUpStore);

  constructor() {
    this.form = this.#formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      phone_number: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
      name: ['', [Validators.minLength(3), Validators.required]]
    });
  }

  onSignUp(): void {
    if (this.form.invalid) return;
    this.store.signUp(this.form.value);
  }

  signinWithGoogle(): void {
    window.location.replace(environment.apiUrl + 'auth/sign-in');
  }
}
